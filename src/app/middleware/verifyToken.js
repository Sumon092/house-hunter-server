const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.json({
      status: 401,
      message: "Authorization token not found",
    });
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    return res.json({
      status: 401,
      message: "Invalid token",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.json({
        status: 401,
        message: "Invalid token",
      });
    }
    req.decoded = decoded.userId;
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
