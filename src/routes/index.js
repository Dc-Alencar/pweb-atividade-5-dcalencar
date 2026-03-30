import {Router} from 'express';
import entregaRouter from './entrega.router.js';
import motoristaRouter from "./motorista.router.js";

export const router = Router();

router.use('/entregas',entregaRouter);
router.use("/motoristas", motoristaRouter);