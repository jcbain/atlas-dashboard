const Pool = require('pg').Pool;

const connectionString = {
    user: "postgres",
    password: "postgres",
    host: "db",
    port: 5432,
    database: "atlas_simulation"
}

const pool = new Pool(connectionString)

module.exports = pool;