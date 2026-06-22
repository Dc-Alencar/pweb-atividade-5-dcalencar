import { PrismaClient } from "@prisma/client";
import { AppError } from "../utils/appError.js";

const prisma = new PrismaClient();

export class MotoristaRepository {
    
    async listarMotorista() {
        try {
            return await prisma.motorista.findMany({
                orderBy: {
                    id: 'asc'
                }
            });
        } catch (error) {
            throw new AppError("Erro ao listar motoristas no banco.", 500);
        }
    }

    async criar(dados) {
        try {
            return await prisma.motorista.create({
                data: {
                    nome: dados.nome,
                    cpf: dados.cpf,
                    placaVeiculo: dados.placa_veiculo,
                    status: dados.status || 'ATIVO'
                }
            });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new AppError("Já existe um motorista cadastrado com este CPF.", 400);
            }
            throw new AppError("Erro ao salvar motorista no banco de dados.", 500);
        }
    }

    async buscarId(id) {
        try {
            return await prisma.motorista.findUnique({
                where: { id: Number(id) }
            });
        } catch (error) {
            throw new AppError("Erro ao buscar motorista por ID.", 500);
        }
    }

    async buscarCpf(cpf) {
        try {
            return await prisma.motorista.findUnique({
                where: { cpf: String(cpf) }
            });
        } catch (error) {
            throw new AppError("Erro ao buscar motorista por CPF.", 500);
        }
    }

    async atualizar(id, dados) {
        try {
            const dadosParaAtualizar = {
                nome: dados.nome !== undefined ? dados.nome : undefined,
                cpf: dados.cpf !== undefined ? dados.cpf : undefined,
                placaVeiculo: dados.placa_veiculo !== undefined ? dados.placa_veiculo : undefined,
                status: dados.status !== undefined ? dados.status : undefined,
            };

            return await prisma.motorista.update({
                where: { id: Number(id) },
                data: dadosParaAtualizar
            });

        } catch (error) {
            if (error.code === 'P2025') {
                throw new AppError("Motorista não encontrado no banco de dados.", 404);
            }

            if (error instanceof AppError) throw error;
            throw new AppError("Falha na atualização do motorista no banco.", 500);
        }
    }
}