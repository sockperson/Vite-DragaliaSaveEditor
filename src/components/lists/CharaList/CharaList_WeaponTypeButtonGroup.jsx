import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { WeaponTypeId } from '../../../enum/Enums';

import ImageUtils from '../../../util/ImageUtils';

const IMG_SIZE = 24;

function CharaList_WeaponTypeButtonGroup({onSetActiveWeaponType, activeWeaponType}) {

  const buttons = [
    { weaponType: WeaponTypeId.SWORD, label: 'Sword' },
    { weaponType: WeaponTypeId.BLADE, label: 'Blade' },
    { weaponType: WeaponTypeId.DAGGER, label: 'Dagger' },
    { weaponType: WeaponTypeId.AXE, label: 'Axe' },
    { weaponType: WeaponTypeId.LANCE, label: 'Lance' },
    { weaponType: WeaponTypeId.BOW, label: 'Bow' },
    { weaponType: WeaponTypeId.WAND, label: 'Wand' },
    { weaponType: WeaponTypeId.STAFF, label: 'Staff' },
    { weaponType: WeaponTypeId.MANACASTER, label: 'Manacaster' }
  ];

  const handleButtonClick = (weaponType) => {
    onSetActiveWeaponType(weaponType);
  };

  return (
    <div className="button-group-container">
      <ButtonGroup className="button-group">
        {buttons.map((button) => (
          <Button
            key={button.weaponType}
            variant='contained'
            style={{ backgroundColor: activeWeaponType === button.weaponType ? '#493b8f' : '#7a62f0' }}
            onClick={() => handleButtonClick(button.weaponType)}
            sx={{ textTransform: 'none' }}
          >
            <img 
              src={ImageUtils.getWeaponTypeImage(button.weaponType, IMG_SIZE)} 
              alt={button.label} 
              style={{ width: IMG_SIZE, height: IMG_SIZE }} 
            />
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}

export default CharaList_WeaponTypeButtonGroup;