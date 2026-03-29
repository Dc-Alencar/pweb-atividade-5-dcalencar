import { Router } from "express";
import {EntregaController} from "../controllers/entrega.controller.js";

const entregaRouter = Router();
const entregaController = new EntregaController();

entregaRouter.get("/",entregaController.ListarEntregas);
entregaRouter.get("/:id",entregaController.BuscarPorID); 
entregaRouter.post("/",entregaController.CriarEntrega);
entregaRouter.patch("/:id/avancar",entregaController.AvancarEntrega);

export default entregaRouter;