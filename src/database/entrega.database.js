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

    this.entregas.push(this.postEntrega);
    return this.postEntrega;
  }
}
