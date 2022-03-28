const { Pool } = require('pg');

const dbPool = new Pool({
  user: 'postgres',
  database: 'db',
  password: 'postgres',
  port: 5432,
  host: 'localhost',
});

module.exports = { dbPool };