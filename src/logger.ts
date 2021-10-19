import pino from 'pino';

import config from './config';

export default pino({ level: config.logLevel });
