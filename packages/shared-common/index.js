const { Pool } = require("pg");
const jwt = require("jsonwebtoken");

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

// Auth helpers
function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET || "dev_secret", {
    expiresIn: "7d",
  });
}

function authMiddleware(requiredRole) {
  return (req, res, next) => {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ msg: "Unauthorized" });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
      req.user = decoded;
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ msg: "Forbidden" });
      }
      next();
    } catch (e) {
      return res.status(401).json({ msg: "Invalid token" });
    }
  };
}

module.exports = { query, signToken, authMiddleware };
