import { EntregaRepository } from "../repositories/entrega.repository.js";

export class EntregaServices{
    constructor(repository) {
        this.repository = repository;
    };

    async listarEntregas(){
        let entregas = await this.repository.listarEntregas();
        return entregas;
    };

    async criarEntrega(dados){
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

    validarID(id){
        if(!id || isNaN(id) || id < 0){
            throw new AppError("ID inválido!!!", 400);
        };
    }
}