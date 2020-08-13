import { random } from '../utils';
import spells from './spells';

const spell = async (lvl) => random((await spells()).filter((s) => s.level === lvl)).spell;

export default {
    a: [
        ...new Array(50).fill('Potion of healing'), // 1-50
        ...new Array(10).fill(async () => `Spell scroll (${await spell(0)})`), // 51-60
        ...new Array(10).fill('Potion of climbing'), // 61-70
        ...new Array(20).fill(async () => `Spell scroll (${await spell(1)})`), // 71-90
        ...new Array(4).fill(async () => `Spell scroll (${await spell(2)})`), // 91-94
        ...new Array(4).fill('Potion of healing (greater)'), // 95-98
        'Bag of holding', // 99
        'Driftglobe', // 100
    ],
    b: [
        ...new Array(15).fill('Potion of healing (greater)'), // 1-15
        ...new Array(7).fill('Potion of fire breath'), // 16–22
        ...new Array(7).fill('Potion of resistance'), // 23–29
        ...new Array(5).fill('Ammunition, +1'), // 30–34
        ...new Array(5).fill('Potion of animal friendship'), // 35–39
        ...new Array(5).fill('Potion of hill giant strength'), // 40–44
        ...new Array(5).fill('Potion of growth'), // 45–49
        ...new Array(5).fill('Potion of water breathing'), // 50–54
        ...new Array(5).fill(async () => `Spell scroll (${await spell(2)})`), // 55–59
        ...new Array(5).fill(async () => `Spell scroll (${await spell(3)})`), // 60–64
        ...new Array(3).fill('Bag of holding'), // 65–67
        ...new Array(3).fill('Keoghtom’s ointment'), // 68–70
        ...new Array(3).fill('Oil of slipperiness'), // 71–73
        ...new Array(2).fill('Dust of disappearance'), // 74–75
        ...new Array(2).fill('Dust of dryness'), // 76–77
        ...new Array(2).fill('Dust of sneezing and choking'), // 78–79
        ...new Array(2).fill('Elemental gem'), // 80–81
        ...new Array(2).fill('Philter of love'), // 82–83
        'Alchemy jug',
        'Cap of water breathing',
        'Cloak of the manta ray',
        'Driftglobe',
        'Goggles of night',
        'Helm of comprehending languages',
        'Immovable rod',
        'Lantern of revealing',
        'Mariner’s armor',
        'Mithral armor',
        'Potion of poison',
        'Ring of swimming',
        'Robe of useful items',
        'Rope of climbing',
        'Saddle of the cavalier',
        'Wand of magic detection',
        'Wand of secrets',
    ],
    c: [
        ...new Array(15).fill('Potion of healing (superior)'), // 1-15
        ...new Array(7).fill(async () => `Spell scroll (${await spell(4)})`), // 16–22
        ...new Array(5).fill('Ammunition, +2'), // 23–27
        ...new Array(5).fill('Potion of clairvoyance'), // 28–32
        ...new Array(5).fill('Potion of diminution'), // 33–37
        ...new Array(5).fill('Potion of gaseous form'), // 38–42
        ...new Array(5).fill('Potion of frost giant strength'), // 43–47
        ...new Array(5).fill('Potion of stone giant strength'), // 48–52
        ...new Array(5).fill('Potion of heroism'), // 53–57
        ...new Array(5).fill('Potion of invulnerability'), // 58–62
        ...new Array(5).fill('Potion of mind reading'), // 63–67
        ...new Array(5).fill(async () => `Spell scroll (${await spell(5)})`), // 68–72
        ...new Array(3).fill('Elixir of health'), // 73–75
        ...new Array(3).fill('Oil of etherealness'), // 76–78
        ...new Array(3).fill('Potion of fire giant strength'), // 79–81
        ...new Array(3).fill('Quaal’s feather token'), // 82–84
        ...new Array(3).fill('Scroll of protection'), // 85–87
        ...new Array(2).fill('Bag of beans'), // 88–89
        ...new Array(2).fill('Bead of force'), // 90–91
        'Chime of opening', // 92
        'Decanter of endless water', // 93
        'Eyes of minute seeing', // 94
        'Folding boat', // 95
        'Heward’s handy haversack', // 96
        'Horseshoes of speed', // 97
        'Necklace of fireballs', // 98
        'Periapt of health', // 99
        'Sending stones', // 100
    ],
    d: [
        ...new Array(20).fill('Potion of healing (supreme)'), // 1-20
        ...new Array(10).fill('Potion of invisibility'), // 21-30
        ...new Array(10).fill('Potion of speed'), // 31–40
        ...new Array(10).fill(async () => `Spell scroll (${await spell(6)})`), // 41–50
        ...new Array(7).fill(async () => `Spell scroll (${await spell(7)})`), // 51–57
        ...new Array(5).fill('Ammunition, +3'), // 58–62
        ...new Array(5).fill('Oil of sharpness'), // 63–67
        ...new Array(5).fill('Potion of flying'), // 68–72
        ...new Array(5).fill('Potion of cloud giant strength'), // 73–77
        ...new Array(5).fill('Potion of longevity'), // 78–82
        ...new Array(5).fill('Potion of vitality'), // 83–87
        ...new Array(5).fill(async () => `Spell scroll (${await spell(8)})`), // 88–92
        ...new Array(3).fill('Horseshoes of a zephyr'), // 93–95
        ...new Array(3).fill('Nolzur’s marvelous pigments'), // 96–98
        'Bag of devouring', // 99
        'Portable hole', // 100
    ],
    e: [
        ...new Array(30).fill(async () => `Spell scroll (${await spell(8)})`), // 1-30
        ...new Array(25).fill('Potion of storm giant strength'), // 31-55
        ...new Array(15).fill('Potion of healing (supreme)'), // 56–70
        ...new Array(15).fill(async () => `Spell scroll (${await spell(9)})`), // 71–85
        ...new Array(8).fill('Universal solvent'), // 86–93
        ...new Array(5).fill('Arrow of slaying'), // 94–98
        ...new Array(2).fill('Sovereign glue'), // 99–100
    ],
    f: [
        ...new Array(15).fill('Weapon, +1'), // 1-15
        ...new Array(3).fill('Shield, +1'), // 16–18
        ...new Array(3).fill('Sentinel shield'), // 19–21
        ...new Array(2).fill('Amulet of proof against detection and location'), // 22–23
        ...new Array(2).fill('Boots of elvenkind'), // 24–25
        ...new Array(2).fill('Boots of striding and springing'), // 26–27
        ...new Array(2).fill('Bracers of archery'), // 28–29
        ...new Array(2).fill('Brooch of shielding'), // 30–31
        ...new Array(2).fill('Broom of flying'), // 32–33
        ...new Array(2).fill('Cloak of elvenkind'), // 34–35
        ...new Array(2).fill('Cloak of protection'), // 36–37
        ...new Array(2).fill('Gauntlets of ogre power'), // 38–39
        ...new Array(2).fill('Hat of disguise'), // 40–41
        ...new Array(2).fill('Javelin of lightning'), // 42–43
        ...new Array(2).fill('Pearl of power'), // 44–45
        ...new Array(2).fill('Rod of the pact keeper, +1'), // 46–47
        ...new Array(2).fill('Slippers of spider climbing'), // 48–49
        ...new Array(2).fill('Staff of the adder'), // 50–51
        ...new Array(2).fill('Staff of the python'), // 52–53
        ...new Array(2).fill('Sword of vengeance'), // 54–55
        ...new Array(2).fill('Trident of fish command'), // 56–57
        ...new Array(2).fill('Wand of magic missiles'), // 58–59
        ...new Array(2).fill('Wand of the war mage, +1'), // 60–61
        ...new Array(2).fill('Wand of web'), // 62–63
        ...new Array(2).fill('Weapon of warning'), // 64–65
        'Adamantine armor (chain mail)', // 66
        'Adamantine armor (chain shirt)', // 67
        'Adamantine armor (scale mail)', // 68
        'Bag of tricks (gray)', // 69
        'Bag of tricks (rust)', // 70
        'Bag of tricks (tan)', // 71
        'Boots of the winterlands', // 72
        'Circlet of blasting', // 73
        'Deck of illusions', // 74
        'Eversmoking bottle', // 75
        'Eyes of charming', // 76
        'Eyes of the eagle', // 77
        'Figurine of wondrous power (silver raven)', // 78
        'Gem of brightness', // 79
        'Gloves of missile snaring', // 80
        'Gloves of swimming and climbing', // 81
        'Gloves of thievery', // 82
        'Headband of intellect', // 83
        'Helm of telepathy', // 84
        'Instrument of the bards (Doss lute)', // 85
        'Instrument of the bards (Fochlucan bandore)', // 86
        'Instrument of the bards (Mac-Fuimidh cittern)', // 87
        'Medallion of thoughts', // 88
        'Necklace of adaptation', // 89
        'Periapt of wound closure', // 90
        'Pipes of haunting', // 91
        'Pipes of the sewers', // 92
        'Ring of jumping', // 93
        'Ring of mind shielding', // 94
        'Ring of warmth', // 95
        'Ring of water walking', // 96
        'Quiver of Ehlonna', // 97
        'Stone of good luck (luckstone)', // 98
        'Wind fan', // 99
        'Winged boots', // 100
    ],
    g: [
        ...new Array(11).fill('Weapon, +2'), // 01–11
        ...new Array(3).fill(() =>
            random([
                // 12–14
                'Figurine of wondrous power (Bronze griffon)',
                'Figurine of wondrous power (Ebony fly)',
                'Figurine of wondrous power (Golden lion)',
                'Figurine of wondrous power (Ivory goat)',
                'Figurine of wondrous power (Marble elephant)',
                'Figurine of wondrous power (Onyx dog)',
                'Figurine of wondrous power (Onyx dog)',
                'Figurine of wondrous power (Serpentine owl)',
            ]),
        ),
        'Adamantine armor (breastplate)', // 15
        'Adamantine armor (splint)', // 16
        'Amulet of health', // 17
        'Armor of vulnerability', // 18
        'Arrow-catching shield', // 19
        'Belt of dwarvenkind', // 20
        'Belt of hill giant strength', // 21
        'Berserker axe', // 22
        'Boots of levitation', // 23
        'Boots of speed', // 24
        'Bowl of commanding water elementals', // 25
        'Bracers of defense', // 26
        'Brazier of commanding fire elementals', // 27
        'Cape of the mountebank', // 28
        'Censer of controlling air elementals', // 29
        'Armor, +1 chain mail', // 30
        'Armor of resistance (chain mail)', // 31
        'Armor, +1 chain shirt', // 32
        'Armor of resistance (chain shirt)', // 33
        'Cloak of displacement', // 34
        'Cloak of the bat', // 35
        'Cube of force', // 36
        'Daern’s instant fortress', // 37
        'Dagger of venom', // 38
        'Dimensional shackles', // 39
        'Dragon slayer', // 40
        'Elven chain', // 41
        'Flame tongue', // 42
        'Gem of seeing', // 43
        'Giant slayer', // 44
        'Glamoured studded leather', // 45
        'Helm of teleportation', // 46
        'Horn of blasting', // 47
        'Horn of Valhalla (silver or brass)', // 48
        'Instrument of the bards (Canaith mandolin)', // 49
        'Instrument of the bards (Cli lyre)', // 50
        'Ioun stone (awareness)', // 51
        'Ioun stone (protection)', // 52
        'Ioun stone (reserve)', // 53
        'Ioun stone (sustenance)', // 54
        'Iron bands of Bilarro', // 55
        'Armor, +1 leather', // 56
        'Armor of resistance (leather)', // 57
        'Mace of disruption', // 58
        'Mace of smiting', // 59
        'Mace of terror', // 60
        'Mantle of spell resistance', // 61
        'Necklace of prayer beads', // 62
        'Periapt of proof against poison', // 63
        'Ring of animal influence', // 64
        'Ring of evasion', // 65
        'Ring of feather falling', // 66
        'Ring of free action', // 67
        'Ring of protection', // 68
        'Ring of resistance', // 69
        'Ring of spell storing', // 70
        'Ring of the ram', // 71
        'Ring of X-ray vision', // 72
        'Robe of eyes', // 73
        'Rod of rulership', // 74
        'Rod of the pact keeper, +2', // 75
        'Rope of entanglement', // 76
        'Armor, +1 scale mail', // 77
        'Armor of resistance (scale mail)', // 78
        'Shield, +2', // 79
        'Shield of missile attraction', // 80
        'Staff of charming', // 81
        'Staff of healing', // 82
        'Staff of swarming insects', // 83
        'Staff of the woodlands', // 84
        'Staff of withering', // 85
        'Stone of controlling earth elementals', // 86
        'Sun blade', // 87
        'Sword of life stealing', // 88
        'Sword of wounding', // 89
        'Tentacle rod', // 90
        'Vicious weapon', // 91
        'Wand of binding', // 92
        'Wand of enemy detection', // 93
        'Wand of fear', // 94
        'Wand of fireballs', // 95
        'Wand of lightning bolts', // 96
        'Wand of paralysis', // 97
        'Wand of the war mage, +2', // 98
        'Wand of wonder', // 99
        'Wings of flying', // 100
    ],
    h: [
        ...new Array(10).fill('Weapon, +3'), // 1–10
        ...new Array(2).fill('Amulet of the planes'), // 11–12
        ...new Array(2).fill('Carpet of flying'), // 13–14
        ...new Array(2).fill('Crystal ball (very rare version)'), // 15–16
        ...new Array(2).fill('Ring of regeneration'), // 17–18
        ...new Array(2).fill('Ring of shooting stars'), // 19–20
        ...new Array(2).fill('Ring of telekinesis'), // 21–22
        ...new Array(2).fill('Robe of scintillating colors'), // 23–24
        ...new Array(2).fill('Robe of stars'), // 25–26
        ...new Array(2).fill('Rod of absorption'), // 27–28
        ...new Array(2).fill('Rod of alertness'), // 29–30
        ...new Array(2).fill('Rod of security'), // 31–32
        ...new Array(2).fill('Rod of the pact keeper, +3'), // 33–34
        ...new Array(2).fill('Scimitar of speed'), // 35–36
        ...new Array(2).fill('Shield, +3'), // 37–38
        ...new Array(2).fill('Staff of fire'), // 39–40
        ...new Array(2).fill('Staff of frost'), // 41–42
        ...new Array(2).fill('Staff of power'), // 43–44
        ...new Array(2).fill('Staff of striking'), // 45–46
        ...new Array(2).fill('Staff of thunder and lightning'), // 47–48
        ...new Array(2).fill('Sword of sharpness'), // 49–50
        ...new Array(2).fill('Wand of polymorph'), // 51–52
        ...new Array(2).fill('Wand of the war mage, +3'), // 53–54
        'Adamantine armor (half plate)', // 55
        'Adamantine armor (plate)', // 56
        'Animated shield', // 57
        'Belt of fire giant strength', // 58
        'Belt of frost giant strength (or stone)', // 59
        'Armor, +1 breastplate', // 60
        'Armor of resistance (breastplate)', // 61
        'Candle of invocation', // 62
        'Armor, +2 chain mail', // 63
        'Armor, +2 chain shirt', // 64
        'Cloak of arachnida', // 65
        'Dancing sword', // 66
        'Demon armor', // 67
        'Dragon scale mail', // 68
        'Dwarven plate', // 69
        'Dwarven thrower', // 70
        'Efreeti bottle', // 71
        'Figurine of wondrous power (obsidian steed)', // 72
        'Frost brand', // 73
        'Helm of brilliance', // 74
        'Horn of Valhalla (bronze)', // 75
        'Instrument of the bards (Anstruth harp)', // 76
        'Ioun stone (absorption)', // 77
        'Ioun stone (agility)', // 78
        'Ioun stone (fortitude)', // 79
        'Ioun stone (insight)', // 80
        'Ioun stone (intellect)', // 81
        'Ioun stone (leadership)', // 82
        'Ioun stone (strength)', // 83
        'Armor, +2 leather', // 84
        'Manual of bodily health', // 85
        'Manual of gainful exercise', // 86
        'Manual of golems', // 87
        'Manual of quickness of action', // 88
        'Mirror of life trapping', // 89
        'Nine lives stealer', // 90
        'Oathbow', // 91
        'Armor, +2 scale mail', // 92
        'Spellguard shield', // 93
        'Armor, +1 splint', // 94
        'Armor of resistance (splint)', // 95
        'Armor, +1 studded leather', // 96
        'Armor of resistance (studded leather)', // 97
        'Tome of clear thought', // 98
        'Tome of leadership and influence', // 99
        'Tome of understanding', // 100
    ],
    i: [
        ...new Array(5).fill('Defender'), // 1-5
        ...new Array(5).fill('Hammer of thunderbolts'), // 6–10
        ...new Array(5).fill('Luck blade'), // 11–15
        ...new Array(5).fill('Sword of answering'), // 16–20
        ...new Array(3).fill('Holy avenger'), // 21–23
        ...new Array(3).fill('Ring of djinni summoning'), // 24–26
        ...new Array(3).fill('Ring of invisibility'), // 27–29
        ...new Array(3).fill('Ring of spell turning'), // 30–32
        ...new Array(3).fill('Rod of lordly might'), // 33–35
        ...new Array(3).fill('Staff of the magi'), // 36–38
        ...new Array(3).fill('Vorpal sword'), // 39–41
        ...new Array(2).fill('Belt of cloud giant strength'), // 42–43
        ...new Array(2).fill('Armor, +2 breastplate'), // 44–45
        ...new Array(2).fill('Armor, +2 chain mail'), // 46–47
        ...new Array(2).fill('Armor, +2 chain shirt'), // 48–49
        ...new Array(2).fill('Cloak of invisibility'), // 50–51
        ...new Array(2).fill('Crystal ball (legendary version)'), // 52–53
        ...new Array(2).fill('Armor, +1 half plate'), // 54–55
        ...new Array(2).fill('Iron flask'), // 56–57
        ...new Array(2).fill('Armor, +3 leather'), // 58–59
        ...new Array(2).fill('Armor, +1 plate'), // 60–61
        ...new Array(2).fill('Robe of the archmagi'), // 62–63
        ...new Array(2).fill('Rod of resurrection'), // 64–65
        ...new Array(2).fill('Armor, +1 scale mail'), // 66–67
        ...new Array(2).fill('Scarab of protection'), // 68–69
        ...new Array(2).fill('Armor, +2 splint'), // 70–71
        ...new Array(2).fill('Armor, +2 studded leather'), // 72–73
        ...new Array(2).fill('Well of many worlds'), // 74–75
        (): string =>
            random([
                // 76
                'Armor, +2 half plate',
                'Armor, +2 half plate',
                'Armor, +2 plate',
                'Armor, +2 plate',
                'Armor, +3 studded leather',
                'Armor, +3 studded leather',
                'Armor, +3 breastplate',
                'Armor, +3 breastplate',
                'Armor, +3 splint',
                'Armor, +3 splint',
                'Armor, +3 half plate',
                'Armor, +3 plate',
            ]),
        'Apparatus of Kwalish', // 77
        'Armor of invulnerability', // 78
        'Belt of storm giant strength', // 79
        'Cubic gate', // 80
        'Deck of many things', // 81
        'Efreeti chain', // 82
        'Armor of resistance (half plate)', // 83
        'Horn of Valhalla (iron)', // 84
        'Instrument of the bards (Ollamh harp)', // 85
        'Ioun stone (greater absorption)', // 86
        'Ioun stone (mastery)', // 87
        'Ioun stone (regeneration)', // 88
        'Plate armor of etherealness', // 89
        'Armor of resistance (plate)', // 90
        'Ring of air elemental command', // 91
        'Ring of earth elemental command', // 92
        'Ring of fire elemental command', // 93
        'Ring of three wishes', // 94
        'Ring of water elemental command', // 95
        'Sphere of annihilation', // 96
        'Talisman of pure good', // 97
        'Talisman of the sphere', // 98
        'Talisman of ultimate evil', // 99
        'Tome of the stilled tongue', // 100
    ],
};
