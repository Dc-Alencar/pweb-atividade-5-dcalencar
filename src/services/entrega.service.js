import { EntregaRepository } from "../repositories/entrega.repository";

export class EntregaServices{
    constructor(repository) {
        this.repository = repository;
    };

    async listarEntregas(){
        let entregas = this.repository.listarEntregas();
        return entregas;
    };

    async criarEntrega(dados){
        const criarEntrega = this.repository.criar(dados);
        return criarEntrega;

    };
}