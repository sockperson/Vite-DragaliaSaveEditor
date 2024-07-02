import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { WyrmprintSearchType } from '../../../enum/Enums';

function AbilityCrestList_WyrmprintSearchTypeButtonGroup({onSetActiveWyrmprintSearchType}) {

  const buttons = [
    { wyrmprintSearchType: WyrmprintSearchType.NAME, label: 'Wyrmprint Name' },
    { wyrmprintSearchType: WyrmprintSearchType.ICON, label: 'Wyrmprint Icon' },
    { wyrmprintSearchType: WyrmprintSearchType.CHARACTER, label: 'Featured Characters' }
  ];

  const [activeWyrmprintSearchType, setActiveWyrmprintSearchType] = useState(WyrmprintSearchType.NAME);

  const handleButtonClick = (wyrmprintSearchType) => {
    setActiveWyrmprintSearchType(wyrmprintSearchType);
    onSetActiveWyrmprintSearchType(wyrmprintSearchType);
  };

  return (
    <ButtonGroup>
      {buttons.map((button) => (
        <Button
          key={button.wyrmprintSearchType}
          variant='contained'
          style={{ backgroundColor: activeWyrmprintSearchType === button.wyrmprintSearchType ? '#493b8f' : '#7a62f0' }}
          onClick={() => handleButtonClick(button.wyrmprintSearchType)}
          sx={{ textTransform: 'none' }}
        >
          {button.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default AbilityCrestList_WyrmprintSearchTypeButtonGroup;