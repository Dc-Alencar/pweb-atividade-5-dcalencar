import {Router} from 'express';
import entregaRouter from './entrega.router.js';

export const router = Router();

router.use('/entregas',entregaRouter);