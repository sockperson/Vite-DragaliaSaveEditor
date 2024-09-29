import { WeaponSeries } from '../enum/Enums';
import { WeaponLevelCaps } from '../definitions/Definitions';
import JsonUtils from './JsonUtils';

// Utility class to handle Dragalia Lost objects
// A lot of these functions can be moved to a separate Builder class... todo

const getGetTime = (getTime) => {
    return getTime === null ? Math.floor(Date.now() / 1000) : getTime;
}

const getIsNew = (getTime) => {
    return getTime === null ? 1 : 0;
}

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

const getAbilityNameFormat = (abilityMeta, adventurerMeta) => {
    let name = abilityMeta.Name;
    if (!name.includes("{")) {
        return name;
    }
    const element = adventurerMeta.ElementalType;
    const weapon = adventurerMeta.WeaponType;

    name = name.replace("{element_owner}", element);
    name = name.replace("{weapon_owner}", weapon);
    name = name.replace("{ability_val0}", abilityMeta.Val0);
    name = name.replace("{ability_val1}", abilityMeta.Val1);
    name = name.replace("{ability_val2}", abilityMeta.Val2);
    return name;
}

const getTalisman = (
    talismanList, talismanId, ability1Id, ability2Id, ability3Id,
    additionalHp, additionalAttack, getTime
) => {
    return {
        "talisman_key_id": JsonUtils.getUniqueKeyId(talismanList, "talisman_key_id"),
        "talisman_id": talismanId,
        "is_lock": 0,
        "is_new": 1,
        "talisman_ability_id_1": ability1Id,
        "talisman_ability_id_2": ability2Id,
        "talisman_ability_id_3": ability3Id,
        "additional_hp": additionalHp,
        "additional_attack": additionalAttack,
        "gettime": getTime === null ? Math.floor(Date.now() / 1000) : getTime
    };
}

const getWeaponBonus = (weaponMeta) => {
    if (!weaponMeta.HasWeaponBonus) {
        return 0.0;
    }
    const weaponSeries = weaponMeta.WeaponSeries;
    let bonus = 0.0;
    switch (weaponSeries) {
        case WeaponSeries.CORE:
        case WeaponSeries.VOID:
        case WeaponSeries.CHIMERATECH:
            bonus = 0.5;
            break;
        case WeaponSeries.HIGH_DRAGON:
        case WeaponSeries.AGITO:
        case WeaponSeries.PRIMAL_DRAGON:
            bonus = 1.5;
            break;
        default:
            console.log("Unrecognized weapon series: " + weaponSeries);
            break;
    }
    return bonus;
}

const MEGA_MAN = 10750102;
const storyAdventurerNames = ["The Prince", "Elisanne", "Ranzal", "Cleo", 
    "Luca", "Alex", "Laxi", "Chelle", "Zena"];

const getAdventurerDetails = (adventurerMeta) => {
    const hasManaSpiral = adventurerMeta.ManaSpiralDate !== null;

    let maxSkill1Level = -1;
    let maxSkill2Level = -1;

    if (adventurerMeta.IdLong === MEGA_MAN) {
        maxSkill1Level = 1;
        maxSkill2Level = 1;
    } else {
        maxSkill1Level = hasManaSpiral ? 4 : 3;
        maxSkill2Level = hasManaSpiral ? 3 : 2;
    }

    let maxAbility3Level = 1;
    if (adventurerMeta.Abilities32 != 0) {
        maxAbility3Level = 2;
        if (adventurerMeta.Abilities33 != 0) {
            maxAbility3Level = 3;
        }
    }

    let maxHp = -1;
    let maxStr = -1;
    if (hasManaSpiral) {
        maxHp = JsonUtils.sumFields(adventurerMeta, "AddMaxHp1", "PlusHp0", "PlusHp1", 
            "PlusHp2", "PlusHp3", "PlusHp4", "PlusHp5", "McFullBonusHp5");
        maxStr = JsonUtils.sumFields(adventurerMeta, "AddMaxAtk1", "PlusAtk0", "PlusAtk1", 
            "PlusAtk2", "PlusAtk3", "PlusAtk4", "PlusAtk5", "McFullBonusAtk5");
    } else {
        maxHp = JsonUtils.sumFields(adventurerMeta, "MaxHp", "PlusHp0", "PlusHp1", 
            "PlusHp2", "PlusHp3", "PlusHp4", "McFullBonusHp5");
        maxStr = JsonUtils.sumFields(adventurerMeta, "MaxAtk", "PlusAtk0", "PlusAtk1", 
            "PlusAtk2", "PlusAtk3", "PlusAtk4", "McFullBonusAtk5");
    }

    let minHp = -1;
    let minStr = -1;

    switch (adventurerMeta.Rarity) {
        case 3:
            minHp = adventurerMeta.MinHp3;
            minStr = adventurerMeta.MinAtk3;
            break;
        case 4:
            minHp = adventurerMeta.MinHp4;
            minStr = adventurerMeta.MinAtk4;
            break;
        case 5:
            minHp = adventurerMeta.MinHp5;
            minStr = adventurerMeta.MinAtk5;
            break;
    }

    let minAbility1Level = -1;
    switch (adventurerMeta.ManaCircleName) {
        case "MC_0404":
        case "MC_0502":
        case "MC_0504":
        case "MC_0507":
        case "MC_0511":
        case "MC_0513":
        case "MC_0514":
            minAbility1Level = 1;
            break;
        case "MC_0405":
            minAbility1Level = 2;
            break;
        default:
            minAbility1Level = 0;
            break;
    }

    let minFsLevel = -1;
    switch (adventurerMeta.ManaCircleName) {
        case "MC_0504":
        case "MC_0514":
            minFsLevel = 1;
            break;
        default:
            minFsLevel = 0;
            break;
    }

    const hasSkillShare = adventurerMeta.EditSkillCost !== 0;
    const isStoryAdventurer = storyAdventurerNames.includes(adventurerMeta.Name);
    const hasSkillShareUnlockedByDefault = isStoryAdventurer && hasSkillShare;

    return {
        "maxExp": hasManaSpiral ? 8_866_950 : 1_191_950,
        "maxLevel": hasManaSpiral ? 100 : 80,
        "maxAdditionalMaxLevel": hasManaSpiral ? 20 : 0,
        "maxSkill1Level": maxSkill1Level,
        "maxSkill2Level": maxSkill2Level,
        "maxAbility1Level": hasManaSpiral ? 3 : 2,
        "maxAbility2Level": hasManaSpiral ? 3 : 2,
        "maxAbility3Level": maxAbility3Level,
        "maxHp": maxHp,
        "maxStr": maxStr,
        "maxComboBuildupCount": hasManaSpiral ? 1 : 0,
        "hasSkillShare": hasSkillShare,
        "maxManaCircleCount": hasManaSpiral ? 70 : 50,
        "minAbility1Level": minAbility1Level,
        "minFsLevel": minFsLevel,
        "minHp": minHp,
        "minStr": minStr,
        "hasSkillShareUnlockedByDefault": hasSkillShareUnlockedByDefault,
        "hasManaSpiral": hasManaSpiral
    };
}

const getNewAdventurer = (adventurerMeta) => {
    const adventurerDetails = getAdventurerDetails(adventurerMeta);
    return {
        "chara_id": adventurerMeta.IdLong,
        "rarity": adventurerMeta.Rarity,
        "exp": 0,
        "level": 1,
        "additional_max_level": 0,
        "hp_plus_count": 0,
        "attack_plus_count": 0,
        "limit_break_count": 0,
        "is_new": 1,
        "gettime": getGetTime(null),
        "skill_1_level": 1,
        "skill_2_level": 0,
        "ability_1_level": adventurerDetails.minAbility1Level,
        "ability_2_level": 0,
        "ability_3_level": 0,
        "burst_attack_level": adventurerDetails.minFsLevel,
        "combo_buildup_count": 0,
        "hp": adventurerDetails.minHp,
        "attack": adventurerDetails.minStr,
        "ex_ability_level": 1,
        "ex_ability_2_level": 1,
        "is_temporary": 0,
        "is_unlock_edit_skill": adventurerDetails.hasSkillShareUnlockedByDefault ? 1 : 0,
        "mana_circle_piece_id_list": [],
        "list_view_flag": 1
    }
}

const getMaxedAdventurer = (adventurerMeta, getTime) => {
    const adventurerDetails = getAdventurerDetails(adventurerMeta);
    const hasManaSpiral = adventurerDetails.hasManaSpiral;

    let mcList = [];
    const mcCount = hasManaSpiral ? 70 : 50;
    for (let i = 1; i <= mcCount; i++) {
        mcList.push(i);
    }    

    return {
        "chara_id": adventurerMeta.IdLong,
        "rarity": 5,
        "exp": hasManaSpiral ? 8866950 : 1191950,
        "level": hasManaSpiral ? 100 : 80,
        "additional_max_level": hasManaSpiral ? 20 : 0,
        "hp_plus_count": 100,
        "attack_plus_count": 100,
        "limit_break_count": adventurerMeta.MaxLimitBreakCount,
        "is_new": 1,
        "gettime": getGetTime(getTime),
        "skill_1_level": adventurerDetails.maxSkill1Level,
        "skill_2_level": adventurerDetails.maxSkill2Level,
        "ability_1_level": hasManaSpiral ? 3 : 2,
        "ability_2_level": hasManaSpiral ? 3 : 2,
        "ability_3_level": adventurerDetails.maxAbility3Level,
        "burst_attack_level": 2,
        "combo_buildup_count": hasManaSpiral ? 1 : 0,
        "hp": adventurerDetails.maxHp,
        "attack": adventurerDetails.maxStr,
        "ex_ability_level": 5,
        "ex_ability_2_level": 5,
        "is_temporary": 0,
        "is_unlock_edit_skill": adventurerDetails.hasSkillShare ? 1 : 0,
        "mana_circle_piece_id_list": mcList,
        "list_view_flag": 1
    }
}

const getDragonDetails = (dragonMeta) => {
    let has5Ub = dragonMeta.MaxLimitBreakCount == 5;
    let maxLevel = -1;
    let maxExp = -1;
    let maxUnbindCount = -1;
    
    let maxAbility1Level = has5Ub ? 
        6 : dragonMeta.Abilities15 != 0 ?
        5 : 0;
    let hasA2 = dragonMeta.Abilities21 != 0;
    let maxAbility2Level = 
        hasA2 ?
            has5Ub ? 
            6 : dragonMeta.Abilities25 != 0 ?
            5 : 0
                 : 0

    switch (dragonMeta.Rarity) {
        case 3:
            maxLevel = 60;
            maxExp = 277_320;
            maxUnbindCount = 4;
            break;
        case 4:
            maxLevel = 80;
            maxExp = 625_170;
            maxUnbindCount = 4;
            break;
        case 5:
            if (has5Ub) {
                maxLevel = 120;
                maxExp = 3_365_620;
                maxUnbindCount = 5;
            } else {
                maxLevel = 100;
                maxExp = 1_240_020;
                maxUnbindCount = 4;
            }
            break;
    }

    return {
        "maxLevel": maxLevel,
        "maxUnbindCount": maxUnbindCount,
        "maxExp": maxExp,
        "maxAbility1Level": maxAbility1Level,
        "maxAbility2Level": maxAbility2Level,
        "hasA2": hasA2,
        "has5Ub": has5Ub
    }
}

const removeProperties = (obj, ...properties) => {
    let result = { ...obj };
    properties.forEach(prop => {
        delete result[prop];
    });
    return result;
}

const isAdventurerMaxed = (adventurerObject, adventurerMeta) => {
    const maxedAdventurer = getMaxedAdventurer(adventurerMeta, null);
    const saveObj = removeProperties(adventurerObject, "gettime");
    const compareObj = removeProperties(maxedAdventurer, "gettime");
    const result = JSON.stringify(saveObj) === JSON.stringify(compareObj);
    return result;
}

const getNewDragon = (dragonList, dragonMeta) => {
    const dragonDetails = getDragonDetails(dragonMeta);
    return {
        "dragon_key_id": JsonUtils.getUniqueKeyId(dragonList, "dragon_key_id"),
        "dragon_id": dragonMeta.Id,
        "level": 1,
        "hp_plus_count": 0,
        "attack_plus_count": 0,
        "exp": 0,
        "is_lock": 0,
        "is_new": 1,
        "get_time": getGetTime(null),
        "skill_1_level": 1,
        "ability_1_level": 1,
        "ability_2_level": dragonDetails.hasA2 ? 1 : 0,
        "limit_break_count": 0
    }
}

const getMaxedDragon = (dragonList, dragonMeta, getTime, isLock, keyId) => {
    const dragonDetails = getDragonDetails(dragonMeta);
    const newKeyId = keyId === null ? JsonUtils.getUniqueKeyId(dragonList, "dragon_key_id") : keyId;
    return {
        "dragon_key_id": newKeyId,
        "dragon_id": dragonMeta.Id,
        "level": dragonDetails.maxLevel,
        "hp_plus_count": 50,
        "attack_plus_count": 50,
        "exp": dragonDetails.maxExp,
        "is_lock": isLock ? 1 : 0,
        "is_new": getIsNew(getTime),
        "get_time": getGetTime(getTime),
        "skill_1_level": 2,
        "ability_1_level": dragonDetails.maxAbility1Level,
        "ability_2_level": dragonDetails.maxAbility2Level,
        "limit_break_count": dragonDetails.maxUnbindCount
    }
}

const getMaxedDragonFromExisting = (dragonMeta, dragonObject) => {
    const dragonDetails = getDragonDetails(dragonMeta);
    return {
        "dragon_key_id": dragonObject.dragon_key_id,
        "dragon_id": dragonMeta.Id,
        "level": dragonDetails.maxLevel,
        "hp_plus_count": 50,
        "attack_plus_count": 50,
        "exp": dragonDetails.maxExp,
        "is_lock": dragonObject.is_lock,
        "is_new": getIsNew(dragonObject.get_time),
        "get_time": getGetTime(dragonObject.get_time),
        "skill_1_level": 2,
        "ability_1_level": dragonDetails.maxAbility1Level,
        "ability_2_level": dragonDetails.maxAbility2Level,
        "limit_break_count": dragonDetails.maxUnbindCount
    }
}

const isDragonMaxed = (dragonObject, dragonMeta) => {
    const maxedDragon = getMaxedDragonFromExisting(dragonMeta, dragonObject);
    const saveObj = removeProperties(dragonObject, "get_time", "dragon_key_id", "is_lock", "is_new");
    const compareObj = removeProperties(maxedDragon, "get_time", "dragon_key_id", "is_lock", "is_new");
    const result = JSON.stringify(saveObj) === JSON.stringify(compareObj);
    return result;
}

const isTutorialMaxed = (tutorialStatus, tutorialFlagList) => {
    return tutorialStatus >= 60999 && tutorialFlagList.includes(1030);
}

export default {
    getWeaponDetails,
    getNewWeapon,
    getMaxedWeapon,
    getWeaponLevelCap,
    getWeaponUnbindCap,
    getWyrmprintDetails,
    getNewWyrmprint,
    getMaxedWyrmprint,
    getAbilityNameFormat,
    getTalisman,
    getWeaponBonus,
    getAdventurerDetails,
    getNewAdventurer,
    getMaxedAdventurer,
    isAdventurerMaxed,
    getDragonDetails,
    getNewDragon,
    getMaxedDragon,
    getMaxedDragonFromExisting,
    isDragonMaxed,
    isTutorialMaxed,
    getGetTime
}