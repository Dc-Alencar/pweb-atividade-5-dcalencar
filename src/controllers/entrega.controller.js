import {EntregaServices} from "../services/entrega.service.js";

const entregaServices = new EntregaServices();

export class EntregaController{
    ListarEntregas=(req,res) => {
        const entrega = entregaServices.ListarEntregas
    }
}