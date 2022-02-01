import database from '../database';
import { FriendlyError } from '../error';
import many from './many';

jest.mock('../database');

const mockDatabase = jest.mocked(database);

describe('/many', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('is a slash command', () => {
        expect(many).toMatchSnapshot();
    });

    describe('new', () => {
        it('creates a deck of many', async () => {
            const command = createMockCommand({ user: { id: '1234' } });
            command.options.getSubcommand.mockReturnValue('new');

            await many.handle(command);
            expect(command.reply).toHaveBeenCalledWith('You find a mysterious deck of cards.');
            expect(mockDatabase.set).toHaveBeenCalledWith('many:1234', expect.arrayContaining(['Sun']));
            expect(mockDatabase.set.mock.calls[0][1]).toHaveLength(13);
        });

        it('creates a full deck of many', async () => {
            const command = createMockCommand({ user: { id: '1234' } });
            command.options.getSubcommand.mockReturnValue('new');
            command.options.getBoolean.mockReturnValueOnce(true);

            await many.handle(command);
            expect(command.reply).toHaveBeenCalledWith('You find a mysterious deck of cards.');
            expect(mockDatabase.set).toHaveBeenCalledWith('many:1234', expect.arrayContaining(['Gem']));
            expect(mockDatabase.set.mock.calls[0][1]).toHaveLength(22);
        });

        it('generates a deck with missing cards', async () => {
            const command = createMockCommand({ user: { id: '1234' } });
            command.options.getSubcommand.mockReturnValue('new');
            command.options.getInteger.mockReturnValue(3);

            await many.handle(command);
            expect(command.reply).toHaveBeenCalledWith('You find a mysterious deck of cards.');
            expect(mockDatabase.set.mock.calls[0][1]).toHaveLength(10);
        });
    });

    describe('pull', () => {
        it('pulls a card', async () => {
            mockDatabase.get.mockResolvedValue(['Moon']);

            const command = createMockCommand({ user: { id: '1234' } });

            await many.handle(command);
            expect(command.reply).toHaveBeenCalledWith(
                '**Moon** You are granted the ability to cast the wish spell 1d3 times.',
            );
            expect(mockDatabase.set).toHaveBeenCalledWith('many:1234', ['Moon']);
        });

        it.each(['Fool', 'Jester'])('removes %s once drawn', async (card) => {
            mockDatabase.get.mockResolvedValue([card]);

            const command = createMockCommand({ user: { id: '1234' } });

            await many.handle(command);
            expect(command.reply).toHaveBeenCalledWith(expect.stringContaining('card'));
            expect(mockDatabase.set).toHaveBeenCalledWith('many:1234', []);
        });

        it('throws error if no cards can be drawn', async () => {
            mockDatabase.get.mockResolvedValue([]);

            const command = createMockCommand({ user: { id: '1234' } });

            await expect(many.handle(command)).rejects.toMatchError(new FriendlyError('Unable to draw a card.'));
        });
    });
});
