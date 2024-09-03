export const EditorState = Object.freeze({
    DEFAULT: 0,           
    VALID_JSON_IMPORTED: 1,
    INVALID_FILE_IMPORTED: 2,
    SAVE_READ: 3       
});

export const ExportStatus = Object.freeze({
    DEFAULT: 0,
    EXPORT_IN_PROGRESS: 1,
    EXPORT_SUCCESS: 2,
    EXPORT_FAIL: 3
});

export const QuestWallId = Object.freeze({
    FLAME: 216010001,             
    WATER: 216010002,
    WIND: 216010003,
    LIGHT: 216010004,
    SHADOW: 216010005
});

export const WeaponTypeId = Object.freeze({
    SWORD: 1,
    BLADE: 2,
    DAGGER: 3,
    AXE: 4,
    LANCE: 5,
    BOW: 6,
    WAND: 7,
    STAFF: 8,
    MANACASTER: 9
});

export const ElementTypeId = Object.freeze({
    FLAME: 1,
    WATER: 2,
    WIND: 3,
    LIGHT: 4,
    SHADOW: 5
})

export const WeaponSeries = Object.freeze({
    CORE: "Core",
    VOID: "Void",
    CHIMERATECH: "Chimeratech",
    HIGH_DRAGON: "High Dragon",
    AGITO: "Agito",
    PRIMAL_DRAGON: "Primal Dragon",
    OTHER: "Other"
});

// mostly as exported from wiki
export const MaterialCategory = Object.freeze({
    NO_CATEGORY: 0,
    BATTLE_ROYALE: "Battle Royale",
    FACILLITY: "Facility",
    DEFENSIVE_COLLAB: "Defensive, Collab",
    ONSLAUGHT_DEFENSIVE: "Onslaught, Defensive",
    RAID_COLLAB: "Raid, Collab",
    RAID: "Raid",
    STORY: "Story",
    COLLAB: "Collab",
    XP_CRYSTAL: 101,
    DRAGONFRUIT: 102,
    WHETSTONE: 103,
    ELEMENTAL_ORB: 104,
    DRAGON_STONE: 111,
    WEAPON_INGOT: 112,
    WYRMPRINT_WATER: 113,
    WYRMPRINT_KEY: 114,
    ADVENTURER_STR_AUGMENT: 116,
    ADVENTURER_HP_AUGMENT: 117,
    DRAGON_STR_AUGMENT: 118,
    DRAGON_HP_AUGMENT: 119,
    WEAPON_HP_AUGMENT: 120,
    WEAPON_STR_AUGMENT: 121,
    WYRMPRINT_HP_AUGMENT: 122,
    WYRMPRINT_STR_AUGMENT: 123,
    WYRMSIGIL_REMNANT: 124,
    OMNICITE: 125,
    CRAFTING: 201,
    ESSENCE: 206,
    MANA_SPIRAL: "Mana Spiral"
});

export const MaterialCategoryGroup = Object.freeze({
    NO_CATEGORY_GROUP: 0,
    BATTLE_ROYALE: 1,
    EVENTS: 2,
    UPGRADE: 3,
    CRAFTING: 4,
    ESSENCE: 5,
    MANA_SPIRAL: 6
});

export const WyrmprintAvailability = Object.freeze({
    PERMANENT: "Permanent",
    DOMINION: "Dominion",
    LIMITED: "Limited",
    EVENT_WELFARE: "Event Welfare",
    TREASURE_TRADE: "Treasure Trade",
    COMPENDIUM: "Compendium",
    COLLAB: "Collab",
    PROMO: "Promo"
});

export const WyrmprintSearchType = Object.freeze({
    NAME: 0,
    CHARACTER: 1,
    ICON: 2
});

export const StatType = Object.freeze({
    STRENGTH: 0,
    HP: 1
});

export const weaponTypeIdToString = (weaponTypeId) => {
    switch (weaponTypeId) {
        case WeaponTypeId.SWORD:
            return "Sword";
        case WeaponTypeId.BLADE:
            return "Blade";
        case WeaponTypeId.DAGGER:
            return "Dagger";
        case WeaponTypeId.AXE:
            return "Axe";
        case WeaponTypeId.LANCE:
            return "Lance";
        case WeaponTypeId.BOW:
            return "Bow";
        case WeaponTypeId.WAND:
            return "Wand";
        case WeaponTypeId.STAFF:
            return "Staff";
        case WeaponTypeId.MANACASTER:
            return "Manacaster";
        default:
            return "Unknown";
    }
};

export const elementTypeIdToString = (elementTypeId) => {
    switch (elementTypeId) {
        case 1:
            return "Flame";
        case 2:
            return "Water";
        case 3:
            return "Wind";
        case 4:
            return "Light";
        case 5:
            return "Shadow";
        default:
            return "Unknown";
    }
}