const pino = require("pino-http").pinoHttp({
    transport: {
        target: "pino-pretty",
    },
});

const logger = pino.logger;

module.exports = { pino, logger };