import { EntregaDatabase } from "../database/entrega.database";

export class EntregaRepository{
    async listarEntregas(){
        return getEntregas()
    }

    async criar(){
        return this.postEntregas()
    }
}