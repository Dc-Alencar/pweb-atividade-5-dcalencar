import { MotoristaDatabase } from "../database/motorista.database.js";

const db = new MotoristaDatabase();

export class MotoristaRepository{
    async listarMotorista(){
        return db.getMotorista()
    }

    async criar(dados){
        return db.postMotorista(dados)
    }
}