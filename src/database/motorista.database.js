export class MotoristaDatabase {
    constructor() {
        this.motoristas = [];
        this.nextId = 1;
    }

    getMotoristas(){
        return this.motoristas;
    }

    postMotorista(dados){
        const novoMotorista = {
            id: this.nextId++,
            nome: dados.nome,
            cpf: dados.cpf,
            placaVeiculo: dados.placaVeiculo,
            status: dados.status,
            entregas: []
        }
    }
}