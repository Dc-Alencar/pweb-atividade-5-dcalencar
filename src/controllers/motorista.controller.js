export class MotoristaController{
    constructor(motoristaServices){
        this.motoristaServices = motoristaServices;
    }

    ListarMotorista = async (req, res, next) => {
        try{
            const motorista = await this.motoristaServices.listarMotorista(req.query);
            res.json(motorista);
        }
        catch (error){
            next(error);
        }
    }

    CriarMotorista = async (req, res, next) => {
        try{
            const dados = req.body;
            const novoMotorista = await this.motoristaServices.criarMotorista(dados);
            res.status(201).json(novoMotorista);
        }
        catch(error){
            next(error);
        }
    }

    
}