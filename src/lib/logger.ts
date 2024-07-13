import pinoLogger from "pino";

export const logger = pinoLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
});
