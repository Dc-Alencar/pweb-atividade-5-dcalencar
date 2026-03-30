import { Router } from "express";
import { MotoristaController } from "../controllers/motorista.controller.js";
import { MotoristaServices } from "../services/motorista.service.js";
import { MotoristaRepository} from "../repositories/motorista.repository.js"


const motoristaRouter = Router();

const repository = new MotoristaRepository();
const motoristaServices = new MotoristaServices(repository);
const motoristaController = new MotoristaController(motoristaServices);

motoristaRouter.post("/", motoristaController.CriarMotorista);
motoristaRouter.get("/", motoristaController.ListarMotorista);

export default motoristaRouter;