import database from '../database';
import { FriendlyError } from '../error';
import illusions from './illusions';

jest.mock('../database');

const mockDatabase = jest.mocked(database);

describe('/illusions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('is a slash command', () => {
        expect(illusions).toMatchSnapshot();
    });

    describe('new', () => {
        it('creates a deck of illusions', async () => {
            const command = createMockCommand({ guild: { id: '1234' }, user: { id: '6789' } });
            command.options.getSubcommand.mockReturnValue('new');
            command.options.getInteger.mockReturnValue(0);

            await illusions.handle(command);
            expect(mockDatabase.set).toHaveBeenCalledWith(
                'illusions:1234-6789',
                expect.arrayContaining(['You', 'Goblin']),
            );
        });

        it('creates a deck of illusions with missing cards', async () => {
            const command = createMockCommand({ guild: { id: '1234' }, user: { id: '6789' } });
            command.options.getSubcommand.mockReturnValue('new');

            await illusions.handle(command);
            expect(mockDatabase.set).toHaveBeenCalledWith('illusions:1234-6789', expect.any(Array));
            expect((mockDatabase.set.mock.calls[0][1] as string[]).length).toBeLessThanOrEqual(34);
        });
    });

    describe('pull', () => {
        it('pulls a card', async () => {
            mockDatabase.get.mockResolvedValue(['Goblin', 'Orc', 'You']);

            const command = createMockCommand({ guild: { id: '1234' }, user: { id: '6789' } });

            await illusions.handle(command);
            expect(command.reply).toHaveBeenCalledWith('You');
            expect(mockDatabase.set).toHaveBeenCalledWith('illusions:1234-6789', ['Goblin', 'Orc']);
        });

        it('throws error if no cards can be drawn', async () => {
            mockDatabase.get.mockResolvedValue([]);

            const command = createMockCommand({ guild: { id: '1234' }, user: { id: '6789' } });

            await expect(illusions.handle(command)).rejects.toMatchError(new FriendlyError('Unable to draw a card.'));
        });
    });
});
