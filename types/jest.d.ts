import 'jest-matcher-specific-error';

import { CommandInteraction } from 'discord.js';

declare global {
    function createMockCommand(extra?: Record<string, unknown>): jest.MaybeMockedDeep<CommandInteraction>;
}
