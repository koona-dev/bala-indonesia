const jwt = require("jsonwebtoken");

// Auth helpers
function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET || "dev_secret", {
    expiresIn: "7d",
  });
}

export default signToken;
