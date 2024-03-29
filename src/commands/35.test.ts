import { FriendlyError } from '../error';
import convert from './35';

describe('/35', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('is a slash command', () => {
        expect(convert).toMatchSnapshot();
    });

    it.each([
        ['use rope', 'DEX (Acrobatics)'],
        ['Use Magic Device', 'INT (Arcana)'],
        ['Ride', 'WIS (Animal Handling) or DEX (Acrobatics)'],
    ])('returns a comprable 5e skill for %s', async (skill, result) => {
        const command = createMockCommand();
        command.options.getString.mockReturnValue(skill);

        await convert.handle(command);
        expect(command.reply).toHaveBeenCalledWith(result);
    });

    it('throws errors on invalid skill', async () => {
        const command = createMockCommand();
        command.options.getString.mockReturnValue('foo');

        await expect(convert.handle(command)).rejects.toMatchError(new FriendlyError('I couldn\'t find skill "foo".'));
    });
});
