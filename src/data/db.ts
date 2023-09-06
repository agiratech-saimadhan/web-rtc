/**
 * Replace the following with your own database connection and management logic
 */

const db = require("mongoose");
const { logger } = require("../utils/logger");

async function connectToDB() {
  try {
    await db.connect(`${process.env.MONGODB_URI}`);
    logger.info(`Connected to Database: ${db.connection.name}`);
  } catch (error) {
    logger.error("Database COnnection Failed" + error);
    process.exit(1);
  }
}

module.exports = connectToDB;
