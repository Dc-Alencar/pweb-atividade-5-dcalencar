export class EntregaDatabase {
  constructor() {
    this.entregas = [];
    this.nextId = 1;
  }

  getEntregas() {
    return this.entregas;
  }

  postEntrega(dados) {
    const novaEntrega = {
      id: this.nextId++,
      descricao: dados.descricao,
      origem: dados.origem,
      destino: dados.destino,
      status: dados.status,
      historico: [
        {
          data: dados.data,
          histDescricao: dados.histDescricao
        }
      ]
    };

    this.entregas.push(novaEntrega);
    return novaEntrega;
  }

  getBuscarPorId(id){
    return this.entregas.find(e => e.id === id) || null;
  }

  putEntrega(id, entregaAtualizada){
    const index = this.entregas.findIndex(e => e.id === id);
    if (index !== -1){
      this.entregas[index] = entregaAtualizada;
      return this.entregas[index];
    }
    return null;
  }
}