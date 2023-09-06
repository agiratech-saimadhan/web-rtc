const http = require("http");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

const { logger } = require("./src/utils/logger");
const generateKeypair = require("./src/utils/generateKeypair");

const app = require("./src/index");

dotenv.config();

const port = process.env.PORT || 3000;

app.set("port", port);
const server = http.createServer(app);

server.listen(port);

const privKeyPath = path.join(__dirname, "./id_rsa_priv.pem");
const pubKeyPath = path.join(__dirname, "./id_rsa_pub.pem");

if (!fs.existsSync(privKeyPath) || !fs.existsSync(pubKeyPath)) {
  logger.info("Key files not found, generating new keypair...");
  generateKeypair();
}

server.on("error", (error) => {
  switch (error.name) {
    case "EADDRINUSE":
      logger.error(`Port ${port} is already in use.`);
      break;
    case "EACCES":
      logger.error(`Port ${port} requires elevated privileges.`);
      break;
    default:
      logger.error(error.message);
  }
});

server.on("listening", () => {
  const address = server.address();

  logger.info(`Server is listening on ${address.address}:${address.port}`);
});
