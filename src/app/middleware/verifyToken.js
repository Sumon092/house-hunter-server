// const jwt = require("jsonwebtoken");

// const auth = (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     console.log({ token });
//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     console.log({ decodedToken });
//     req.userId = decodedToken.userId;

//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Authentication failed" });
//   }
// };

// module.exports = auth;

// verifyToken.js
const jwt = require("jsonwebtoken");
// const { secretKey } = require("../config"); // Replace with your secret key

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token not found" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded; // Set the user object in the request
    next();
  });
}

module.exports = verifyToken;
