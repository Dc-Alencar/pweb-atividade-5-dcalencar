import { Router } from "express";
import {EntregaController} from "../controllers/entrega.controller.js";
import { EntregaServices } from "../services/entrega.service.js";
import { EntregaRepository } from "../repositories/entrega.repository.js";

const entregaRouter = Router();

const repository = new EntregaRepository();
const entregaServices = new EntregaServices(repository);
const entregaController = new EntregaController(entregaServices);

entregaRouter.get("/",entregaController.ListarEntregas);
entregaRouter.get("/:id",entregaController.BuscarPorID); 
entregaRouter.post("/",entregaController.CriarEntrega);
entregaRouter.patch("/:id/avancar",entregaController.AvancarEntrega);
entregaRouter.patch("/:id/cancelar",entregaController.CancelarEntrega);

export default entregaRouter;