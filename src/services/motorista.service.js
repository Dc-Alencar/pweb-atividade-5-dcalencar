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

    async desativarPorId(id){
        validarID(id);
        const idNum = Number(id);

        const motorista = await this.repository.buscarId(idNum);
        if(!motorista){
            throw new AppError("Este Id não pertence a um motorista.", 404);
        }

        if(motorista.status === "INATIVO"){
            throw new AppError("Esse motorista já está inativo!", 400);
        }

        if(motorista.status === "ATIVO"){
            motorista.status = "INATIVO";
        }

        const motoristaAtualizado = await this.repository.atualizar(idNum, motorista);
        return motoristaAtualizado;
    }
}