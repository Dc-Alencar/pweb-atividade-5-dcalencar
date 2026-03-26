import {EntregaServices} from "../services/entrega.service.js";
import { EntregaRepository } from "../repositories/entrega.repository.js";

const repository = new EntregaRepository();
const entregaServices = new EntregaServices(repository);

export class EntregaController{
    ListarEntregas = async (req,res) => {
        const entrega = await entregaServices.listarEntregas();
        res.json(entrega);
    }

    CriarEntrega = async (req,res) => {
        const dados = req.body;
        const novaEntrega = await entregaServices.criarEntrega(dados);
        res.status(201).json(novaEntrega)
    }
}