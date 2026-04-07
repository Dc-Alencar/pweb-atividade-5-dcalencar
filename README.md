# Atividade 5-6

### Repositório para as atividades relacionadas ao sistemas de entrega e motoristas, passadas pelo professor Leonardo, na matéria de Programação Web.
### Criado por: Daniel Costa Alencar.

## Funcionalides criadas até o momento:
### Entregas:
* **Listar:** Lista as entregas criadas, com a possibilidade de filtrar por status.
* **Criar:** Cria uma nova entrega.
* **Buscar por ID:** Acha uma entrega especifica através do ID único dela.
* **Avançar o Status:** Avança o status de uma entrega para o próximo passo de uma entrega (CRIADO => EM_TRANSITO => ENTREGUE).
* **Cancelar:** Cancela um entrega que não esteja com o status "ENTREGUE".
* **Atribuir entrega para motorista** Atribui uma entrega que esteja com o status "CRIADA" para um motorista que esteja com o status "ATIVO".


### Motoristas:
* **Registrar:** Permite registrar um motorista, usando seu nome, CPF e a placa do veículo.
* **Listar:** Lista os motoristas registrados.


## Endpoints:
### Entregas (http://localhost:3000/api/entregas):
|Métodos|Endpoint|Descrição|
|:---|:---:|---:|
|GET|"/"|Lista todos as entregas criadas|
|GET|"/:id"|Busca uma entrega específica por ID|
|POST|"/"|Cria uma nova entrega|
|PATCH|"/:id/avancar"|Avança o status de uma entrega específica|
|PATCH|"/:id/cancelar"|Cancela uma entrega específica|
|PATCH|"/:id/atribuirmotorista"|Atribue a entrega específica a um motorista especifico|
```text
Exemplo de uso de endpoint para criar entrega:
POST http://localhost:3000/api/entregas
Content-Type: application/json

{
  "descricao": "Batedeira industrial",
  "origem": "Coruripe",
  "destino": "Maceió"
}

Exemplo de uso de endpoint para atribuir entrega:
POST http://localhost:3000/api/entregas/1/atribuirmotorista
Content-Type: application/json

{
    "idMotorista": 1
}
```


### Motoristas (http://localhost:3000/api/Motoristas):
|Métodos|Endpoint|Descrição|
|:---|:---:|---:|
|POST|"/"|Cadastra um novo motorista|
|GET|"/"|Lista todos os motoristas cadastrados|
|GET|"/id/:id"|Busca um motorist pelo seu ID|
|GET|"/cpf/:cpf"|Busca um motorista pelo seu CPF|

```text
Exemplo de uso do endpoint para criar motorista:
POST http://localhost:3000/api/motoristas
Content-Type: application/json
{
  "nome": "Daniel",
  "cpf": "12312312312",
  "placa": "Placa-123"
}
```

## Diagrama ASCII
```text
    +-------------------+           +---------------------+
    |  EntregaDatabase  |           |  MotoristaDatabase  |
    +---------+---------+           +----------+----------+
              |                                |
              v                                v
    +-------------------+           +---------------------+
    | EntregaRepository |           | MotoristaRepository |
    +---------+---------+           +----------+----------+
              |                                |
              |                                | 
              |                                |
              |       +------------------------+ 
              |       |                        |
              v       v                        v
    +-------------------+           +---------------------+
    |  EntregaServices  |           |  MotoristaServices  |
    +---------+---------+           +----------+----------+
              |                                |
              |                                | 
              v                                v
    +-------------------+           +---------------------+
    | EntregaController |           | MotoristaController |
    +---------+---------+           +----------+----------+
              |                                |
              |                                | 
              v                                v
    +-------------------+           +---------------------+
    |   entregaRouter   |           |   motoristaRouter   |
    +---------+---------+           +----------+----------+
              |                                |
              +--------------+-----------------+
                             | 
                             v
                    +-----------------+
                    |  Router (index) |
                    +--------+--------+
                             | 
                             v
                    +-----------------+
                    |  App (Express)  |
                    +-----------------+
```
|GET|"/"|Lista todos os motoristas registrados|
|POST|"/"|Registra um novo motorista|
