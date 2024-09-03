import {MaterialCategory, MaterialCategoryGroup} from '../enum/Enums.js';

export const MaterialCategoryMap = Object.freeze({
    [MaterialCategory.NO_CATEGORY]: MaterialCategoryGroup.NO_CATEGORY_GROUP,
    [MaterialCategory.BATTLE_ROYALE]: MaterialCategoryGroup.BATTLE_ROYALE,
    [MaterialCategory.FACILLITY]: MaterialCategoryGroup.EVENTS,
    [MaterialCategory.DEFENSIVE_COLLAB]: MaterialCategoryGroup.EVENTS,
    [MaterialCategory.ONSLAUGHT_DEFENSIVE]: MaterialCategoryGroup.EVENTS,
    [MaterialCategory.RAID_COLLAB]: MaterialCategoryGroup.EVENTS,
    [MaterialCategory.RAID]: MaterialCategoryGroup.EVENTS,
    [MaterialCategory.STORY]: MaterialCategoryGroup.EVENTS,
    [MaterialCategory.COLLAB]: MaterialCategoryGroup.EVENTS,
    [MaterialCategory.XP_CRYSTAL]: MaterialCategoryGroup.UPGRADE,
    [MaterialCategory.DRAGONFRUIT]: MaterialCategoryGroup.UPGRADE,
    [MaterialCategory.WHETSTONE]: MaterialCategoryGroup.UPGRADE,
    [MaterialCategory.ELEMENTAL_ORB]: MaterialCategoryGroup.UPGRADE,
    [MaterialCategory.DRAGON_STONE]: MaterialCategoryGroup.UPGRADE,
    [MaterialCategory.WEAPON_INGOT]: MaterialCategoryGroup.UPGRADE,
    [MaterialCategory.WYRMPRINT_WATER]: MaterialCategoryGroup.UPGRADE,
    [MaterialCategory.WYRMPRINT_KEY]: MaterialCategoryGroup.UPGRADE,
    [MaterialCategory.ADVENTURER_STR_AUGMENT]: MaterialCategoryGroup.UPGRADE,
    [MaterialCategory.ADVENTURER_HP_AUGMENT]: MaterialCategoryGroup.UPGRADE,
    [MaterialCategory.DRAGON_STR_AUGMENT]: MaterialCategoryGroup.UPGRADE,
    [MaterialCategory.DRAGON_HP_AUGMENT]: MaterialCategoryGroup.UPGRADE,
    [MaterialCategory.WEAPON_HP_AUGMENT]: MaterialCategoryGroup.UPGRADE,
    [MaterialCategory.WEAPON_STR_AUGMENT]: MaterialCategoryGroup.UPGRADE,
    [MaterialCategory.WYRMPRINT_HP_AUGMENT]: MaterialCategoryGroup.UPGRADE,
    [MaterialCategory.WYRMPRINT_STR_AUGMENT]: MaterialCategoryGroup.UPGRADE,
    [MaterialCategory.WYRMSIGIL_REMNANT]: MaterialCategoryGroup.NO_CATEGORY_GROUP,
    [MaterialCategory.OMNICITE]: MaterialCategoryGroup.UPGRADE,
    [MaterialCategory.CRAFTING]: MaterialCategoryGroup.CRAFTING,
    [MaterialCategory.ESSENCE]: MaterialCategoryGroup.ESSENCE,
    [MaterialCategory.MANA_SPIRAL]: MaterialCategoryGroup.MANA_SPIRAL
});

// https://dragalialost.wiki/w/Weapon_Crafting
export const WeaponLevelCaps = Object.freeze({
    2: [6, 7, 8, 9, 10],
    3: [12, 14, 16, 18, 20],
    4: [18, 21, 24, 27, 30],
    5: [30, 35, 40, 45, 50, 55, 60, 65, 70],
    6: [40, 45, 50, 55, 60, 65, 70, 75, 80, 90]
});

export const DragonSellAmounts = Object.freeze({
    3: 150,
    4: 2200,
    5: 8500
});