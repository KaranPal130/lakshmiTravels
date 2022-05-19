const winston = require('winston');
const config = require('./config');
const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});
let colors = {
  debug: 'blue',
  info: 'green',
  error: 'red',
};
winston.addColors(colors);
let transports = [
  new winston.transports.Console({
      format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
          winston.format.colorize(),
          winston.format.simple(),
          winston.format.printf(({ level, message, timestamp, ...metadata }) => {
              let msg = `[${timestamp}] ${level}: ${message} `;
              return msg;
          })
      ),
  }),
];
const log = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  transports: transports,
});

module.exports = log;