import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { MappingContext } from '../components/SaveEditor';
import { addJsonDataListObject, replaceJsonDataListObject, addToObjectListObjectField

 } from '../actions/JsonDataActions';

import JsonUtils from './JsonUtils';
import DragaliaUtils from './DragaliaUtils';

const useRepairUtils = (maps) => {
    const dispatch = useDispatch();

    const unitStoryList = useSelector(state => state.jsonData.data.unit_story_list);
    const dragonReliabilityList = useSelector(state => state.jsonData.data.dragon_reliability_list);

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
                    out += `${dragonMeta.FullName}${i}, `;
                }
                repaired = true;
            }
        }
        out = out.slice(0, -2);
        return [repaired, out];
    }

    return { 
        repairDragonStories
    };
};

export default useRepairUtils