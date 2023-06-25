import logger from 'pino';

export const log = logger({
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'SYS:yyyy/mm/dd HH:MM:ss',
      ignore: 'pid,hostname',
    },
  },
});
