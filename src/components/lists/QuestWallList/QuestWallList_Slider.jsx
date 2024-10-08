// https://www.filestack.com/fileschool/react/react-file-upload/
import React, {useRef, useState } from 'react';

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

function QuestWallList_Slider({questWallId}) {

  const dispatch = useDispatch();
  const questWallObject = useSelector(state => state.jsonData.data.quest_wall_list
    .find(questWall => questWall["wall_id"] === questWallId));

  if (!questWallObject) {
    return "No quest wall object found :(";
  }

  const [inputValue, setInputValue] = useState(questWallObject ? questWallObject.wall_level : 0);
  
  const initialWallLevel = useRef(questWallObject.wall_level);
  const icon = iconMap[questWallId] || notteWtfIcon;
  
  const handleBlur = () => {
    const valueChanged = inputValue != initialWallLevel.current;
    // if wall level changed, then set is_start_next_level to 0
    const newIsStartNextLevel = (valueChanged) ? 0 : 1;
    dispatch(updateJsonDataListField("quest_wall_list", "wall_id", questWallId, "wall_level", inputValue))
    dispatch(updateJsonDataListField("quest_wall_list", "wall_id", questWallId, "is_start_next_level", newIsStartNextLevel))
  }

  const handleWallLevelChange = (event) => {
    let value = event.target.value;
    let newValue = Math.max(Math.min(value, QUEST_WALL_LEVEL_MAX), 0);
    setInputValue(newValue);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Slider
        value={inputValue}
        onChange={handleWallLevelChange}
        onBlur={handleBlur}
        valueLabelDisplay="auto"
        aria-labelledby="input-slider"
        min={0}
        max={QUEST_WALL_LEVEL_MAX}
        style={{ marginRight: 8, width: '50%' }} // Adjust the width as needed
      />
      <Box display="flex" alignItems="center" style={{ marginLeft: 16 }}>
        <img src={icon} alt="Icon" style={{ width: 24, height: 24, marginRight: 8 }} />
        <Typography variant="body1">Level: {inputValue}</Typography>
      </Box>
    </div>
  );
}

export default QuestWallList_Slider;