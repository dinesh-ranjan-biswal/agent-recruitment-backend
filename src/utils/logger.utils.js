import winston from "winston";

// Define custom colors for log levels
const customColors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  verbose: "cyan",
  debug: "blue",
  silly: "grey"
};

// Add custom colors to winston
winston.addColors(customColors);

// Create a winston logger instance
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize({ all: true }), // Colorize the entire log output
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      // Everything here will be colorized
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console()
    // Optionally, you can add other transports like File
    // new winston.transports.File({ filename: 'application.log' })
  ]
});

export default logger;
