import { pinoHttp, Options } from "pino-http";
import pinoPretty from "pino-pretty";

const pino = pinoHttp({
  customLogLevel: (res, err) => {
    if (res.statusCode! >= 400 && res.statusCode! < 500) {
      return "warn";
    } else if (res.statusCode! >= 500 || err) {
      return "error";
    }
    return "info";
  },
  prettifier: pinoPretty,
} as Options);

const logger = pino.logger;

export { pino, logger };
