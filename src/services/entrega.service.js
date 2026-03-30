import { AppError } from "../utils/appError.js"

export class EntregaServices{
    constructor(repository) {
        this.repository = repository;
    }

    async listarEntregas(filtros){
        let entregas = await this.repository.listarEntregas(filtros);

        if (filtros.status) {
            if (filtros.status !== "CRIADA" && filtros.status !== "ENTREGUE" && filtros.status !== "EM_TRANSITO" && filtros.status !== "CANCELADO"){
                throw new AppError("Status inválido!", 400);                    
            }
            entregas = entregas.filter(e => e.status === filtros.status);
        };
        return entregas;
    };

    async criarEntrega(dados){
        if (dados.origem === dados.destino){
            throw new AppError("O destino da entrega não pode ser igual à origem.", 400);
        }
        if (dados.status !== "CRIADA"){
            dados.status = "CRIADA"
        }
        dados.data = new Date().toISOString();
        dados.histDescricao = "Pedido criado!!";
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

    async avancarPorId(id){
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

    async cancelarPorId(id){
        this.validarID(id);
        const idNum = Number(id);

        const entrega = await this.repository.buscarId(idNum);
        if(!entrega){
            throw new AppError("Entrega não encontrada!!!", 404)
        }

        if(entrega.status !== "ENTREGUE"){
            entrega.status = "CANCELADO";
            entrega.historico.push({
                data: new Date().toISOString(),
                histDescricao: "Pedido CANCELADO!!!"
            });
        }
        else{
            throw new AppError("Não podemos cancelar um pedido que já foi entregue.", 400)
        }

        const entregaAtualalizada = await this.repository.atualizar(idNum, entrega);
        return entregaAtualalizada;
    }

    validarID(id){
        if(!id || isNaN(id) || id < 0){
            throw new AppError("ID inválido!!!", 400);
        };
    }
}
