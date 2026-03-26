import {EntregaServices} from "../services/entrega.service.js";
import { EntregaRepository } from "../repositories/entrega.repository.js";

const repository = new EntregaRepository();
const entregaServices = new EntregaServices(repository);

export class EntregaController{
        ListarEntregas = async (req,res) => {
        try{
            const entrega = await entregaServices.listarEntregas();
            res.json(entrega);
        }
        catch(error){
            next(error);
        }
    }

    CriarEntrega = async (req,res) => {
    try{
        const dados = req.body;
            const novaEntrega = await entregaServices.criarEntrega(dados);
            res.status(201).json(novaEntrega)
        }
        catch(error){
            next(error);
        }        
    }

    BuscarPorID = async(req,res, next) => {
        try{
            const {id} = req.params;
            const buscarID = await entregaServices.buscarPorID(id);
            res.status(200).json(buscarID);
        }
        catch(error){
            next(error);
        }
    }   
}