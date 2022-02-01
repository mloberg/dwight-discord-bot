import event, { events } from './event';

describe('/event', () => {
    it('is a slash command', () => {
        expect(event).toMatchSnapshot();
    });

    it('returns a random event', async () => {
        const command = createMockCommand();

        await event.handle(command);
        expect(events).toContainEqual(command.reply.mock.calls[0][0]);
    });

    it('returns an event for a dice roll', async () => {
        const command = createMockCommand();
        command.options.getInteger.mockReturnValue(1);

        await event.handle(command);
        expect(command.reply).toHaveBeenCalledWith('A door opens');
    });

    it('returns a generic event on invalid roll', async () => {
        const command = createMockCommand();
        command.options.getInteger.mockReturnValue(100);

        await event.handle(command);
        expect(command.reply).toHaveBeenCalledWith('Something happens');
    });
});
