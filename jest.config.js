process.env.BOT_TOKEN = 'test';

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['jest-matcher-specific-error'],
};
