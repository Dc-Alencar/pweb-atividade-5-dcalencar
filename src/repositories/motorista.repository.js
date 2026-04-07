import { MotoristaDatabase } from "../database/motorista.database.js";

const db = new MotoristaDatabase();

export class MotoristaRepository{
    async listarMotorista(){
        return db.getMotorista()
    }

    async criar(dados){
        return db.postMotorista(dados)
    }

    async buscarId(id){
        return db.getMotoristaId(id)
    }

    async buscarCpf(cpf){
        return db.getMotoristaCpf(cpf)
    }
}