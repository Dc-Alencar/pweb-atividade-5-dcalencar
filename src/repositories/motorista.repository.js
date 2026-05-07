import { pool } from "../database/postgre.js"; // Certifique-se de que o caminho aponta para o seu arquivo de conexão
import { AppError } from "../utils/appError.js";

export class MotoristaRepository{
    async listarMotorista() {
            try {
                const query = "SELECT * FROM motoristas ORDER BY id ASC";
                const result = await pool.query(query);
                return result.rows;
            } catch (error) {
                throw new AppError("Erro ao listar motoristas no banco.", 500);
            }
        }

    async criar(dados) {
        try {
            const query = `
                INSERT INTO motoristas (nome, cpf, placa_veiculo, status) 
                VALUES ($1, $2, $3, $4) 
                RETURNING *`;
            
            const values = [
                dados.nome, 
                dados.cpf, 
                dados.placa_veiculo, 
                dados.status || 'ATIVO'
            ];

            const res = await pool.query(query, values);
            return res.rows[0];
        } catch (error) {
            console.error(error);
            if (error.code === '23505') {
                throw new AppError("Já existe um motorista cadastrado com este CPF.", 400);
            }
            throw new AppError("Erro ao salvar motorista no banco de dados.", 500);
        }
    }

    async buscarId(id) {
        try {
            const query = "SELECT * FROM motoristas WHERE id = $1";
            const res = await pool.query(query, [id]);
            return res.rows[0] || null;
        } catch (error) {
            throw new AppError("Erro ao buscar motorista por ID.", 500);
        }
    }

    async buscarCpf(cpf) {
        try {
            const query = "SELECT * FROM motoristas WHERE cpf = $1";
            const res = await pool.query(query, [cpf]);
            return res.rows[0] || null;
        } catch (error) {
            throw new AppError("Erro ao buscar motorista por CPF.", 500);
        }
    }

async atualizar(id, dados) {
        try {
            const queryUpdate = `
                UPDATE motoristas 
                SET 
                    nome = COALESCE($1, nome),
                    cpf = COALESCE($2, cpf),
                    placa_veiculo = COALESCE($3, placa_veiculo),
                    status = COALESCE($4, status)
                WHERE id = $5
                RETURNING *
            `;
            
            const values = [
                dados.nome, 
                dados.cpf, 
                dados.placa_veiculo, 
                dados.status, 
                id
            ];

            const res = await pool.query(queryUpdate, values);
            const motoristaAtualizado = res.rows[0];
            
            if (!motoristaAtualizado) {
                throw new AppError("Motorista não encontrado no banco de dados.", 404);
            }

            return motoristaAtualizado;

        } catch (error) {
            console.error("🔥 Erro ao atualizar motorista:", error);
            
            if (error instanceof AppError) throw error;
            throw new AppError("Falha na atualização do motorista no banco.", 500);
        }
    }
}