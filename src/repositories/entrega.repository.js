import { PrismaClient } from "@prisma/client";
import { AppError } from "../utils/appError.js";

const prisma = new PrismaClient();

export class EntregaRepository {
    
    // RF-04 e RF-05: Listagem com Paginação Dinâmica, Filtros Avançados e Datas
    async listarEntregas(filtros = {}) {
        try {
            // 1. Configuração da Paginação (RF-04)
            const page = Math.max(1, Number(filtros.page) || 1);
            let limit = Number(filtros.limit) || 10;
            if (limit > 50) limit = 50; // Limite máximo de segurança
            
            const skip = (page - 1) * limit;

            // 2. Construção dinâmica do Filtro WHERE (RF-05)
            const where = {};

            if (filtros.status) {
                where.status = filtros.status;
            }

            if (filtros.motoristaId) {
                where.motoristaId = Number(filtros.motoristaId);
            }

            // Filtro por Intervalo de datas (createdAt)
            if (filtros.createdDe || filtros.createdAte) {
                where.createdAt = {};
                if (filtros.createdDe) {
                    where.createdAt.gte = new Date(filtros.createdDe); // Maior ou igual a
                }
                if (filtros.createdAte) {
                    where.createdAt.lte = new Date(filtros.createdAte); // Menor ou igual a
                }
            }

            // 3. Execução das queries em paralelo para melhor performance
            const [data, total] = await Promise.all([
                prisma.entrega.findMany({
                    where,
                    skip,
                    take: limit,
                    include: {
                        eventos: true, // Traz os históricos/eventos automaticamente
                        motorista: {
                            select: { nome: true } // Simula o LEFT JOIN trazendo o nome do motorista
                        }
                    },
                    orderBy: { id: 'asc' }
                }),
                prisma.entrega.count({ where })
            ]);

            // Mapeia o retorno para manter a compatibilidade ("motorista_nome") com o seu código antigo
            const formatDados = data.map(entrega => ({
                ...entrega,
                motorista_nome: entrega.motorista ? entrega.motorista.nome : null
            }));

            // Retorno no formato exato exigido pelo RF-04
            return {
                data: formatDados,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            };

        } catch (error) {
            throw new AppError("Erro ao listar entregas do banco.", 500);
        }
    }

    // Criar Entrega e Evento associado em uma única transação nativa (RF-01)
    async criar(dados) {
        try {
            // O Prisma resolve transações aninhadas implicitamente!
            return await prisma.entrega.create({
                data: {
                    descricao: dados.descricao,
                    origem: dados.origem,
                    destino: dados.destino,
                    status: 'CRIADA',
                    eventos: {
                        create: {
                            descricaoStatus: 'Pedido criado!!' // Tabela: EventoEntrega
                        }
                    }
                },
                include: { eventos: true }
            });
        } catch (error) {
            throw new AppError("Erro ao criar entrega no banco", 500);
        }
    }

    // Buscar por ID incluindo relacionamentos
    async buscarId(id) {
        try {
            const entrega = await prisma.entrega.findUnique({
                where: { id: Number(id) },
                include: {
                    eventos: true,
                    motorista: { select: { nome: true } }
                }
            });

            if (!entrega) return null; // RF-04 (Antigo): Não encontrado retorna null

            return {
                ...entrega,
                motorista_nome: entrega.motorista ? entrega.motorista.nome : null
            };
        } catch (error) {
            throw new AppError("Erro ao tentar acessar o banco de dados", 500);
        }
    }

    // Atualizar status e injetar novo evento na transação do Prisma
    async atualizar(id, entregaAtualizada) {
        try {
            const ultimaDescricao = entregaAtualizada.historico[entregaAtualizada.historico.length - 1].histDescricao;

            // O uso do update do prisma gera erro P2025 automaticamente se o ID não existir
            return await prisma.entrega.update({
                where: { id: Number(id) },
                data: {
                    status: entregaAtualizada.status,
                    motoristaId: entregaAtualizada.motorista_id ? Number(entregaAtualizada.motorista_id) : null,
                    eventos: {
                        create: {
                            descricaoStatus: ultimaDescricao
                        }
                    }
                }
            });
        } catch (error) {
            if (error.code === 'P2025') {
                throw new AppError("Entrega não encontrada para atualização.", 404);
            }
            throw new AppError("Erro ao atualizar entrega no banco.", 500);
        }
    }

    // Método de Relatório legado (Mantido caso seus Services ainda o chamem)
    async relatorioEntregasPorMotorista() {
        try {
            const result = await prisma.motorista.findMany({
                where: {
                    entregas: { some: {} } // Filtra apenas motoristas com pelo menos 1 entrega (HAVING count > 0)
                },
                select: {
                    nome: true,
                    _count: {
                        select: { entregas: true }
                    }
                }
            });

            return result.map(m => ({
                nome: m.nome,
                total_entregas: m._count.entregas
            }));
        } catch (error) {
            throw new AppError("Erro ao gerar relatório de entregas por motorista.", 500);
        }
    }
}
