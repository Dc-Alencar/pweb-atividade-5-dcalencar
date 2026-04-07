export class MotoristaDatabase {
    constructor() {
        this.motoristas = [];
        this.nextId = 1;
    }

    getMotorista(){
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

    this.motoristas.push(novoMotorista);
    return novoMotorista;
    }

  getMotoristaId(id){
    return this.motoristas.find(e => e.id === id) || null;
  }
  
  getMotoristaCpf(cpf){
    return this.motoristas.find(e => e.cpf === cpf) || null;
  }

  putMotorista(id, motoristaAtualizado){
    const index = this.motoristas.findIndex(e => e.id === id);
    if (index !== -1){
      this.motoristas[index] = motoristaAtualizado;
      return this.motoristas[index];
    }
    return null;
  }
}