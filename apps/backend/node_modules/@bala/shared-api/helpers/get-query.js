const { Pool } = require("pg");


// DB (gunakan env dari service pemakai)
let _pool = null;
function getDb() {
  if (_pool) return _pool;
  _pool = new Pool({
    connectionString:
      process.env.DATABASE_URL ||
      `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  });
  return _pool;
}

async function query(text, params) {
  const pool = getDb();
  return pool.query(text, params);
}

export default query;