import fetch from 'node-fetch';
import { mocked } from 'ts-jest/utils';

import spells from '../../src/data/spells';

const { Response } = jest.requireActual('node-fetch');

jest.mock('node-fetch');

test('fetch and cache spell list', async () => {
    const fetchMock = mocked(fetch, true);
    fetchMock.mockReturnValue(
        Promise.resolve(
            new Response('{"spells":[{"spell":"Foo","level":3,"school":"divination","class":["Bard","Cleric"]}]}'),
        ),
    );

    const result = await spells();

    expect(result.length).toEqual(1);
    expect(result[0].spell).toEqual('Foo');

    const cached = await spells();
    expect(cached).toEqual(result);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('https://everlastingdungeons.com/api/spells.json');
});
