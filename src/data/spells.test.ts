import axios from 'axios';

import spells from './spells';

jest.mock('axios');

test('fetch and cache spell list', async () => {
    const axiosMock = jest.mocked(axios, true);
    axiosMock.get.mockResolvedValue({ data: { spells: ['foo', 'bar'] } });

    const result = await spells();

    expect(result).toEqual(['foo', 'bar']);

    const cached = await spells();
    expect(cached).toEqual(result);

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith('https://everlastingdungeons.com/api/spells.json');
});
