import madness from './madness';

describe('/madness', () => {
    it('is a slash command', () => {
        expect(madness).toMatchSnapshot();
    });

    it('returns a random madness', async () => {
        const user = { send: jest.fn() };
        const command = createMockCommand();
        command.options.getString.mockReturnValue('short');
        command.options.getUser.mockReturnValue(user as never);

        await madness.handle(command);

        const content = expect.stringMatching(/^.*\. This lasts \d+ minutes\.$/);
        expect(user.send).toHaveBeenCalledWith(content);
        expect(command.reply).toHaveBeenCalledWith({ content, ephemeral: true });
    });

    it('returns a madness based on a roll', async () => {
        const command = createMockCommand();
        command.options.getString.mockReturnValue('flaw');
        command.options.getInteger.mockReturnValue(16);

        await madness.handle(command);
        expect(command.reply).toHaveBeenCalledWith({
            content: 'You gain the following flaw: "I keep whatever I find." This lasts until cured.',
            ephemeral: true,
        });
    });
});
