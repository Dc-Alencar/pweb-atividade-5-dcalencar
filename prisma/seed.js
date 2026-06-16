import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main(){

    const motorista_1 = await prisma.motorista.upsert({
        where: {cpf: "11111111111"},
        update: {},
        create: {nome: "Jose Erison dos santos", cpf:"11111111111", placaVeiculo: "21JEX27"},
    });

    const motorista_2 = await prisma.motorista.upsert({
        where: {cpf: "11111111112"},
        update: {},
        create: {nome: "lyly da Silva Rocha", cpf:"11111111112", placaVeiculo: "MNA0817"},
    });

    const motorista_3 = await prisma.motorista.upsert({
        where: {cpf: "11111111113"},
        update: {},
        create: {nome: "Adrian Eduardo dos Santos Silva", cpf:"11111111113", placaVeiculo: "VSF0024"},
    });

    await prisma.entrega.create({
    data: {
      descricao: 'Redmi Note 15 Pro',
      origem: 'Maua-SP',
      destino: 'Agua Branca-AL',
      status: 'EM_TRANSITO',
      motoristaId: motorista_1.id,
      eventos: {
        create: [
          { descricaoStatus: 'Pedido criado!!' },
          { descricaoStatus: 'Status avançado para: EM_TRANSITO' }
        ]
      }
    }
  });

    await prisma.entrega.create({
    data: {
      descricao: 'Tênis preto',
      origem: 'Rocinha-RJ',
      destino: 'Copacabana-RJ',
      status: 'CANCELADO',
      motoristaId: motorista_2.id,
      eventos: {
        create: [
          { descricaoStatus: 'Pedido criado!!' },
          { descricaoStatus: 'Status avançado para: EM_TRANSITO' },
          { descricaoStatus: 'Status avançado para: CANCELADO' }
        ]
      }
    }
  });

    await prisma.entrega.create({
    data: {
      descricao: 'Oculos de sol',
      origem: 'Santa Catarina-RS',
      destino: 'Terezinha-CE',
      status: 'EM_TRANSITO',
      motoristaId: motorista_3.id,
      eventos: {
        create: [
          { descricaoStatus: 'Pedido criado!!' },
          { descricaoStatus: 'Status avançado para: EM_TRANSITO' },
          { descricaoStatus:`Entrega atribuida ao motorista ${motorista_3.nome} (CPF: ${motorista_3.cpf})` }
        ]
      }
    }
  });

    await prisma.entrega.create({
    data: {
      descricao: 'Papel',
      origem: 'Cajamar-SP',
      destino: 'Miai de Cima-AL',
      status: 'EM_TRANSITO',    
      motoristaId: motorista_3.id,
      eventos: {
        create: [
          { descricaoStatus: 'Pedido criado!!' },
          { descricaoStatus: 'Status avançado para: EM_TRANSITO' },
          { descricaoStatus:`Entrega atribuida ao motorista ${motorista_3.nome} (CPF: ${motorista_3.cpf})` }
        ]
      }
    }
  });

    await prisma.entrega.create({
    data: {
      descricao: 'Queijo Qualho',
      origem: 'Betim-MG',
      destino: 'Bujari-AC',
      status: 'EM_TRANSITO',
      motoristaId: motorista_1.id,
      eventos: {
        create: [
          { descricaoStatus: 'Pedido criado!!' },
          { descricaoStatus: 'Status avançado para: EM_TRANSITO' },
          { descricaoStatus:`Entrega atribuida ao motorista ${motorista_1.nome} (CPF: ${motorista_1.cpf})` }
        ]
      }
    }
  });

    await prisma.entrega.create({
    data: {
      descricao: 'Madeira',
      origem: 'Coruripe-AL',
      destino: 'Alto de Juá-CE',
      status: 'EM_TRANSITO',
      motoristaId: motorista_2.id,
      eventos: {
        create: [
          { descricaoStatus: 'Pedido criado!!' },
          { descricaoStatus: 'Status avançado para: EM_TRANSITO' },
          { descricaoStatus:`Entrega atribuida ao motorista ${motorista_2.nome} (CPF: ${motorista_2.cpf})` }
        ]
      }
    }
  });

    await prisma.entrega.create({
    data: {
      descricao: 'Ferro',
      origem: 'SP',
      destino: 'Tupi-MG',
      status: 'EM_TRANSITO',
      motoristaId: motorista_1.id,
      eventos: {
        create: [
          { descricaoStatus: 'Pedido criado!!' },
          { descricaoStatus: 'Status avançado para: EM_TRANSITO' },
          { descricaoStatus:`Entrega atribuida ao motorista ${motorista_1.nome} (CPF: ${motorista_1.cpf})` }
        ]
      }
    }
  });

    await prisma.entrega.create({
    data: {
      descricao: '2 engradados de Suco Pindorama Sabor Limão',
      origem: 'Pindorama-AL',
      destino: 'Goiania-GO',
      status: 'CANCELADO',
      motoristaId: motorista_1.id,
      eventos: {
        create: [
          { descricaoStatus: 'Pedido criado!!' },
          { descricaoStatus: 'Status avançado para: EM_TRANSITO' },
          { descricaoStatus: 'Status avançado para: CANCELADO' },
          { descricaoStatus:`Entrega atribuida ao motorista ${motorista_1.nome} (CPF: ${motorista_1.cpf})` }
        ]
      }
    }
  });

    await prisma.entrega.create({
    data: {
      descricao: 'Conjunto de Facas',
      origem: 'Agua de Menino-AL',
      destino: 'Porto de Galinhas-AL',
      status: 'EM_TRANSITO',
      motoristaId: motorista_2.id,
      eventos: {
        create: [
          { descricaoStatus: 'Pedido criado!!' },
          { descricaoStatus: 'Status avançado para: EM_TRANSITO' },
          { descricaoStatus:`Entrega atribuida ao motorista ${motorista_2.nome} (CPF: ${motorista_2.cpf})` }
        ]
      }
    }
  });

    await prisma.entrega.create({
    data: {
      descricao: 'Um pallet de refrigerante',
      origem: 'Osasco-SP',
      destino: 'Arapiraca-AL',
      status: 'EM_TRANSITO',
      motoristaId: motorista_2.id,
      eventos: {
        create: [
          { descricaoStatus: 'Pedido criado!!' },
          { descricaoStatus: 'Status avançado para: EM_TRANSITO' },
          { descricaoStatus:`Entrega atribuida ao motorista ${motorista_2.nome} (CPF: ${motorista_2.cpf})` }
        ]
      }
    }
  });
}

main()
  .then(() => {
    console.log("Seed executada com sucesso");
  })
  .catch((e) => {
    console.error("Erro na execução da Seed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });