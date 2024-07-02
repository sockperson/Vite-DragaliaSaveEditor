import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { WeaponSeries } from '../../../enum/Enums';

function WeaponList_WeaponSeriesButtonGroup({onSetActiveWeaponSeries}) {

  const buttons = [
    { weaponSeries: WeaponSeries.CORE, label: 'Core' },
    { weaponSeries: WeaponSeries.VOID, label: 'Void' },
    { weaponSeries: WeaponSeries.CHIMERATECH, label: 'Chimeratech' },
    { weaponSeries: WeaponSeries.HIGH_DRAGON, label: 'High Dragon' },
    { weaponSeries: WeaponSeries.AGITO, label: 'Agito' },
    { weaponSeries: WeaponSeries.PRIMAL_DRAGON, label: 'Primal Dragon' },
    { weaponSeries: WeaponSeries.OTHER, label: 'Other' }
  ];

  const [activeWeaponSeries, setActiveWeaponSeries] = useState(WeaponSeries.CORE);

  const handleButtonClick = (weaponSeries) => {
    setActiveWeaponSeries(weaponSeries);
    onSetActiveWeaponSeries(weaponSeries);
  };

  return (
    <ButtonGroup>
      {buttons.map((button) => (
        <Button
          key={button.weaponSeries}
          variant='contained'
          style={{ backgroundColor: activeWeaponSeries === button.weaponSeries ? '#493b8f' : '#7a62f0' }}
          onClick={() => handleButtonClick(button.weaponSeries)}
          sx={{ textTransform: 'none' }}
        >
          {button.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default WeaponList_WeaponSeriesButtonGroup;