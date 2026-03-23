import { EntregaDatabase } from "../database/entrega.database.js";

export class EntregaRepository{
    async listarEntregas(){
        return getEntregas()
    }

    async criar(){
        return this.postEntregas()
    }
}