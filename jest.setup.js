global.createMockCommand = (extra = {}) => ({
    reply: jest.fn(),
    options: {
        getBoolean: jest.fn(),
        getInteger: jest.fn(),
        getString: jest.fn(),
        getSubcommand: jest.fn(),
        getUser: jest.fn(),
    },
    ...extra,
});
