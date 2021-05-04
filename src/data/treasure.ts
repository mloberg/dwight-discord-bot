import { Dictionary } from 'lodash';

import magicTable from './table';

export const gems = {
    '10gp': [
        'Azurite (opaque mottled deep blue)',
        'Banded agate (translucent striped brown, blue, white, or red)',
        'Blue quartz (transparent pale blue)',
        'Eye agate (translucent circles of gray, white, brown, blue, or green)',
        'Hematite (opaque gray-black)',
        'Lapis lazuli (opaque light and dark blue with yellow flecks)',
        'Malachite (opaque striated light and dark green)',
        'Moss agate (translucent pink or yellow-white with mossy gray or green markings)',
        'Obsidian (opaque black)',
        'Rhodochrosite (opaque light pink)',
        'Tiger eye (translucent brown with golden center)',
        'Turquoise (opaque light blue-green)',
    ],
    '50gp': [
        'Bloodstone (opaque dark gray with red flecks)',
        'Carnelian (opaque orange to red-brown)',
        'Chalcedony (opaque white)',
        'Chrysoprase (translucent green)',
        'Citrine (transparent pale yellow-brown)',
        'Jasper (opaque blue, black, or brown)',
        'Moonstone (translucent white with pale blue glow)',
        'Onyx (opaque bands of black and white, or pure black or white)',
        'Quartz (transparent white, smoky gray, or yellow)',
        'Sardonyx (opaque bands of red and white)',
        'Star rose quartz (translucent rosy stone with white star-shaped center)',
        'Zircon (transparent pale blue-green)',
    ],
    '100gp': [
        'Amber (transparent watery gold to rich gold)',
        'Amethyst (transparent deep purple)',
        'Chrysoberyl (transparent yellow-green to pale green)',
        'Coral (opaque crimson)',
        'Garnet (transparent red, brown-green, or violet)',
        'Jade (translucent light green, deep green, or white)',
        'Jet (opaque deep black)',
        'Pearl (opaque lustrous white, yellow, or pink)',
        'Spinel (transparent red, red-brown, or deep green)',
        'Tourmaline (transparent pale green, blue, brown, or red)',
    ],
    '500gp': [
        'Alexandrite (transparent dark green)',
        'Aquamarine (transparent pale blue-green)',
        'Black pearl (opaque pure black)',
        'Blue spinel (transparent deep blue)',
        'Peridot (transparent rich olive green)',
        'Topaz (transparent golden yellow)',
    ],
    '1000gp': [
        'Black opal (translucent dark green with black mottling and golden flecks)',
        'Blue sapphire (transparent blue-white to medium blue)',
        'Emerald (transparent deep bright green)',
        'Fire opal (translucent fiery red)',
        'Opal (translucent pale blue with green and golden mottling)',
        'Star ruby (translucent ruby with white star-shaped center)',
        'Star sapphire (translucent blue sapphire with white star-shaped center)',
        'Yellow sapphire (transparent fiery yellow or yellow-green)',
    ],
    '5000gp': [
        'Black sapphire (translucent lustrous black with glowing highlights)',
        'Diamond (transparent blue-white, canary, pink, brown, or blue)',
        'Jacinth (transparent fiery orange)',
        'Ruby (transparent clear red to deep crimson)',
    ],
};

export const art = {
    '25gp': [
        'Silver ewer',
        'Carved bone statuette',
        'Small gold bracelet',
        'Cloth-of-gold vestments',
        'Black velvet mask stitched with silver thread',
        'Copper chalice with silver filigree',
        'Pair of engraved bone dice',
        'Small mirror set in a painted wooden frame',
        'Embroidered silk handkerchief',
        'Gold locket with a painted portrait inside',
    ],
    '250gp': [
        'Gold ring set with bloodstones',
        'Carved ivory statuette',
        'Large gold bracelet',
        'Silver necklace with a gemstone pendant',
        'Bronze crown',
        'Silk robe with gold embroidery',
        'Large well-made tapestry',
        'Brass mug with jade inlay',
        'Box of turquoise animal figurines',
        'Gold bird cage with electrum filigree',
    ],
    '750gp': [
        'Silver chalice set with moonstones',
        'Silver-plated steel longsword with jet set in hilt',
        'Carved harp of exotic wood with ivory inlay and zircon gems',
        'Small gold idol',
        'Gold dragon comb set with red garnets as eyes',
        'Bottle stopper cork embossed with gold leaf and set with amethysts',
        'Ceremonial electrum dagger with a black pearl in the pommel',
        'Silver and gold brooch',
        'Obsidian statuette with gold fittings and inlay',
        'Painted gold war mask',
    ],
    '2500gp': [
        'Fine gold chain set with a fire opal',
        'Old masterpiece painting',
        'Embroidered silk and velvet mantle set with numerous moonstones',
        'Platinum bracelet set with a sapphire',
        'Embroidered glove set with jewel chips',
        'Jeweled anklet',
        'Gold music box',
        'Gold circlet set with four aquamarines',
        'Eye patch with a mock eye set in blue sapphire and moonstone',
        'A necklace string of small pink pearls',
    ],
    '7500gp': [
        'Jeweled gold crown',
        'Jeweled platinum ring',
        'Small gold statuette set with rubies',
        'Gold cup set with emeralds',
        'Gold jewelry box with platinum filigree',
        'Painted gold child’s sarcophagus',
        'Jade game board with solid gold playing pieces',
        'Bejeweled ivory drinking horn with gold filigree',
    ],
};

export function crIndex(cr: number): string {
    if (cr <= 4) {
        return '0-4';
    }
    if (cr <= 10) {
        return '5-10';
    }
    if (cr <= 16) {
        return '11-16';
    }
    return '17+';
}

const hoardCoins = {
    '0-4': [
        ['6d6x100', 'cp'],
        ['3d6×100', 'sp'],
        ['2d6×10', 'gp'],
    ],
    '5-10': [
        ['2d6x100', 'cp'],
        ['2d6×1000', 'sp'],
        ['6d6×100', 'gp'],
        ['3d6x10', 'pp'],
    ],
    '11-16': [
        ['4d6×1000', 'gp'],
        ['5d6x100', 'pp'],
    ],
    '17+': [
        ['12d6×1000', 'gp'],
        ['8d6x1000', 'pp'],
    ],
};

export const individual: Dictionary<string[][]> = {
    '0-4': [
        ...new Array(30).fill([
            // 1–30
            ['5d6', 'cp'],
        ]),
        ...new Array(30).fill([
            // 31–60
            ['5d6', 'sp'],
        ]),
        ...new Array(10).fill([
            // 61–70
            ['3d6', 'ep'],
        ]),
        ...new Array(25).fill([
            // 71–95
            ['3d6', 'gp'],
        ]),
        ...new Array(5).fill([
            // 96–100
            ['1d6', 'pp'],
        ]),
    ],
    '5-10': [
        ...new Array(30).fill([
            // 1–30
            ['4d6×100', 'cp'],
            ['1d6×10', 'ep'],
        ]),
        ...new Array(30).fill([
            // 31–60
            ['6d6×10', 'sp'],
            ['2d6×10', 'gp'],
        ]),
        ...new Array(10).fill([
            // 61–70
            ['3d6x10', 'ep'],
            ['2d6×10', 'gp'],
        ]),
        ...new Array(25).fill([
            // 71–95
            ['4d6×10', 'gp'],
        ]),
        ...new Array(5).fill([
            // 96–100
            ['2d6×10', 'gp'],
            ['3d6', 'pp'],
        ]),
    ],
    '11-16': [
        ...new Array(20).fill([
            // 1–20
            ['4d6×100', 'sp'],
            ['1d6×100', 'gp'],
        ]),
        ...new Array(15).fill([
            // 21–35
            ['1d6×100', 'ep'],
            ['1d6×100', 'gp'],
        ]),
        ...new Array(40).fill([
            // 36–75
            ['2d6×100', 'gp'],
            ['1d6×10', 'pp'],
        ]),
        ...new Array(25).fill([
            // 76–00
            ['2d6×100', 'gp'],
            ['2d6×10', 'pp'],
        ]),
    ],
    '17+': [
        ...new Array(15).fill([
            // 1–15
            ['2d6×1000', 'ep'],
            ['8d6×100', 'gp'],
        ]),
        ...new Array(40).fill([
            // 16–55
            ['1d6×1000', 'gp'],
            ['1d6×100', 'pp'],
        ]),
        ...new Array(45).fill([
            // 56–100
            ['1d6×1000', 'gp'],
            ['2d6×100', 'pp'],
        ]),
    ],
};

export const hoard: Dictionary<(string | (string | (() => Promise<string>))[])[][][]> = {
    '0-4': [
        ...new Array(6).fill(hoardCoins['0-4']), // 1-6
        ...new Array(10).fill([
            // 7-16
            ...hoardCoins['0-4'],
            ['2d6', 'Gem', gems['10gp']],
        ]),
        ...new Array(10).fill([
            // 17-26
            ...hoardCoins['0-4'],
            ['2d4', 'Art', art['25gp']],
        ]),
        ...new Array(10).fill([
            // 27-36
            ...hoardCoins['0-4'],
            ['2d6', 'Gem', gems['50gp']],
        ]),
        ...new Array(8).fill([
            // 37-44
            ...hoardCoins['0-4'],
            ['2d6', 'Gem', gems['10gp']],
            ['1d5', 'Item', magicTable.a],
        ]),
        ...new Array(8).fill([
            // 45-52
            ...hoardCoins['0-4'],
            ['2d4', 'Art', art['25gp']],
            ['1d6', 'Item', magicTable.a],
        ]),
        ...new Array(8).fill([
            // 53-60
            ...hoardCoins['0-4'],
            ['2d6', 'Gem', gems['50gp']],
            ['1d6', 'Item', magicTable.a],
        ]),
        ...new Array(5).fill([
            // 61-65
            ...hoardCoins['0-4'],
            ['2d6', 'Gem', gems['10gp']],
            ['1d4', 'Item', magicTable.b],
        ]),
        ...new Array(5).fill([
            // 66-70
            ...hoardCoins['0-4'],
            ['2d4', 'Art', art['25gp']],
            ['1d4', 'Item', magicTable.b],
        ]),
        ...new Array(5).fill([
            // 71-75
            ...hoardCoins['0-4'],
            ['2d6', 'Gem', gems['50gp']],
            ['1d4', 'Item', magicTable.b],
        ]),
        ...new Array(3).fill([
            // 76–78
            ...hoardCoins['0-4'],
            ['2d6', 'Gem', gems['10gp']],
            ['1d4', 'Item', magicTable.c],
        ]),
        ...new Array(2).fill([
            // 79–80
            ...hoardCoins['0-4'],
            ['2d4', 'Art', art['25gp']],
            ['1d4', 'Item', magicTable.c],
        ]),
        ...new Array(5).fill([
            // 81–85
            ...hoardCoins['0-4'],
            ['2d6', 'Gem', gems['50gp']],
            ['1d4', 'Item', magicTable.c],
        ]),
        ...new Array(7).fill([
            // 86–92
            ...hoardCoins['0-4'],
            ['2d4', 'Art', art['25gp']],
            ['1d4', 'Item', magicTable.f],
        ]),
        ...new Array(5).fill([
            // 93–97
            ...hoardCoins['0-4'],
            ['2d6', 'Gem', gems['50gp']],
            ['1d4', 'Item', magicTable.f],
        ]),
        ...new Array(2).fill([
            // 98–99
            ...hoardCoins['0-4'],
            ['2d6', 'Art', art['25gp']],
            ['d1', 'Item', magicTable.g],
        ]),
        [
            // 00
            ...hoardCoins['0-4'],
            ['2d6', 'Gem', gems['50gp']],
            ['d1', 'Item', magicTable.g],
        ],
    ],
    '5-10': [
        ...new Array(4).fill(hoardCoins['5-10']), // 1-4
        ...new Array(6).fill([
            // 05–10
            ...hoardCoins['5-10'],
            ['2d4', 'Art', art['25gp']],
        ]),
        ...new Array(6).fill([
            // 11–16
            ...hoardCoins['5-10'],
            ['3d6', 'Gem', gems['50gp']],
        ]),
        ...new Array(6).fill([
            // 17–22
            ...hoardCoins['5-10'],
            ['3d6', 'Gem', gems['100gp']],
        ]),
        ...new Array(6).fill([
            // 23–28
            ...hoardCoins['5-10'],
            ['2d4', 'Art', art['250gp']],
        ]),
        ...new Array(4).fill([
            // 29–32
            ...hoardCoins['5-10'],
            ['2d4', 'Art', art['25gp']],
            ['1d6', 'Item', magicTable.a],
        ]),
        ...new Array(4).fill([
            // 33–36
            ...hoardCoins['5-10'],
            ['3d6', 'Gem', gems['50gp']],
            ['1d6', 'Item', magicTable.a],
        ]),
        ...new Array(4).fill([
            // 37–40
            ...hoardCoins['5-10'],
            ['3d6', 'Gem', gems['100gp']],
            ['1d6', 'Item', magicTable.a],
        ]),
        ...new Array(4).fill([
            // 41–44
            ...hoardCoins['5-10'],
            ['2d4', 'Art', art['250gp']],
            ['1d6', 'Item', magicTable.a],
        ]),
        ...new Array(5).fill([
            // 45–49
            ...hoardCoins['5-10'],
            ['2d4', 'Art', art['25gp']],
            ['1d4', 'Item', magicTable.b],
        ]),
        ...new Array(5).fill([
            // 50–54
            ...hoardCoins['5-10'],
            ['3d6', 'Gem', gems['50gp']],
            ['1d4', 'Item', magicTable.b],
        ]),
        ...new Array(5).fill([
            // 55–59
            ...hoardCoins['5-10'],
            ['3d6', 'Gem', gems['100gp']],
            ['1d4', 'Item', magicTable.b],
        ]),
        ...new Array(4).fill([
            // 60–63
            ...hoardCoins['5-10'],
            ['2d4', 'Art', art['250gp']],
            ['1d4', 'Item', magicTable.b],
        ]),
        ...new Array(3).fill([
            // 64–66
            ...hoardCoins['5-10'],
            ['2d4', 'Art', art['25gp']],
            ['1d4', 'Item', magicTable.c],
        ]),
        ...new Array(3).fill([
            // 67–69
            ...hoardCoins['5-10'],
            ['3d6', 'Gem', gems['50gp']],
            ['1d4', 'Item', magicTable.c],
        ]),
        ...new Array(3).fill([
            // 70–72
            ...hoardCoins['5-10'],
            ['3d6', 'Gem', gems['100gp']],
            ['1d4', 'Item', magicTable.c],
        ]),
        ...new Array(2).fill([
            // 73–74
            ...hoardCoins['5-10'],
            ['2d4', 'Art', art['250gp']],
            ['1d4', 'Item', magicTable.c],
        ]),
        ...new Array(2).fill([
            // 75–76
            ...hoardCoins['5-10'],
            ['2d4', 'Art', art['25gp']],
            ['d1', 'Item', magicTable.d],
        ]),
        ...new Array(2).fill([
            // 77–78
            ...hoardCoins['5-10'],
            ['3d6', 'Gem', gems['50gp']],
            ['d1', 'Item', magicTable.d],
        ]),
        [
            // 79
            ...hoardCoins['5-10'],
            ['3d6', 'Gem', gems['100gp']],
            ['d1', 'Item', magicTable.d],
        ],
        [
            // 80
            ...hoardCoins['5-10'],
            ['2d4', 'Art', art['250gp']],
            ['d1', 'Item', magicTable.d],
        ],
        ...new Array(4).fill([
            // 81–84
            ...hoardCoins['5-10'],
            ['2d4', 'Art', art['25gp']],
            ['1d4', 'Item', magicTable.f],
        ]),
        ...new Array(4).fill([
            // 85–88
            ...hoardCoins['5-10'],
            ['3d6', 'Gem', gems['50gp']],
            ['1d4', 'Item', magicTable.f],
        ]),
        ...new Array(3).fill([
            // 89–91
            ...hoardCoins['5-10'],
            ['3d6', 'Gem', gems['100gp']],
            ['1d4', 'Item', magicTable.f],
        ]),
        ...new Array(3).fill([
            // 92–94
            ...hoardCoins['5-10'],
            ['2d4', 'Art', art['250gp']],
            ['1d4', 'Item', magicTable.f],
        ]),
        ...new Array(2).fill([
            // 95–96
            ...hoardCoins['5-10'],
            ['3d6', 'Gem', gems['100gp']],
            ['1d4', 'Item', magicTable.g],
        ]),
        ...new Array(2).fill([
            // 97–98
            ...hoardCoins['5-10'],
            ['2d4', 'Art', art['250gp']],
            ['1d4', 'Item', magicTable.g],
        ]),
        [
            // 99
            ...hoardCoins['5-10'],
            ['3d6', 'Gem', gems['100gp']],
            ['d1', 'Item', magicTable.h],
        ],
        [
            // 00
            ...hoardCoins['5-10'],
            ['2d4', 'Art', art['250gp']],
            ['d1', 'Item', magicTable.h],
        ],
    ],
    '11-16': [
        ...new Array(3).fill(hoardCoins['11-16']), // 1-3
        ...new Array(3).fill([
            // 4-6
            ...hoardCoins['11-16'],
            ['2d4', 'Art', art['250gp']],
        ]),
        ...new Array(3).fill([
            // 7-9
            ...hoardCoins['11-16'],
            ['2d4', 'Art', art['750gp']],
        ]),
        ...new Array(3).fill([
            // 10-12
            ...hoardCoins['11-16'],
            ['3d6', 'Gem', gems['500gp']],
        ]),
        ...new Array(3).fill([
            // 13-15
            ...hoardCoins['11-16'],
            ['3d6', 'Gem', gems['500gp']],
        ]),
        ...new Array(4).fill([
            // 16-19
            ...hoardCoins['11-16'],
            ['2d4', 'Art', art['250gp']],
            ['1d4', 'Item', magicTable.a],
            ['1d6', 'Item', magicTable.b],
        ]),
        ...new Array(4).fill([
            // 20-23
            ...hoardCoins['11-16'],
            ['2d4', 'Art', art['750gp']],
            ['1d4', 'Item', magicTable.a],
            ['1d6', 'Item', magicTable.b],
        ]),
        ...new Array(3).fill([
            // 24-26
            ...hoardCoins['11-16'],
            ['3d6', 'Gem', gems['500gp']],
            ['1d4', 'Item', magicTable.a],
            ['1d6', 'Item', magicTable.b],
        ]),
        ...new Array(3).fill([
            // 27-29
            ...hoardCoins['11-16'],
            ['3d6', 'Gem', gems['1000gp']],
            ['1d4', 'Item', magicTable.a],
            ['1d6', 'Item', magicTable.b],
        ]),
        ...new Array(6).fill([
            // 30-35
            ...hoardCoins['11-16'],
            ['2d4', 'Art', art['250gp']],
            ['1d6', 'Item', magicTable.c],
        ]),
        ...new Array(5).fill([
            // 36-40
            ...hoardCoins['11-16'],
            ['2d4', 'Art', art['750gp']],
            ['1d6', 'Item', magicTable.c],
        ]),
        ...new Array(5).fill([
            // 41-45
            ...hoardCoins['11-16'],
            ['3d6', 'Gem', gems['500gp']],
            ['1d6', 'Item', magicTable.c],
        ]),
        ...new Array(5).fill([
            // 46-50
            ...hoardCoins['11-16'],
            ['3d6', 'Gem', gems['1000gp']],
            ['1d6', 'Item', magicTable.c],
        ]),
        ...new Array(4).fill([
            // 51-54
            ...hoardCoins['11-16'],
            ['2d4', 'Art', art['250gp']],
            ['1d4', 'Item', magicTable.d],
        ]),
        ...new Array(4).fill([
            // 55-58
            ['2d4', 'Art', art['750gp']],
            ['1d4', 'Item', magicTable.d],
        ]),
        ...new Array(4).fill([
            // 59-62
            ...hoardCoins['11-16'],
            ['3d6', 'Gem', gems['500gp']],
            ['1d4', 'Item', magicTable.d],
        ]),
        ...new Array(4).fill([
            // 63-66
            ...hoardCoins['11-16'],
            ['3d6', 'Gem', gems['1000gp']],
            ['1d4', 'Item', magicTable.d],
        ]),
        ...new Array(2).fill([
            // 67–68
            ...hoardCoins['11-16'],
            ['2d4', 'Art', art['250gp']],
            ['d1', 'Item', magicTable.e],
        ]),
        ...new Array(2).fill([
            // 69–70
            ...hoardCoins['11-16'],
            ['2d4', 'Art', art['750gp']],
            ['d1', 'Item', magicTable.e],
        ]),
        ...new Array(2).fill([
            // 71–72
            ...hoardCoins['11-16'],
            ['3d6', 'Gem', gems['500gp']],
            ['d1', 'Item', magicTable.e],
        ]),
        ...new Array(2).fill([
            // 73–74
            ...hoardCoins['11-16'],
            ['3d6', 'Gem', gems['1000gp']],
            ['d1', 'Item', magicTable.e],
        ]),
        ...new Array(2).fill([
            // 75–76
            ...hoardCoins['11-16'],
            ['2d4', 'Art', art['250gp']],
            ['d1', 'Item', magicTable.f],
            ['1d4', 'Item', magicTable.g],
        ]),
        ...new Array(2).fill([
            // 77–78
            ...hoardCoins['11-16'],
            ['2d4', 'Art', art['750gp']],
            ['d1', 'Item', magicTable.f],
            ['1d4', 'Item', magicTable.g],
        ]),
        ...new Array(2).fill([
            // 79–80
            ...hoardCoins['11-16'],
            ['3d6', 'Gem', gems['500gp']],
            ['d1', 'Item', magicTable.f],
            ['1d4', 'Item', magicTable.g],
        ]),
        ...new Array(2).fill([
            // 81–82
            ...hoardCoins['11-16'],
            ['3d6', 'Gem', gems['1000gp']],
            ['d1', 'Item', magicTable.f],
            ['1d4', 'Item', magicTable.g],
        ]),
        ...new Array(3).fill([
            // 83–85
            ...hoardCoins['11-16'],
            ['2d4', 'Art', art['250gp']],
            ['1d4', 'Item', magicTable.h],
        ]),
        ...new Array(3).fill([
            // 86–88
            ...hoardCoins['11-16'],
            ['2d4', 'Art', art['7500gp']],
            ['1d4', 'Item', magicTable.h],
        ]),
        ...new Array(2).fill([
            // 89–90
            ...hoardCoins['11-16'],
            ['3d6', 'Gem', gems['500gp']],
            ['1d4', 'Item', magicTable.h],
        ]),
        ...new Array(2).fill([
            // 91–92
            ...hoardCoins['11-16'],
            ['3d6', 'Gem', gems['1000gp']],
            ['1d4', 'Item', magicTable.h],
        ]),
        ...new Array(2).fill([
            // 93–94
            ...hoardCoins['11-16'],
            ['2d4', 'Art', art['250gp']],
            ['d1', 'Item', magicTable.i],
        ]),
        ...new Array(2).fill([
            // 95–96
            ...hoardCoins['11-16'],
            ['2d4', 'Art', art['750gp']],
            ['d1', 'Item', magicTable.i],
        ]),
        ...new Array(2).fill([
            // 97–98
            ...hoardCoins['11-16'],
            ['3d6', 'Gem', gems['500gp']],
            ['d1', 'Item', magicTable.i],
        ]),
        ...new Array(2).fill([
            // 99–00
            ...hoardCoins['11-16'],
            ['3d6', 'Gem', gems['1000gp']],
            ['d1', 'Item', magicTable.i],
        ]),
    ],
    '17+': [
        ...new Array(2).fill(hoardCoins['17+']), // 01–02
        ...new Array(3).fill([
            // 03–05
            ...hoardCoins['17+'],
            ['3d6', 'Gem', gems['1000gp']],
            ['1d8', 'Item', magicTable.c],
        ]),
        ...new Array(3).fill([
            // 06–08
            ...hoardCoins['17+'],
            ['1d10', 'Art', art['2500gp']],
            ['1d8', 'Item', magicTable.c],
        ]),
        ...new Array(3).fill([
            // 09–11
            ...hoardCoins['17+'],
            ['1d4', 'Art', art['7500gp']],
            ['1d8', 'Item', magicTable.c],
        ]),
        ...new Array(3).fill([
            // 12–14
            ...hoardCoins['17+'],
            ['1d8', 'Gem', gems['5000gp']],
            ['1d8', 'Item', magicTable.c],
        ]),
        ...new Array(8).fill([
            // 15–22
            ...hoardCoins['17+'],
            ['3d6', 'Gem', gems['1000gp']],
            ['1d6', 'Item', magicTable.d],
        ]),
        ...new Array(8).fill([
            // 23–30
            ...hoardCoins['17+'],
            ['1d10', 'Art', art['2500gp']],
            ['1d6', 'Item', magicTable.d],
        ]),
        ...new Array(8).fill([
            // 31–38
            ...hoardCoins['17+'],
            ['1d4', 'Art', art['7500gp']],
            ['1d6', 'Item', magicTable.d],
        ]),
        ...new Array(8).fill([
            // 39–46
            ...hoardCoins['17+'],
            ['1d8', 'Gem', gems['5000gp']],
            ['1d6', 'Item', magicTable.d],
        ]),
        ...new Array(6).fill([
            // 47–52
            ...hoardCoins['17+'],
            ['3d6', 'Gem', gems['1000gp']],
            ['1d6', 'Item', magicTable.e],
        ]),
        ...new Array(6).fill([
            // 53–58
            ...hoardCoins['17+'],
            ['1d10', 'Art', art['2500gp']],
            ['1d6', 'Item', magicTable.e],
        ]),
        ...new Array(5).fill([
            // 59–63
            ...hoardCoins['17+'],
            ['1d4', 'Art', art['7500gp']],
            ['1d6', 'Item', magicTable.e],
        ]),
        ...new Array(5).fill([
            // 64–68
            ...hoardCoins['17+'],
            ['1d8', 'Gem', gems['5000gp']],
            ['1d6', 'Item', magicTable.e],
        ]),
        [
            // 69
            ...hoardCoins['17+'],
            ['3d6', 'Gem', gems['1000gp']],
            ['1d4', 'Item', magicTable.g],
        ],
        [
            // 70
            ...hoardCoins['17+'],
            ['1d10', 'Art', art['2500gp']],
            ['1d4', 'Item', magicTable.g],
        ],
        [
            // 71
            ...hoardCoins['17+'],
            ['1d4', 'Art', art['7500gp']],
            ['1d4', 'Item', magicTable.g],
        ],
        [
            // 72
            ...hoardCoins['17+'],
            ['1d8', 'Gem', gems['5000gp']],
            ['1d4', 'Item', magicTable.g],
        ],
        ...new Array(2).fill([
            // 73–74
            ...hoardCoins['17+'],
            ['3d6', 'Gem', gems['1000gp']],
            ['1d4', 'Item', magicTable.h],
        ]),
        ...new Array(2).fill([
            // 75–76
            ...hoardCoins['17+'],
            ['1d10', 'Art', art['2500gp']],
            ['1d4', 'Item', magicTable.h],
        ]),
        ...new Array(2).fill([
            // 77–78
            ...hoardCoins['17+'],
            ['1d4', 'Art', art['7500gp']],
            ['1d4', 'Item', magicTable.h],
        ]),
        ...new Array(2).fill([
            // 79–80
            ...hoardCoins['17+'],
            ['1d8', 'Gem', gems['5000gp']],
            ['1d4', 'Item', magicTable.h],
        ]),
        ...new Array(5).fill([
            // 81–85
            ...hoardCoins['17+'],
            ['3d6', 'Gem', gems['1000gp']],
            ['1d4', 'Item', magicTable.i],
        ]),
        ...new Array(5).fill([
            // 86–90
            ...hoardCoins['17+'],
            ['1d10', 'Art', art['2500gp']],
            ['1d4', 'Item', magicTable.i],
        ]),
        ...new Array(5).fill([
            // 91–95
            ...hoardCoins['17+'],
            ['1d4', 'Art', art['7500gp']],
            ['1d4', 'Item', magicTable.i],
        ]),
        ...new Array(5).fill([
            // 96–00
            ...hoardCoins['17+'],
            ['1d8', 'Gem', gems['5000gp']],
            ['1d4', 'Item', magicTable.i],
        ]),
    ],
};
