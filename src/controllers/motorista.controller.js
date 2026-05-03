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

    ProcurarIdMotorista = async (req, res, next) => {
        try{
            const {id} = req.params;
            const buscarId = await this.motoristaServices.buscarMotoristaId(id);
            res.status(200).json(buscarId);
        }
        catch(error){
            next(error);
        }
    }

    ProcurarCpfMotorista = async (req, res, next) => {
        try{
            const {cpf} = req.params;
            const buscarCpf = await this.motoristaServices.buscarMotoristaCpf(cpf);
            res.status(200).json(buscarCpf);
        }
        catch(error){
            next(error);
        }
    }

    DesativarMotorista = async (req, res, next) => {
        try{
            const {id} = req.params;
            const desativarMotorista = await this.motoristaServices.desativarPorId(id);
            res.status(200).json(desativarMotorista)
        }
        catch(error){
            next(error);
        }
    }
}