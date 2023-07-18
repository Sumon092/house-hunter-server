const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(process.cwd(), ".env") });

module.exports = {
  secret_token: process.env.ACCESS_TOKEN_SECRET,
  database_url: process.env.DATABASE_URL,
};
