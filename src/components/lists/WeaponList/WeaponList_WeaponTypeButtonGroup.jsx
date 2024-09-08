import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { WeaponTypeId } from '../../../enum/Enums';

import ImageUtils from '../../../util/ImageUtils';

function WeaponList_WeaponTypeButtonGroup({onSetActiveWeaponType}) {

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

  const [activeWeaponType, setActiveWeaponType] = useState(WeaponTypeId.SWORD);

  const handleButtonClick = (weaponType) => {
    setActiveWeaponType(weaponType);
    onSetActiveWeaponType(weaponType);
  };

  return (
    <ButtonGroup className="button-group">
      {buttons.map((button) => (
        <Button
          key={button.weaponType}
          variant='contained'
          style={{ backgroundColor: activeWeaponType === button.weaponType ? '#493b8f' : '#7a62f0' }}
          onClick={() => handleButtonClick(button.weaponType)}
        >
          <img src={ImageUtils.getWeaponTypeImage(button.weaponType, 16)} alt={button.label} style={{ width: 24, height: 24 }} />
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default WeaponList_WeaponTypeButtonGroup;