import React from 'react';

import { useSelector } from 'react-redux'; 

import IconButton from '@mui/material/IconButton';

import ImageUtils from '../../../util/ImageUtils';

import notteWtfIcon from '../../../assets/icons/nottewtf.png';

function WeaponList_WeaponSelectButton({weaponId, weaponMeta, weaponSkinMeta, isActive, onSetActiveWeaponId}) { 

  const weaponObject = useSelector(state => state.jsonData.data.weapon_body_list
    .find(weaponObject => weaponObject["weapon_body_id"] === weaponId));
  
  const isOwned = weaponObject ? true : false;
  
  const BUTTON_SIZE = 96;

  const imgSrc = weaponSkinMeta ? (ImageUtils.getWeaponSkinImage(
    weaponSkinMeta.BaseId,
    weaponSkinMeta.VariationId,
    weaponSkinMeta.FormId,
    BUTTON_SIZE
  )) : notteWtfIcon;

  const handleButtonClick = () => {
    onSetActiveWeaponId(weaponId);
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
        alt={weaponMeta.Name} 
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

export default WeaponList_WeaponSelectButton;