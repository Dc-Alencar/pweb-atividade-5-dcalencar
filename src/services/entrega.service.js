import { AppError } from "../utils/appError.js"
import { validarID } from "../utils/validadores.js";

export class EntregaServices{
    constructor(repository, motoristaRepository) {
        this.repository = repository;
        this.motoristaRepository = motoristaRepository;  
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
        validarID(id);
        const idNum = Number(id);
        const entregaPorId = await this.repository.buscarId(idNum);
        if (entregaPorId == null){
            throw new AppError("Entrega não encontrada!", 404)
        }
        return entregaPorId;    
    }

    async avancarPorId(id){
        validarID(id);
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
        validarID(id);
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

    async atribuirEntrega(idEntrega, idMotorista){
        validarID(idEntrega);
        validarID(idMotorista);

        const idEntregaNum = Number(idEntrega);
        const idMotoristaNum = Number(idMotorista);

        const entrega = await this.repository.buscarId(idEntregaNum);
        if(!entrega){
            throw new AppError("Entrega não encontrada!!!", 404)
        }

        const motorista = await this.motoristaRepository.buscarId(idMotoristaNum);
        if(!motorista){
            throw new AppError("Motorista não encontrado!!!", 404)
        }

        if(entrega.status !== "CRIADA"){
            throw new AppError("Essa entrega não pode ser atribuida para um motorista.", 400)
        }

        if(motorista.status !== "ATIVO"){
            throw new AppError("Esse motorista não pode fazer entregas.", 400)
        }

        entrega.status = "EM_TRANSITO";
        entrega.historico.push({
            data: new Date().toISOString(),
            histDescricao: `Entrega atribuida ao motorista ${motorista.nome} (CPF: ${motorista.cpf})`});

        motorista.entregas.push(entrega);

        await this.motoristaRepository.atualizar(idMotoristaNum, motorista);
        const entregaAtualizada = await this.repository.atualizar(idEntregaNum, entrega);

        return entregaAtualizada;
    }
}
