import { pool } from "../database/postgre.js"; // Certifique-se de que o caminho aponta para o seu arquivo de conexão
import { AppError } from "../utils/appError.js";


export class EntregaRepository{
    async listarEntregas(filtros = {}){
    try {
        let query = `
            SELECT e.*, m.nome as motorista_nome 
            FROM entregas e
            LEFT JOIN motoristas m ON e.motorista_id = m.id
        `;
        const params = [];

        if (filtros.status) {
            query += ` WHERE e.status = $1`;
            params.push(filtros.status);
        }

        const result = await pool.query(query, params);
        return result.rows; 
    } catch (error) {
        throw new AppError("Erro ao listar entregas do banco.", 500);
    }
}

    async criar(dados){
        const client = await pool.connect();
        try {
            await client.query('BEGIN'); // Início da transação
            
            const insertEntrega = `
                INSERT INTO entregas (descricao, origem, destino, status)
                VALUES ($1, $2, $3, $4) RETURNING *`;
            
            const res = await client.query(insertEntrega, [dados.descricao, dados.origem, dados.destino, 'CRIADA']);
            const novaEntrega = res.rows[0];

            await client.query(
                `INSERT INTO entrega_historico (entrega_id, descricao_status) VALUES ($1, $2)`,
                [novaEntrega.id, 'Pedido criado!!']
            );

            await client.query('COMMIT');
            return novaEntrega;
        } catch (error) {
            await client.query('ROLLBACK');
            console.error(error);
            throw new AppError("Erro ao criar entrega no banco", 500);
        } finally {
            client.release();
        }
    }

    async buscarId(id){
        try {
            const query = `
                SELECT e.*, m.nome as motorista_nome 
                FROM entregas e
                LEFT JOIN motoristas m ON e.motorista_id = m.id
                WHERE e.id = $1
            `;
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            throw new AppError("Erro ao tentar acessar o banco de dados", 500);
        }
    }

    async atualizar(id, entregaAtualizada){
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const queryUpdate = `
            UPDATE entregas 
            SET status = $1, motorista_id = $2
            WHERE id = $3 
            RETURNING *
        `;
        const values = [entregaAtualizada.status, entregaAtualizada.motorista_id, id];
        const res = await client.query(queryUpdate, values);
        
        const entregaNoBanco = res.rows[0];

        if (!entregaNoBanco) {
            throw new AppError("Entrega não encontrada para atualização.", 404);
        }

        const ultimaDescricao = entregaAtualizada.historico[entregaAtualizada.historico.length - 1].histDescricao;
        
        await client.query(
            `INSERT INTO entrega_historico (entrega_id, descricao_status) VALUES ($1, $2)`,
            [id, ultimaDescricao]
        );

        await client.query('COMMIT');
        return entregaNoBanco;
    } catch (error) {
        await client.query('ROLLBACK');
        if (error instanceof AppError) throw error;
        throw new AppError("Erro ao atualizar entrega no banco.", 500);
    } finally {
        client.release();
    }
}

    async relatorioEntregasPorMotorista() {
        const query = `
            SELECT m.nome, COUNT(e.id) as total_entregas
            FROM motoristas m
            INNER JOIN entregas e ON m.id = e.motorista_id
            GROUP BY m.nome
            HAVING COUNT(e.id) > 0;
        `;
        const result = await pool.query(query);
        return result.rows;
    }
}
