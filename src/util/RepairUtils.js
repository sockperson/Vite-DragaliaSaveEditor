import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { MappingContext } from '../components/SaveEditor';
import { addJsonDataListObject, replaceJsonDataListObject, addToObjectListObjectField,
    setList
 } from '../actions/JsonDataActions';

import { StoryAdventurerNames } from '../definitions/Definitions';

import JsonUtils from './JsonUtils';
import DragaliaUtils from './DragaliaUtils';

const useRepairUtils = (maps) => {
    const dispatch = useDispatch();

    const unitStoryList = useSelector(state => state.jsonData.data.unit_story_list);
    const dragonReliabilityList = useSelector(state => state.jsonData.data.dragon_reliability_list);
    const weaponPassiveAbilityList = useSelector(state => state.jsonData.data.weapon_passive_ability_list);
    const albumDragonList = useSelector(state => state.jsonData.data.album_dragon_list);
    const charaList = useSelector(state => state.jsonData.data.chara_list);

    const repairDragonStories = () => {
        let out = "Added stories: ";
        let repaired = false;
        let repairCount = 0;
        const dragonReliabilityMap = JsonUtils.getFieldMapFromList(
            dragonReliabilityList, "dragon_id", "reliability_level");
    
        for (const [dragonId, reliabilityLevel] of Object.entries(dragonReliabilityMap)) {
            const dragonMeta = maps.dragonMap[dragonId];

            let addStoryCount = 0;
            if (reliabilityLevel >= 15) {
                addStoryCount = 2;
            } else if (reliabilityLevel >= 5) {
                addStoryCount = 1;
            }

            for (let i = 1; i <= addStoryCount; i++) {
                const storyId = +`${dragonMeta.BaseId}01${i}`;
                if (JsonUtils.listHasValue(unitStoryList, "unit_story_id", storyId)) {
                    continue;
                }
                const story = {
                    "unit_story_id": storyId,
                    "is_read": 0
                };
                dispatch(addJsonDataListObject("unit_story_list", story));
                if (repairCount++ < 4) {
                    out += `${dragonMeta.FullName} (#${i}), `;
                }
                repaired = true;
            }
        }
        out = out.slice(0, -2);
        return [repaired, out];
    }

    const repairDupeWeaponPassiveAbilityIds = () => {
        let [filteredList, filtered] = JsonUtils.filterDuplicates(weaponPassiveAbilityList, "weapon_passive_ability_id");
        let repaired = false;
        let out = "";

        if (filtered.size > 0) {
            repaired = true;
            out = `Removed duplicate weapon passive ability ids: ${Array.from(filtered).slice(0, 5).join(", ")}`;
            dispatch(setList("weapon_passive_ability_list", filteredList));
        }

        return [repaired, out];
    }


    // TODO this doesn't work yet, I think?
    const repairMissingDragonReliability = () => {
        let repaired = false;
        let out = "";

        const albumDragonSet = JsonUtils.getSetFromList(albumDragonList, "dragon_id");
        const dragonReliabilitySet = JsonUtils.getSetFromList(dragonReliabilityList, "dragon_id");
        const missingBondDragons = JsonUtils.subtractSets(albumDragonSet, dragonReliabilitySet);
        if (missingBondDragons.size > 0) {
            out = `Added missing dragon reliabilities: ${Array.from(missingBondDragons).slice(0, 5).join(", ")}`;
            for (const dragonId of missingBondDragons) {
                const reliability = DragaliaUtils.getDragonReliability(dragonId);
                console.log(reliability);
                dispatch(addJsonDataListObject("dragon_reliability_list", reliability));
            }
            repaired = true;
        }
        return [repaired, out];
    }

    const repairMissingStoryAdventurerSharedSkills = () => {
        let repaired = false;
        let out = "";

        for (const adventurer of charaList) {
            const adventurerMeta = maps.adventurerMap[adventurer.chara_id];

            if (!adventurerMeta) {
                console.warn(`Missing adventurer meta for chara_id: ${adventurer.chara_id}`);
                continue;
            }

            const adventurerDetails = DragaliaUtils.getAdventurerDetails(adventurerMeta);

            if (!adventurerDetails.hasSkillShareUnlockedByDefault) {
                continue;
            }

            if (adventurer.is_unlock_edit_skill == 0) {
                const updatedAdventurer = {
                    ...adventurer,
                    is_unlock_edit_skill: 1
                };
                dispatch(replaceJsonDataListObject("chara_list", "chara_id", updatedAdventurer));
                repaired = true;
                out += `Updated ${adventurerMeta.FullName} to unlock skill share, `;
            }
        }
        out = out.slice(0, -2);
        return [repaired, out];
    }

    return { 
        repairDragonStories,
        repairDupeWeaponPassiveAbilityIds,
        repairMissingDragonReliability,
        repairMissingStoryAdventurerSharedSkills
    };
};

export default useRepairUtils