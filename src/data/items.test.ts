import axios from 'axios';
import { mocked } from 'ts-jest/utils';

import items from './items';

jest.mock('axios');

test('fetch and cache item list', async () => {
    const axiosMock = mocked(axios, true);
    axiosMock.get.mockResolvedValue({ data: { items: ['foo', 'bar'] } });

    const result = await items();

    expect(result).toEqual(['foo', 'bar']);

    const cached = await items();
    expect(cached).toEqual(result);

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith('https://everlastingdungeons.com/api/items.json');
});
