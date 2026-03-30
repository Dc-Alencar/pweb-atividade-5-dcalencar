import { Router } from "express";



const motoristaRouter = Router();

const repository = new MotoristaRepository();
const motoristaServices = new MotoristaService(repository);
const motoristaController = new MotoristaController(motoristaService);

motoristaRouter = post("/", motoristaController.CriarMotorista());
motoristaRouter = get("/", motoristaController.ListarMotorista());
motoristaRouter = get("/:id", motoristaController.ListarMotoristaPorId());
motoristaRouter = get("/:id/entregas", motoristaController.ListarEntregaMotorista());
motoristaRouter = patch("/:id/atribuir", motoristaController.AtribuirMotorista());

export default motoristaRouter;