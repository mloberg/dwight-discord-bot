import { schema } from './config';

const defaults = { BOT_TOKEN: 'xxx' };

describe('env.NODE_ENV', () => {
    it('defaults to production', () => {
        const { error, value } = schema.validate(defaults);

        expect(error).toBeFalsy();
        expect(value.NODE_ENV).toEqual('production');
    });

    it('allows valid values', () => {
        expect(schema.validate({ NODE_ENV: 'development', ...defaults }).error).toBeFalsy();
        expect(schema.validate({ NODE_ENV: 'test', ...defaults }).error).toBeFalsy();
        expect(schema.validate({ NODE_ENV: 'production', ...defaults }).error).toBeFalsy();
        expect(schema.validate({ NODE_ENV: 'PRODUCTION', ...defaults }).error).toBeFalsy();
    });

    it('returns an error on invalid env', () => {
        expect(schema.validate({ NODE_ENV: 'foo', ...defaults }).error?.message).toEqual(
            '"NODE_ENV" must be one of [development, test, production]',
        );
    });
});

describe('env.LOG_LEVEL', () => {
    it('defaults to info', () => {
        const { error, value } = schema.validate(defaults);

        expect(error).toBeFalsy();
        expect(value.LOG_LEVEL).toEqual('info');
    });

    it('allows valid values', () => {
        expect(schema.validate({ LOG_LEVEL: 'error', ...defaults }).error).toBeFalsy();
        expect(schema.validate({ LOG_LEVEL: 'debug', ...defaults }).error).toBeFalsy();
        expect(schema.validate({ LOG_LEVEL: 'silent', ...defaults }).error).toBeFalsy();
        expect(schema.validate({ LOG_LEVEL: 'INFO', ...defaults }).error).toBeFalsy();
    });

    it('returns an error on invalid level', () => {
        expect(schema.validate({ LOG_LEVEL: 'foo', ...defaults }).error?.message).toEqual(
            '"LOG_LEVEL" must be one of [fatal, error, warn, info, debug, silent]',
        );
    });
});

describe('env.DEBUG', () => {
    it('defaults to false', () => {
        const { error, value } = schema.validate(defaults);

        expect(error).toBeFalsy();
        expect(value.APP_DEBUG).toEqual(false);
    });

    it('allows valid values', () => {
        expect(schema.validate({ APP_DEBUG: 'true', ...defaults }).error).toBeFalsy();
        expect(schema.validate({ APP_DEBUG: 'false', ...defaults }).error).toBeFalsy();
        expect(schema.validate({ APP_DEBUG: 'TRUE', ...defaults }).error).toBeFalsy();
        expect(schema.validate({ APP_DEBUG: 'FALSE', ...defaults }).error).toBeFalsy();
    });

    it('returns an error on invalid level', () => {
        expect(schema.validate({ APP_DEBUG: 'foo', ...defaults }).error?.message).toEqual(
            '"APP_DEBUG" must be a boolean',
        );
    });
});

describe('env.BOT_TOKEN', () => {
    it('is required', () => {
        expect(schema.validate({}).error?.message).toEqual('"BOT_TOKEN" is required');
    });
});
