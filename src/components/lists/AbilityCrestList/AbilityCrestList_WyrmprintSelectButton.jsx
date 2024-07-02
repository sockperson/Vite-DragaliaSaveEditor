import React from 'react';

import { useSelector } from 'react-redux'; 

import IconButton from '@mui/material/IconButton';

import ImageUtils from '../../../util/ImageUtils';

import notteWtfIcon from '../../../assets/icons/nottewtf.png';

function AbilityCrestList_WyrmprintSelectButton({
  wyrmprintId, wyrmprintMeta, isActive, onSetActiveWyrmprintId}) { 

  const wyrmprintObject = useSelector(state => state.jsonData.data.ability_crest_list
    .find(wyrmprintObject => wyrmprintObject["ability_crest_id"] === wyrmprintId));
  
  const isOwned = wyrmprintObject ? true : false;
  
  const BUTTON_SIZE = 64;

  const imgSrc = wyrmprintMeta ? (ImageUtils.getWyrmprintImage(
    wyrmprintMeta.BaseId,
    wyrmprintMeta.Rarity,
    BUTTON_SIZE
  )) : notteWtfIcon;

  const handleButtonClick = () => {
    onSetActiveWyrmprintId(wyrmprintId);
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
        alt={wyrmprintMeta.Name} 
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

export default AbilityCrestList_WyrmprintSelectButton;