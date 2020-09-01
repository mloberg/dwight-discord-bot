import fetch from 'node-fetch';
import { mocked } from 'ts-jest/utils';

import items from './items';

const { Response } = jest.requireActual('node-fetch');

jest.mock('node-fetch');

test('fetch and cache item list', async () => {
    const fetchMock = mocked(fetch, true);
    fetchMock.mockReturnValue(
        Promise.resolve(
            new Response('{"items":[{"item":"Foo","type":"Bar","subtype":null,"rarity":"common","attunement":false}]}'),
        ),
    );

    const result = await items();

    expect(result.length).toEqual(1);
    expect(result[0].item).toEqual('Foo');

    const cached = await items();
    expect(cached).toEqual(result);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('https://everlastingdungeons.com/api/items.json');
});
