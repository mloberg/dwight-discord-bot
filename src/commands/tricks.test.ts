import { FriendlyError } from '../error';
import tricks from './tricks';

describe('/tricks', () => {
    it('is a slash command', () => {
        expect(tricks).toMatchSnapshot();
    });

    it('returns a creature', async () => {
        const command = createMockCommand();
        command.options.getString.mockReturnValue('rust');

        await tricks.handle(command);
        expect(command.reply).toHaveBeenCalledWith(expect.any(String));
    });

    it('returns a create for a dice roll', async () => {
        const command = createMockCommand();
        command.options.getString.mockReturnValue('gray');
        command.options.getInteger.mockReturnValue(3);

        await tricks.handle(command);
        expect(command.reply).toHaveBeenCalledWith('Badger');
    });

    it('throws an error if no creature is found', async () => {
        const command = createMockCommand();
        command.options.getString.mockReturnValue('tan');
        command.options.getInteger.mockReturnValue(20);

        await expect(tricks.handle(command)).rejects.toMatchError(
            new FriendlyError('Unable to pull from the Bag of Tricks.'),
        );
    });
});
