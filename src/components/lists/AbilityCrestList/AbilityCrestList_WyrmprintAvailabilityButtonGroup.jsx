import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { WyrmprintAvailability } from '../../../enum/Enums';

function AbilityCrestList_WyrmprintAvailabilityButtonGroup({onSetActiveWyrmprintAvailability}) {

  const buttons = [
    { wyrmprintAvailability: WyrmprintAvailability.PERMANENT, label: 'Permanent' },
    { wyrmprintAvailability: WyrmprintAvailability.DOMINION, label: 'SinDom' },
    { wyrmprintAvailability: WyrmprintAvailability.LIMITED, label: 'Limited' },
    { wyrmprintAvailability: WyrmprintAvailability.EVENT_WELFARE, label: 'Welfare' },
    { wyrmprintAvailability: WyrmprintAvailability.TREASURE_TRADE, label: 'Treasure Trade' },
    { wyrmprintAvailability: WyrmprintAvailability.COMPENDIUM, label: 'Compendium' },
    { wyrmprintAvailability: WyrmprintAvailability.COLLAB, label: 'Collab' },
    { wyrmprintAvailability: WyrmprintAvailability.PROMO, label: 'Promo' }
  ];

  const [activeWyrmprintAvailability, setActiveWyrmprintAvailability] = useState(WyrmprintAvailability.PERMANENT);

  const handleButtonClick = (wyrmprintAvailability) => {
    setActiveWyrmprintAvailability(wyrmprintAvailability);
    onSetActiveWyrmprintAvailability(wyrmprintAvailability);
  };

  return (
    <ButtonGroup>
      {buttons.map((button) => (
        <Button
          key={button.wyrmprintAvailability}
          variant='contained'
          style={{ backgroundColor: activeWyrmprintAvailability === button.wyrmprintAvailability ? '#493b8f' : '#7a62f0' }}
          onClick={() => handleButtonClick(button.wyrmprintAvailability)}
          sx={{ textTransform: 'none' }}
        >
          {button.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default AbilityCrestList_WyrmprintAvailabilityButtonGroup;