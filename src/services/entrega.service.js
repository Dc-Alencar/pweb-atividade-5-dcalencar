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
}