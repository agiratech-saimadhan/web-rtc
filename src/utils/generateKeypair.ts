import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";
import { logger } from "./logger";

function generateKeyPair() {
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });

  fs.writeFileSync(
    path.join(__dirname, "../../id_rsa_pub.pem"),
    keyPair.publicKey
  );

  fs.writeFileSync(
    path.join(__dirname, "../../id_rsa_priv.pem"),
    keyPair.privateKey
  );

  logger.info("Keypair Generated");
}

export default generateKeyPair;
