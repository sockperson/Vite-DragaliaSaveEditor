import React from 'react';

import { useSelector } from 'react-redux'; 

import IconButton from '@mui/material/IconButton';

import ImageUtils from '../../../util/ImageUtils';

function DragonList_DragonSelectButton({dragonKeyId, dragonMeta, isActive, onSetActiveDragonIds}) { 

  const dragonObject = useSelector(state => state.jsonData.data.dragon_list
    .find(dragonObject => dragonObject["dragon_key_id"] === dragonKeyId));
    
  const BUTTON_SIZE = 80;

  const imgSrc = ImageUtils.getDragonImage(dragonMeta);

  const handleButtonClick = () => {
    onSetActiveDragonIds(dragonKeyId, dragonObject.dragon_id);
  }

  const activeStyle = {
    backgroundColor: '#4d6fbd',
    borderRadius: '0'
  };

  return (
    <IconButton 
      style={isActive ? activeStyle : {}}
      onClick={handleButtonClick}
    >
      <img 
        src={imgSrc} 
        alt={dragonMeta.FullName} 
        style={
          { 
            width: BUTTON_SIZE, 
            height: BUTTON_SIZE,
            opacity: 1.0
          }
        } 
      />
    </IconButton>
  );
}

export default DragonList_DragonSelectButton;