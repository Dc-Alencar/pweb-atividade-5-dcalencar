import { EntregaRepository } from "../repositories/entrega.repository.js";
import { AppError } from "../utils/appError.js"

export class EntregaServices{
    constructor(repository) {
        this.repository = repository;
    };

    async listarEntregas(filtros){
        let entregas = await this.repository.listarEntregas();
        return entregas;
    };

    async criarEntrega(dados){
        if (dados.origem === dados.destino){
            throw new AppError("O destino da entrega não pode ser igual à origem.", 400);
        }
        if (dados.status !== "CRIADA"){
            dados.status = "CRIADA"
        }
        const criarEntrega = await this.repository.criar(dados);
        return criarEntrega;

    };

    async buscarPorID(id){
        this.validarID(id);
        const idNum = Number(id);
        const entregaPorId = await this.repository.buscarId(idNum);
        if (entregaPorId == null){
            throw new AppError("Entrega não encontrada!", 404)
        }
        return entregaPorId;    
    }

    async avancaPorId(id){
        this.validarID(id);
        const idNum = Number(id);

        const entrega = await this.repository.buscarId(idNum);
        if(!entrega){
            throw new AppError("Entrega não encontrada.", 404)
        }

        if (entrega.status === "CRIADA"){
            entrega.status = "EM_TRANSITO";
            entrega.historico.push({
                data: new Date().toISOString(),
                histDescricao: "Status avançado para: EM_TRANSITO"
        });
        }

        else if (entrega.status === "EM_TRANSITO"){
            entrega.status = "ENTREGUE";
            entrega.historico.push({
                data: new Date().toISOString(),
                histDescricao: "Status avançado para: ENTREGUE"
        });
        }

        const entregaAtualizada = await this.repository.atualizar(idNum, entrega);
        return entregaAtualizada;
    }

    validarID(id){
        if(!id || isNaN(id) || id < 0){
            throw new AppError("ID inválido!!!", 400);
        };
    }
}
