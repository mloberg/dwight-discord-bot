import database from '../database';
import { FriendlyError } from '../error';
import portent from './portent';

jest.mock('../database');

const mockDatabase = jest.mocked(database);

describe('/portent', () => {
    beforeEach(() => {
        mockDatabase.get.mockReset();
        mockDatabase.set.mockReset();
    });

    it('is a slash command', () => {
        expect(portent).toMatchSnapshot();
    });

    describe('show', () => {
        it('shows available portent dice', async () => {
            mockDatabase.get.mockResolvedValue([1, 20]);

            const command = createMockCommand({ guild: { id: '1234' }, user: { id: '6789' } });
            command.options.getSubcommand.mockReturnValue('show');

            await portent.handle(command);
            expect(mockDatabase.get).toHaveBeenCalledWith('1234-6789', []);
            expect(command.reply).toHaveBeenCalledWith('1, 20');
        });

        it('shows no available dice', async () => {
            mockDatabase.get.mockResolvedValue([]);

            const command = createMockCommand({ guild: { id: '1234' }, user: { id: '6789' } });
            command.options.getSubcommand.mockReturnValue('show');

            await portent.handle(command);
            expect(command.reply).toHaveBeenCalledWith('No available portent dice.');
        });
    });

    describe('roll', () => {
        it('generates portent dice', async () => {
            const command = createMockCommand({ guild: { id: '1234' }, user: { id: '6789' } });
            command.options.getSubcommand.mockReturnValue('roll');

            await portent.handle(command);
            expect(command.reply).toHaveBeenCalledWith(expect.stringMatching(/^\d+, \d+$/));
            expect(mockDatabase.set).toHaveBeenCalledWith('1234-6789', expect.any(Array));
        });

        it('uses given portent dice', async () => {
            const command = createMockCommand({ guild: { id: '1234' }, user: { id: '6789' } });
            command.options.getSubcommand.mockReturnValue('roll');
            command.options.getInteger.mockReturnValueOnce(1);
            command.options.getInteger.mockReturnValueOnce(2);
            // does not use unless greater portent
            command.options.getInteger.mockReturnValueOnce(3);

            await portent.handle(command);
            expect(command.reply).toHaveBeenCalledWith('1, 2');
            expect(mockDatabase.set).toHaveBeenCalledWith('1234-6789', [1, 2]);
        });

        it('generates greater portent dice', async () => {
            const command = createMockCommand({ guild: { id: '1234' }, user: { id: '6789' } });
            command.options.getSubcommand.mockReturnValue('roll');
            command.options.getBoolean.mockReturnValue(true);

            await portent.handle(command);
            expect(command.reply).toHaveBeenCalledWith(expect.stringMatching(/^\d+, \d+, \d+$/));
        });

        it('uses given greater portent dice', async () => {
            const command = createMockCommand({ guild: { id: '1234' }, user: { id: '6789' } });
            command.options.getSubcommand.mockReturnValue('roll');
            command.options.getBoolean.mockReturnValue(true);
            command.options.getInteger.mockReturnValueOnce(1);
            command.options.getInteger.mockReturnValueOnce(2);
            command.options.getInteger.mockReturnValueOnce(3);

            await portent.handle(command);
            expect(command.reply).toHaveBeenCalledWith('1, 2, 3');
            expect(mockDatabase.set).toHaveBeenCalledWith('1234-6789', [1, 2, 3]);
        });
    });

    describe('use', () => {
        it('removes a portent die', async () => {
            mockDatabase.get.mockResolvedValue([1, 5, 20]);

            const command = createMockCommand({ guild: { id: '1234' }, user: { id: '6789' } });
            command.options.getSubcommand.mockReturnValue('use');
            command.options.getInteger.mockReturnValue(5);

            await portent.handle(command);
            expect(mockDatabase.set).toHaveBeenCalledWith('1234-6789', [1, 20]);
            expect(command.reply).toHaveBeenCalledWith('Remaining: 1, 20');
        });

        it('removes one portent die if two match', async () => {
            mockDatabase.get.mockResolvedValue([20, 20]);

            const command = createMockCommand({ guild: { id: '1234' }, user: { id: '6789' } });
            command.options.getSubcommand.mockReturnValue('use');
            command.options.getInteger.mockReturnValue(20);

            await portent.handle(command);
            expect(mockDatabase.set).toHaveBeenCalledWith('1234-6789', [20]);
            expect(command.reply).toHaveBeenCalledWith('Remaining: 20');
        });

        it('throws error if no portent die matches', async () => {
            mockDatabase.get.mockResolvedValue([1]);

            const command = createMockCommand({ guild: { id: '1234' }, user: { id: '6789' } });
            command.options.getSubcommand.mockReturnValue('use');
            command.options.getInteger.mockReturnValue(20);

            await expect(portent.handle(command)).rejects.toMatchError(
                new FriendlyError('No portent dice for 20. Available: 1'),
            );
        });
    });
});
