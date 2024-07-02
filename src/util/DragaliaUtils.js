import { WeaponSeries } from '../enum/Enums';
import { WeaponLevelCaps } from '../definitions/Definitions';

const getWeaponDetails = (weaponMeta) => {
    let maxUnbindCount = -1;
    let maxLevel = -1;
    let maxRefineCount = -1;
    let maxBonusFiveStarSlotCount = -1;
    let maxBonusSindomSlotCount = -1;
    let maxCopies = -1;
    
    const isNullElement = weaponMeta.ElementalTypeId === 99;
    const isMegaManWeapon = isNullElement && weaponMeta.Name.includes("Mega"); // weirdge
    const isLuckyHanetsukiPaddle = weaponMeta.Id === 30159904;
    const isSoldiersBrand = weaponMeta.Id === 30129901;
    // all weapons have weapon bonus besides "Other" weapons and non-elemental Core weapons
    const canHaveWeaponBonus = weaponMeta.WeaponSeries !== WeaponSeries.OTHER && !isNullElement;

    switch (weaponMeta.WeaponSeries) {
        case WeaponSeries.CORE:
            switch (weaponMeta.Rarity) {
                case 3:
                    maxLevel = 20;
                    break;
                case 4:
                    maxLevel = 30;
                    break;
                case 5:
                    maxLevel = 50;
                    break;
            }
            maxUnbindCount = 4;
            maxRefineCount = 0;
            maxBonusFiveStarSlotCount = isNullElement ? 0 : 1;
            maxBonusSindomSlotCount = 0;
            maxCopies = 4;
            break;
        case WeaponSeries.VOID:
        case WeaponSeries.CHIMERATECH:
        case WeaponSeries.HIGH_DRAGON:
            maxLevel = 70;
            maxUnbindCount = 8;
            maxRefineCount = 1;
            maxBonusFiveStarSlotCount = 1;
            maxBonusSindomSlotCount = 0;
            maxCopies = 4;
            break;
        case WeaponSeries.AGITO:
            maxLevel = 90;
            maxUnbindCount = 9;
            maxRefineCount = 2;
            maxBonusFiveStarSlotCount = 1;
            maxBonusSindomSlotCount = 2;
            maxCopies = 4;
            break;
        case WeaponSeries.PRIMAL_DRAGON:
            maxLevel = 80;
            maxUnbindCount = 8;
            maxRefineCount = 1;
            maxBonusFiveStarSlotCount = 1;
            maxBonusSindomSlotCount = 2;
            maxCopies = 4;
            break;
        case WeaponSeries.OTHER:
            if (isMegaManWeapon) {
                maxLevel = 80;
                maxUnbindCount = 4;
                maxRefineCount = 0;
                maxBonusFiveStarSlotCount = 0;
                maxBonusSindomSlotCount = 0;
                maxCopies = 1;
            }
            else if (isLuckyHanetsukiPaddle) {
                maxLevel = 50;
                maxUnbindCount = 4;
                maxRefineCount = 0;
                maxBonusFiveStarSlotCount = 0;
                maxBonusSindomSlotCount = 0;
                maxCopies = 1;
            }
            else if (isSoldiersBrand) {
                maxLevel = 10;
                maxUnbindCount = 4;
                maxRefineCount = 0;
                maxBonusFiveStarSlotCount = 0;
                maxBonusSindomSlotCount = 0;
                maxCopies = 4;
            }
            break;
    }

    return {
        "name": weaponMeta.Name,
        "id": weaponMeta.Id,
        "rarity": weaponMeta.Rarity,
        "maxLevel": maxLevel,
        "maxUnbindCount": maxUnbindCount,
        "maxRefineCount": maxRefineCount,
        "maxCopies": maxCopies,
        "maxBonusFiveStarSlotCount": maxBonusFiveStarSlotCount,
        "maxBonusSindomSlotCount": maxBonusSindomSlotCount,
        "canHaveWeaponBonus": canHaveWeaponBonus,
        "passiveAbilities": weaponMeta.PassiveAbilities
    };
}

const getNewWeapon = (weaponId) => {
    return {
        "weapon_body_id": weaponId,
        "buildup_count": 0,
        "limit_break_count": 0,
        "limit_over_count": 0,
        "equipable_count": 1,
        "additional_crest_slot_type_1_count": 0,
        "additional_crest_slot_type_2_count": 0,
        "additional_crest_slot_type_3_count": 0,
        "additional_effect_count": 0,
        "unlock_weapon_passive_ability_no_list": [],
        "fort_passive_chara_weapon_buildup_count": 0,
        "is_new": 1,
        "gettime": Math.floor(Date.now() / 1000)
    };
}

const getMaxedWeapon = (weaponId, weaponDetails, getTime) => {
    return {
        "weapon_body_id": weaponId,
        "buildup_count": weaponDetails.maxLevel,
        "limit_break_count": weaponDetails.maxUnbindCount,
        "limit_over_count": weaponDetails.maxRefineCount,
        "equipable_count": weaponDetails.maxCopies,
        "additional_crest_slot_type_1_count": weaponDetails.maxBonusFiveStarSlotCount,
        "additional_crest_slot_type_2_count": 0,
        "additional_crest_slot_type_3_count": weaponDetails.maxBonusSindomSlotCount,
        "additional_effect_count": 0,
        "unlock_weapon_passive_ability_no_list": weaponDetails.passiveAbilities,
        "fort_passive_chara_weapon_buildup_count": weaponDetails.canHaveWeaponBonus ? 1 : 0,
        "is_new": 1,
        "gettime": getTime === null ? Math.floor(Date.now() / 1000) : getTime
    };
}

const getWeaponLevelCap = (weaponMeta, unbindCount) => {
    const rarity = weaponMeta.Rarity;
    return WeaponLevelCaps[rarity][unbindCount];
}

const getWeaponUnbindCap = (refineCount) => {
    switch (refineCount) {
        case 0:
            return 4;
        case 1:
            return 8;
        case 2:
            return 9;
        default:
            return -1;
    }
}

const getWyrmprintDetails = (wyrmprintMeta) => {
    let maxLevel = -1;
    let maxAugmentCount = -1;
    
    switch (wyrmprintMeta.Rarity) {
        case 2:
            maxLevel = 10;
            maxAugmentCount = 50;
            break;
        case 3:
            maxLevel = 20;
            maxAugmentCount = 50;
            break;
        case 4:
            maxLevel = 40;
            maxAugmentCount = 50;
            break;
        case 5:
            maxLevel = 50;
            maxAugmentCount = 50;
            break;
        case 9:
            maxLevel = 30;
            maxAugmentCount = 40;
            break;
    }

    return {
        "maxLevel": maxLevel,
        "maxAugmentCount": maxAugmentCount
    }
}

const getNewWyrmprint = (wyrmprintId) => {
    return {
        "ability_crest_id": wyrmprintId,
        "buildup_count": 0,
        "limit_break_count": 0,
        "equipable_count": 1,
        "hp_plus_count": 0,
        "attack_plus_count": 0,
        "is_new": 1,
        "is_favorite": 0,
        "gettime": Math.floor(Date.now() / 1000)
    };
}

const getMaxedWyrmprint = (wyrmprintId, wyrmprintDetails, getTime, isFavorite) => {
    return {
        "ability_crest_id": wyrmprintId,
        "buildup_count": wyrmprintDetails.maxLevel,
        "limit_break_count": 4,
        "equipable_count": 4,
        "hp_plus_count": wyrmprintDetails.maxAugmentCount,
        "attack_plus_count": wyrmprintDetails.maxAugmentCount,
        "is_new": 1,
        "is_favorite": isFavorite,
        "gettime": getTime === null ? Math.floor(Date.now() / 1000) : getTime
    };
}

export default {
    getWeaponDetails,
    getNewWeapon,
    getMaxedWeapon,
    getWeaponLevelCap,
    getWeaponUnbindCap,
    getWyrmprintDetails,
    getNewWyrmprint,
    getMaxedWyrmprint
}