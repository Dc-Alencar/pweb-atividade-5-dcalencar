import { Router } from 'express';
// Change this line to use ./ instead of ../routes/
import entregaRouter from './entrega.router.js'; 

export const router = Router();

router.use('/entrega', entregaRouter);