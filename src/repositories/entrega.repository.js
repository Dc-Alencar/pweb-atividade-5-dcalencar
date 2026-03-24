import { EntregaDatabase } from "../database/entrega.database.js";

const db = new EntregaDatabase();

export class EntregaRepository{
    async listarEntregas(){
        return db.getEntregas()
    }

    async criar(dados){
        return deb.postEntregas(dados)
    }
}