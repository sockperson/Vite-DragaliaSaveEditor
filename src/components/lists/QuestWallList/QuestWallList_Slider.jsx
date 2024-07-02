// https://www.filestack.com/fileschool/react/react-file-upload/
import React, {useRef} from 'react';

import { useSelector, useDispatch } from 'react-redux'; 

import { updateJsonDataListField } from '../../../actions/JsonDataActions';

import { Slider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'; // Or you can use div
import Checkbox from '@mui/material/Checkbox';

import { QuestWallId } from '../../../enum/Enums';

import notteWtfIcon from '../../../assets/icons/nottewtf.png';
import flameIcon from '../../../assets/icons/elements/flame.png';
import waterIcon from '../../../assets/icons/elements/water.png';
import windIcon from '../../../assets/icons/elements/wind.png';
import lightIcon from '../../../assets/icons/elements/light.png';
import shadowIcon from '../../../assets/icons/elements/shadow.png';

const iconMap = {
  [QuestWallId.FLAME]: flameIcon,
  [QuestWallId.WATER]: waterIcon,
  [QuestWallId.WIND]: windIcon,
  [QuestWallId.LIGHT]: lightIcon,
  [QuestWallId.SHADOW]: shadowIcon
}

const QUEST_WALL_LEVEL_MAX = 80;

// field: the actual field name in save data (e.g. "coin")
// fieldName: the display name of the field (e.g. "Rupies")
function QuestWallList_Slider({questWallId}) {

  const dispatch = useDispatch();
  const questWallObject = useSelector(state => state.jsonData.data.quest_wall_list
    .find(questWall => questWall["wall_id"] === questWallId));

  const prevIsStartNextLevelState = useRef(questWallObject.is_start_next_level);

  const icon = iconMap[questWallId] || notteWtfIcon;

  const handleWallLevelChange = (event) => {
    let prevValue = questWallObject.wall_level;
    let value = event.target.value;
    let newValue = Math.max(Math.min(value, QUEST_WALL_LEVEL_MAX), 0);
    let newIsStartNextLevel = questWallObject.is_start_next_level;
    // Going from non-max to max level; started next level flag forced to false
    if (value === QUEST_WALL_LEVEL_MAX) {
      newIsStartNextLevel = 0;
    } else { // If not, then keep track of previous flag value
      if (prevValue !== QUEST_WALL_LEVEL_MAX) {
        prevIsStartNextLevelState.current = newIsStartNextLevel;
      }
    }

    // Going from max to non-max level; restore previous flag value
    if (prevValue === QUEST_WALL_LEVEL_MAX) {
      newIsStartNextLevel = prevIsStartNextLevelState.current;
    }
    
    dispatch(updateJsonDataListField("quest_wall_list", "wall_id", questWallId, "wall_level", newValue))
    if (newIsStartNextLevel !== questWallObject.is_start_next_level) {
      dispatch(updateJsonDataListField("quest_wall_list", "wall_id", questWallId, "is_start_next_level", newIsStartNextLevel))
    }
  };

  const handleIsStartNextLevelChange = (event) => {
    let value = event.target.checked ? 1 : 0;
    dispatch(updateJsonDataListField("quest_wall_list", "wall_id", questWallId, "is_start_next_level", value))
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Slider
        value={questWallObject.wall_level || -1}
        onChange={handleWallLevelChange}
        aria-labelledby="input-slider"
        min={0}
        max={QUEST_WALL_LEVEL_MAX}
        style={{ marginRight: 8 }} // Add some spacing between the slider and the text field
      />
      <Box display="flex" alignItems="center">
        <img src={icon} alt="Icon" style={{ width: 24, height: 24, marginRight: 8 }} />
        <Typography variant="body1">Level: {questWallObject.wall_level}</Typography>
      </Box>
      <Checkbox
        checked={questWallObject.is_start_next_level == 1}
        onChange={handleIsStartNextLevelChange}
        inputProps={{ 'aria-label': 'Has Started Next Level?' }}
        disabled={questWallObject.wall_level >= QUEST_WALL_LEVEL_MAX}
      />
    </div>
  );
}

export default QuestWallList_Slider;