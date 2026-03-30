import motoristaRouter from "../routes/motorista.router.js";
import { AppError } from "../utils/appError.js";

export class MotoristaServices{
    constructor(repository){
        this.repository = repository;
    };

    async listarMotorista(filtros){
        let motoristas = await this.repository.listarMotorista(filtros);
        return motoristas;
    };

    async criarMotorista(dados){
        const criarMotorista = await this.repository.criar(dados);
        return criarMotorista;
    }
}