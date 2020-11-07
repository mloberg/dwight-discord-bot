import pino from 'pino';

import config from './config';

const logger = pino(
    {
        level: config.logLevel,
        prettyPrint: config.debug,
    },
    process.stderr,
);

export default logger;
