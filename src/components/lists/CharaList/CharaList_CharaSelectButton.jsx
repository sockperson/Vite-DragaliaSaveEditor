import React from 'react';

import { useSelector } from 'react-redux'; 

import IconButton from '@mui/material/IconButton';

import ImageUtils from '../../../util/ImageUtils';

import notteWtfIcon from '../../../assets/icons/nottewtf.png';

function CharaList_CharaSelectButton({charaId, adventurerMeta, isActive, onSetActiveAdventurerId}) { 

  const adventurerObject = useSelector(state => state.jsonData.data.chara_list
    .find(adventurerObject => adventurerObject["chara_id"] === charaId));
  
  const isOwned = adventurerObject ? true : false;
  
  const BUTTON_SIZE = 80;

  const imgSrc = ImageUtils.getAdventurerImage(
    adventurerMeta,
    BUTTON_SIZE
  );

  const handleButtonClick = () => {
    onSetActiveAdventurerId(charaId);
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
        alt={adventurerMeta.FullName} 
        style={
          { 
            width: BUTTON_SIZE, 
            height: BUTTON_SIZE,
            opacity: isOwned ? 1 : 0.5
          }
        } 
      />
    </IconButton>
  );
}

export default CharaList_CharaSelectButton;