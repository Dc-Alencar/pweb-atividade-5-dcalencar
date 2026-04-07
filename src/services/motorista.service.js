import motoristaRouter from "../routes/motorista.router.js";
import { AppError } from "../utils/appError.js";
import { validarCPF } from "../utils/validadores.js";
import { validarID } from "../utils/validadores.js";

export class MotoristaServices{
    constructor(repository){
        this.repository = repository;
    };

    async listarMotorista(filtros){
        let motoristas = await this.repository.listarMotorista(filtros);
        return motoristas;
    };

    async criarMotorista(dados){
        const todosMotoristas = await this.repository.listarMotorista();
        const cpfDuplicado = todosMotoristas.some(motorista => motorista.cpf === dados.cpf);

        if(!validarCPF(dados.cpf)){
            throw new AppError("Número de CPF inválido!!!", 400);
        }

        if (cpfDuplicado){
            throw new AppError("Já existe um motorista com esse CPF cadastrado!!!", 409)
        }

        dados.status = "ATIVO"

        const criarMotorista = await this.repository.criar(dados);
        return criarMotorista;
    }

    async buscarMotoristaId(id){
        validarID(id);
        const idNum = Number(id);
        const motoristaPorId = await this.repository.buscarId(idNum);
        if (motoristaPorId == null){
            throw new AppError("Não existe um motorista com esse ID.", 404)
        }
        return motoristaPorId;
    }

    async buscarMotoristaCpf(cpf){
        if(!validarCPF(cpf)){
            throw new AppError("Número de CPF inválido!!!", 400);
        }
        const motoristaPorCpf = await this.repository.buscarCpf(cpf);
        if (motoristaPorCpf == null){
            throw new AppError("Não existe um motorista com esse CPF.", 404)
        }
        return motoristaPorCpf;
    }

}