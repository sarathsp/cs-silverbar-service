const { createLogger, transports, format } = require('winston');
// eslint-disable-next-line no-unused-expressions

const path = require('path');

// Log locations are relative to the microservices
const logFolder = path.join(process.cwd(), '..', 'log');
const errorLog = path.join(logFolder, 'error.log');
const combinedLog = path.join(logFolder, 'combined.log');
// const exceptionLog = path.join(logFolder, 'exceptions.log');

// Format prints -> 2019-01-30T21:04:33.596Z (info): microservice listening on: port 3000
const timeFormat = format.printf(({
  level, message, timestamp,
}) => `${timestamp} (${level}): ${message}`);


const logger = createLogger({
  format: format.combine(
    format.splat(),
    format.colorize(),
    format.timestamp(),
    timeFormat,
  ),
  transports: [
    // Log errors to errorLog
    new transports.File({
      filename: errorLog,
      level: 'error',
    }),
    // Log everything to combinedLog
    new transports.File({
      filename: combinedLog,
    }),
  ],
});

// If the app is started in non production mode, also log to the console
// TODO start apps in production mode...
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.simple(),
    ),
  }));
}

// Expose a handler that adds a log file on a per require basis
logger.addTarget = (file) => {
  logger.add(new transports.File({
    filename: path.join(logFolder, `${file}.log`),
  }));
};

module.exports = logger;
