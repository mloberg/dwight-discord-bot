import wildMagic, { barbarianTable, sorcererTable } from './wild-magic';

describe('/wildMagic', () => {
    it('is a slash command', () => {
        expect(wildMagic).toMatchSnapshot();
    });

    it('returns a random wild magic effect', async () => {
        const command = createMockCommand();

        await wildMagic.handle(command);
        expect(sorcererTable).toContainEqual(command.reply.mock.calls[0][0]);
    });

    it('returns a wild magic effect for a dice roll', async () => {
        const command = createMockCommand();
        command.options.getInteger.mockReturnValue(7);

        await wildMagic.handle(command);
        expect(command.reply).toHaveBeenCalledWith('You cast fireball as a 3rd-level spell centered on yourself.');
    });

    it('returns a random barbarian wild magic effect', async () => {
        const command = createMockCommand();
        command.options.getBoolean.mockReturnValue(true);

        await wildMagic.handle(command);
        expect(barbarianTable).toContainEqual(command.reply.mock.calls[0][0]);
    });

    it('returns a barbarian wild magic effect for a dice roll', async () => {
        const command = createMockCommand();
        command.options.getBoolean.mockReturnValue(true);
        command.options.getInteger.mockReturnValue(7);

        await wildMagic.handle(command);
        expect(command.reply).toHaveBeenCalledWith(
            'Flowers and vines temporarily grow around you; until your rage ends, the ground within 15 feet of you is difficult terrain for your enemies.',
        );
    });
});
