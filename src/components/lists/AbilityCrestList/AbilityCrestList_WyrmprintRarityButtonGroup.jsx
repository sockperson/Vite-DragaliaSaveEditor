import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function AbilityCrestList_WyrmprintRarityButtonGroup({onSetActiveWyrmprintRarity}) {

  const buttons = [
    { rarity: 2, label: '2★' },
    { rarity: 3, label: '3★' },
    { rarity: 4, label: '4★' },
    { rarity: 5, label: '5★' },
    { rarity: 9, label: 'SinDom' },
  ];

  const [activeWyrmprintRarity, setActiveWyrmprintRarity] = useState(2);

  const handleButtonClick = (rarity) => {
    setActiveWyrmprintRarity(rarity);
    onSetActiveWyrmprintRarity(rarity);
  };

  return (
    <ButtonGroup>
      {buttons.map((button) => (
        <Button
          key={button.rarity}
          variant='contained'
          style={{ backgroundColor: activeWyrmprintRarity === button.rarity ? '#493b8f' : '#7a62f0' }}
          onClick={() => handleButtonClick(button.rarity)}
          sx={{ textTransform: 'none' }}
        >
          {button.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default AbilityCrestList_WyrmprintRarityButtonGroup;