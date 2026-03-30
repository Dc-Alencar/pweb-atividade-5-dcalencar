import { MotoristaDatabase } from "../database/motorista.database.js";

const db = new MotoristaDatabase();

export class EntregaRepository{
    async listarMotoristas(){
        return db.getMotoristas()
    }

    async criar(){
        return db.criar()
    }
}