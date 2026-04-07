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


### Motoristas (http://localhost:3000/api/Motoristas):
|Métodos|Endpoint|Descrição|
|:---|:---:|---:|


## Diagrama ASCII
```text
    +-------------------+           +---------------------+
    |  EntregaDatabase  |           |  MotoristaDatabase  |
    +---------+---------+           +----------+----------+
              |                     
              v                                v
    +-------------------+           +---------------------+
    | EntregaRepository |           | MotoristaRepository |
    +---------+---------+           +----------+----------+
              |                                |
              |                      | 
              |                                |
              |       +------------------------+ 
              |       |       |
              v       v                        v
    +-------------------+           +---------------------+
    |  EntregaServices  |           |  MotoristaServices  |
    +---------+---------+           +----------+----------+
              |                                |
              |                      | 
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
