import { Router } from "express";
import {EntregaController} from "../controllers/entrega.controller.js";

const entregaRouter = Router();
const entregaController = new EntregaController();

entregaRouter.get("/",entregaController.ListarEntregas);

export default entregaRouter;
