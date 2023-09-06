import * as http from "http";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

import { logger } from "./src/utils/logger";
import generateKeypair from "./src/utils/generateKeypair";

import app from "./src/index";

dotenv.config();

const port: number = Number(process.env.PORT) || 3000;

app.set("port", port);
const server: http.Server = http.createServer(app);

server.listen(port);

const privKeyPath: string = path.join(__dirname, "./id_rsa_priv.pem");
const pubKeyPath: string = path.join(__dirname, "./id_rsa_pub.pem");

if (!fs.existsSync(privKeyPath) || !fs.existsSync(pubKeyPath)) {
  logger.info("Key files not found, generating new keypair...");
  generateKeypair();
}

server.on("error", (error: NodeJS.ErrnoException) => {
  switch (error.code) {
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
  const address = server.address() as import("net").AddressInfo;
  if (address) {
    logger.info(`Server is listening on ${address.address}:${address.port}`);
  }
});
