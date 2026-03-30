export class EntregaController{
    constructor(entregaServices) {
        this.entregaServices = entregaServices;
    }
        ListarEntregas = async (req,res) => {
        try{
            const entrega = await this.entregaServices.listarEntregas(req.query);
            res.json(entrega);
        }
        catch(error){
            next(error);
        }
    }

    CriarEntrega = async (req, res, next) => {
    try{
        const dados = req.body;
            const novaEntrega = await this.entregaServices.criarEntrega(dados);
            res.status(201).json(novaEntrega)
        }
        catch(error){
            next(error);
        }        
    }

    BuscarPorID = async(req,res, next) => {
        try{
            const {id} = req.params;
            const buscarID = await this.entregaServices.buscarPorID(id);
            res.status(200).json(buscarID);
        }
        catch(error){
            next(error);
        }
    } 

    AvancarEntrega = async(req,res,next) => {
        try{
            const {id} = req.params;
            const avancarEntrega = await this.entregaServices.avancarPorId(id);
            res.status(200).json(avancarEntrega);
        }
        catch(error){
            next(error);
        }
    }

    CancelarEntrega = async(req, res, next) => {
        try{
            const {id} = req.params;
            const cancelarEntrega = await this.entregaServices.cancelarPorId(id);
            res.status(200).json(cancelarEntrega);
        }
        catch(error){
            next(error);
        };
    }
}