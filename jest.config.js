process.env.BOT_TOKEN = 'test';

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['./jest.setup.js'],
    setupFilesAfterEnv: ['jest-matcher-specific-error'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.test.json',
        },
    },
};
