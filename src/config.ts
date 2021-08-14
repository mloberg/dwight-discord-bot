import joi from 'joi';
import { LevelWithSilent } from 'pino';

export const schema = joi
    .object({
        API_URL: joi.string().default('https://everlastingdungeons.com/api'),
        APP_DEBUG: joi.boolean().default(false),
        BOT_TOKEN: joi.string().required(),
        CLIENT_ID: joi.string(),
        DB_URL: joi.string(),
        GUILD_ID: joi.string(),
        LOG_LEVEL: joi.string().valid('fatal', 'error', 'warn', 'info', 'debug', 'silent').lowercase().default('info'),
        NODE_ENV: joi.string().lowercase().valid('development', 'test', 'production').default('production'),
    })
    .unknown()
    .required();

const { error, value: env } = schema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export default {
    apiUrl: env.API_URL as string,
    clientID: env.CLIENT_ID as string | undefined,
    dbUrl: env.DB_URL as string | undefined,
    debug: env.APP_DEBUG as boolean,
    env: env.NODE_ENV as 'development' | 'test' | 'production',
    guildID: env.GUILD_ID as string | undefined,
    isTest: env.NODE_ENV === 'test',
    logLevel: env.LOG_LEVEL as LevelWithSilent,
    token: env.BOT_TOKEN as string,
};
