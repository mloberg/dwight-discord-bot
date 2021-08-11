import joi from 'joi';
import { LevelWithSilent } from 'pino';

export const schema = joi
    .object({
        NODE_ENV: joi.string().lowercase().valid('development', 'test', 'production').default('production'),
        LOG_LEVEL: joi
            .string()
            .valid('fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent')
            .lowercase()
            .default('info'),
        APP_DEBUG: joi.boolean().default(false),
        BOT_PREFIX: joi.string().invalid('@').default('?'),
        BOT_TOKEN: joi.string().required(),
        API_URL: joi.string().default('https://everlastingdungeons.com/api'),
        DB_URL: joi.string(),
        GUILD_ID: joi.string(),
    })
    .unknown()
    .required();

const { error, value: env } = schema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export default {
    isTest: env.NODE_ENV === 'test',
    env: env.NODE_ENV as 'development' | 'test' | 'production',
    logLevel: env.LOG_LEVEL as LevelWithSilent,
    debug: env.APP_DEBUG as boolean,
    prefix: env.BOT_PREFIX as string,
    token: env.BOT_TOKEN as string,
    apiUrl: env.API_URL as string,
    dbUrl: env.DB_URL as string | undefined,
    guildID: env.GUILD_ID as string | undefined,
};
