import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "pweb_db",
    password: "danpass",
    port: 5432,
});

pool.query('SELECT current_database();')
    .then(res => console.log("Conectado no banco:", res.rows[0].current_database))
    .catch(err => console.error("Erro ao testar conexão:", err));