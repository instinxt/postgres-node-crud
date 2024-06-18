const { Pool } = require('node-postgres');

const pool = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ...(process.env.ENDPOINT_ID && { ssl: { rejectUnauthorized: false } }), // Optional for older clients
});

module.exports = pool;
