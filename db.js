const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "1981",
    database: "SGM",
    port: 5432
});

module.exports = pool;
