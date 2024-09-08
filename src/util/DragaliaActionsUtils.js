import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { MappingContext } from '../components/SaveEditor';
import { addJsonDataListObject, replaceJsonDataListObject, addToObjectListObjectField

 } from '../actions/JsonDataActions';

import { WeaponBuildupPieceType } from '../enum/Enums';

import JsonUtils from './JsonUtils';
import DragaliaUtils from './DragaliaUtils';

// Utility class to handle Redux actions for more complex savedata operations

const useDragaliaActions = () => {
    const dispatch = useDispatch();
    const maps = useContext(MappingContext);
    const unitStoryList = useSelector(state => state.jsonData.data.unit_story_list);
    const albumDragonList = useSelector(state => state.jsonData.data.album_dragon_list);
    const charaList = useSelector(state => state.jsonData.data.chara_list);
    const dragonList = useSelector(state => state.jsonData.data.dragon_list);
    const dragonReliabilityList = useSelector(state => state.jsonData.data.dragon_reliability_list);
    const weaponSkinList = useSelector(state => state.jsonData.data.weapon_skin_list);

    const ARSENE = 20050522;

    function zeroPad(number, digits) {
        return String(number).padStart(digits, '0');
    }

    const addAdventurerStory = (adventurerId, onlyAddFirst) => {

        const MEGA_MAN = 10750102;
        const PRINCE = 10140101;

        if (adventurerId === MEGA_MAN || adventurerId === PRINCE) {
            return;
        }

        const count = onlyAddFirst ? 1 : 5;
        const stories = maps.charaStoryMap[adventurerId];
        if (stories === undefined) {
            console.error(`No stories found for adventurer ID: ${adventurerId}`);
            return;
        }
        const storyIds = JsonUtils.getSetFromList(unitStoryList, "unit_story_id");
        for (let i = 0; i < count; i++) {
            const storyId = stories[i];
            if (storyId === undefined) {
                console.error(`No story found for adventurer ID: ${adventurerId} at index: ${i}`);
                return;
            }
            if (storyIds.has(storyId)) {
                continue;
            }
            const story = {
                "unit_story_id": storyId,
                "is_read": 0
            };
            dispatch(addJsonDataListObject("unit_story_list", story));
        }
    };

    const addDragonStory = (dragonMeta, id) => {
        const storyId = +`${dragonMeta.BaseId}01${id}`
        if (JsonUtils.listHasValue(unitStoryList, "unit_story_id", storyId)) {
            return;
        }
        const story = {
            "unit_story_id": storyId,
            "is_read": 0
        };
        dispatch(addJsonDataListObject("unit_story_list", story));
    }

    // given a dragon object to be maxed, update encyclopedia bonus and entry
    const handleDragonEncyclopedia = (dragonObject) => {
        const id = dragonObject.dragon_id;
        const albumDragonListObject = albumDragonList.find(obj => obj.dragon_id === id);
        if (albumDragonListObject === undefined) {
            console.error(`No album dragon list object found for dragon ID: ${id}`);
            return;
        }
        const dragonMeta = maps.dragonMap[id];
        const dragonDetails = DragaliaUtils.getDragonDetails(dragonMeta);

        const maxLevel = albumDragonListObject.max_level;
        const maxUnbinds = albumDragonListObject.max_limit_break_count;
        const has5Ub = dragonDetails.has5Ub;
        const toUpdateBonuses = maxUnbinds < (has5Ub ? 5 : 4);
        const toUpdateEncyclo = toUpdateBonuses || maxLevel < dragonDetails.maxLevel;
        
        if (toUpdateEncyclo) {
            console.log("Updating encyclopedia entry for dragon: " + dragonMeta.FullName);
            const updatedEntry = {
                "dragon_id": id,
                "max_level": dragonDetails.maxLevel,
                "max_limit_break_count": has5Ub ? 5 : 4
            }
            if (toUpdateBonuses) {
                console.log("Updating encyclopedia bonuses for dragon: " + dragonMeta.FullName);
                const unbinds = dragonObject.limit_break_count;
                let hpBonus = 0.0;
                if (has5Ub) {
                    if (unbinds < 4) {
                        hpBonus = 0.2;
                    } else if (unbinds < 5) {
                        hpBonus = 0.1;
                    }
                } else {
                    if (unbinds < 4) {
                        hpBonus = 0.1;
                    }
                }
                dispatch(addToObjectListObjectField(
                    "fort_bonus_list", "dragon_bonus_by_album", "elemental_type", 
                    dragonMeta.ElementalTypeId, "hp", hpBonus));
            }
            dispatch(replaceJsonDataListObject("album_dragon_list", "dragon_id", updatedEntry));
        }
    }

    // add a maxed adventurer
    // if adventurer is owned, then max it out
    // also handle stories and encyclopedia bonuses
    const maxAdventurer = (adventurerId, adventurerObject) => {
        const isOwned = adventurerObject ? true : false;
        const adventurerMeta = maps.adventurerMap[adventurerId];
        if (adventurerMeta === undefined) {
            console.error(`No adventurer found for ID: ${adventurerId}`);
            return;
        }

        if (!isOwned) {
            const newAdventurerObject = DragaliaUtils.getMaxedAdventurer(adventurerMeta, null);
            const hasManaspiral = DragaliaUtils.getAdventurerDetails(adventurerMeta).hasManaSpiral;
            const bonus = hasManaspiral ? 0.3 : 0.2;
            dispatch(addJsonDataListObject("chara_list", newAdventurerObject));
            dispatch(addToObjectListObjectField(
              "fort_bonus_list", "chara_bonus_by_album", "elemental_type", 
              adventurerMeta.ElementalTypeId, "hp", bonus));
            dispatch(addToObjectListObjectField(
              "fort_bonus_list", "chara_bonus_by_album", "elemental_type", 
              adventurerMeta.ElementalTypeId, "attack", bonus));
          } else {
            const newAdventurerObject = DragaliaUtils.getMaxedAdventurer(adventurerMeta, adventurerObject.gettime);
            dispatch(replaceJsonDataListObject("chara_list", "chara_id", newAdventurerObject));
            // handle stat bonus
            const mc = adventurerObject.mana_circle_piece_id_list.length;
            const level = adventurerObject.level;
            let hpBonus = 0.0;
            let strBonus = 0.0;
            const hasManaspiral = DragaliaUtils.getAdventurerDetails(adventurerMeta).hasManaSpiral;
            if (hasManaspiral) {
              if (level < 80) { hpBonus = 0.2; }
              else if (level < 100) { hpBonus = 0.1; }
              if (mc < 50) { strBonus = 0.2; }
              else if (mc < 70) { strBonus = 0.1; }
            } else {
              if (level < 80) { hpBonus = 0.1; }
              if (mc < 50) { strBonus = 0.1; }
            }
            dispatch(addToObjectListObjectField(
              "fort_bonus_list", "chara_bonus_by_album", "elemental_type", 
              adventurerMeta.ElementalTypeId, "hp", hpBonus));
            dispatch(addToObjectListObjectField(
              "fort_bonus_list", "chara_bonus_by_album", "elemental_type", 
              adventurerMeta.ElementalTypeId, "attack", strBonus));
          }
          addAdventurerStory(adventurerId, false);
    }

    const addNewEncyclopediaEntry = (dragonMeta, maxed) => {
        const dragonId = dragonMeta.Id;
        const albumDragonListObject = albumDragonList.find(obj => obj.dragon_id === dragonId);
        if (albumDragonListObject !== undefined) {
            console.error(`Album dragon list object already exists for dragon ID: ${dragonId}`);
            return;
        }

        const dragonDetails = DragaliaUtils.getDragonDetails(dragonMeta);
        let entry;
        if (maxed) {
            entry = {
                "dragon_id": dragonMeta.Id,
                "max_level": dragonDetails.maxLevel,
                "max_limit_break_count": dragonDetails.maxUnbindCount
            };
        } else {
            entry = {
                "dragon_id": dragonMeta.Id,
                "max_level": 1,
                "max_limit_break_count": 0
            };
        }
        dispatch(addJsonDataListObject("album_dragon_list", entry));
        console.log(`Added new dragon album entry for dragon: ${dragonMeta.FullName} (${dragonId})`);
    }

    const addNewDragonReliabilityEntry = (dragonMeta) => {
        const id = dragonMeta.Id;
        const dragonReliabilityObject = dragonReliabilityList.find(obj => obj.dragon_id === id);
        if (dragonReliabilityObject !== undefined) {
            console.error(`Dragon reliability object already exists for dragon ID: ${id}`);
            return;
        }

        const toMax = id === ARSENE; // Arsene can only be maxed

        const time = DragaliaUtils.getGetTime(null);
        let reliability;
        if (toMax) {
            reliability = {
                "dragon_id": id,
                "gettime": time,
                "reliability_level": 30,
                "reliability_total_exp": 36300,
                "last_contact_time": time
            };
        } else {
            reliability = {
                "dragon_id": id,
                "gettime": time,
                "reliability_level": 1,
                "reliability_total_exp": 0,
                "last_contact_time": time
            };
        }
        dispatch(addJsonDataListObject("dragon_reliability_list", reliability));
        console.log(`Added new reliability entry for dragon: ${dragonMeta.FullName} (${id})`);
    }

    const addDragon = (dragonId, addAsMaxed) => {
        const albumDragonListObject = albumDragonList.find(obj => obj.dragon_id === dragonId);
        const owned = albumDragonListObject !== undefined;
        
        const dragonMeta = maps.dragonMap[dragonId];
        if (dragonMeta === undefined) {
            console.error(`No dragon found for ID: ${dragonId}`);
            return;
        }

        const dragon = addAsMaxed ?
            DragaliaUtils.getMaxedDragon(dragonList, dragonMeta, null, false, null) :
            DragaliaUtils.getNewDragon(dragonList, dragonMeta);
        
        // add new dragon
        dispatch(addJsonDataListObject("dragon_list", dragon));

        
        if (owned) { // if dragon owned, update encyclopedia entry
            handleDragonEncyclopedia(dragon);
        } else { // if dragon not owned, handle new encyclopedia entry, new reliability entry
            addNewEncyclopediaEntry(dragonMeta, addAsMaxed);
            addNewDragonReliabilityEntry(dragonMeta);
        }

        // The dragon "Arsene" always comes at bond level 30
        // and its dragon stories are unlocked by default
        if (dragonId === ARSENE) {
            addDragonStory(dragonMeta, 1);
            addDragonStory(dragonMeta, 2);
        }
    }

    const addWeaponSkin = (weaponSkinId) => {
        if (weaponSkinId === 0) {
            return;
        }

        const weaponSkinObject = weaponSkinList.find(obj => obj.weapon_skin_id === weaponSkinId);
        if (weaponSkinObject !== undefined) {
            return;
        }

        const newWeaponSkin = {
            "weapon_skin_id": weaponSkinId,
            "is_new": 1,
            "gettime": DragaliaUtils.getGetTime(null)
        }

        dispatch(addJsonDataListObject("weapon_skin_list", newWeaponSkin));
    }

    const handleWeaponBuildupSkins = (weaponMeta, weaponBuildupPieceType, step) => {
        const buildupGroupId = weaponMeta.WeaponBodyBuildupGroupId;
        const buildupPieceTypeString = zeroPad(weaponBuildupPieceType, 2);
        const stepString = zeroPad(step, 2);
        const weaponBodyBuildupGroupId = +`${buildupGroupId}${buildupPieceTypeString}${stepString}`;
        const weaponBodyBuildupGroup = maps.weaponBodyBuildupGroupMap[weaponBodyBuildupGroupId];
        
        if (weaponBodyBuildupGroup === undefined) {
            console.error(`No weapon buildup group found for ID: ${weaponBodyBuildupGroupId},
                weapon ID: ${weaponMeta.Id}, type: ${weaponBuildupPieceType}, step: ${step}`);
            return;
        }

        const rewardWeaponSkinNo = weaponBodyBuildupGroup.RewardWeaponSkinNo;
        if (rewardWeaponSkinNo === 0) {
            return;
        }

        let weaponSkinId = 0;
        switch (rewardWeaponSkinNo) {
            case 1:
                weaponSkinId = weaponMeta.RewardWeaponSkinId1;
                break;
            case 2:
                weaponSkinId = weaponMeta.RewardWeaponSkinId2;
                break;
            case 3:
                weaponSkinId = weaponMeta.RewardWeaponSkinId3;
                break;
            default:
                console.error(`Invalid reward weapon skin number: ${rewardWeaponSkinNo}`);
                return;
        }
        addWeaponSkin(weaponSkinId);
    }

    const handleWeaponBuildupSkinsAll = (weaponMeta) => {
        const weaponDetails = DragaliaUtils.getWeaponDetails(weaponMeta);

        for (let i = 1; i <= weaponDetails.maxUnbindCount; i++) {
            handleWeaponBuildupSkins(weaponMeta, WeaponBuildupPieceType.UNBIND, i);
        }

        for (let i = 1; i <= weaponDetails.maxRefineCount; i++) {
            handleWeaponBuildupSkins(weaponMeta, WeaponBuildupPieceType.REFINEMENT, i);
        }
    }

    return { 
        addAdventurerStory,
        addDragonStory,
        handleDragonEncyclopedia,
        maxAdventurer,
        addDragon,
        addWeaponSkin,
        handleWeaponBuildupSkins,
        handleWeaponBuildupSkinsAll
    };
};

export default useDragaliaActions;