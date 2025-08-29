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

export default authMiddleware;