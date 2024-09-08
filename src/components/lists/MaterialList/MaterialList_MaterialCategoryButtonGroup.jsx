import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { MaterialCategoryGroup } from '../../../enum/Enums';

function MaterialList_MaterialCategoryButtonGroup({ onSetActiveMaterialCategoryGroup }) {

  const buttons = [
    { materialCategoryGroup: MaterialCategoryGroup.BATTLE_ROYALE, label: 'Battle Royale' },
    { materialCategoryGroup: MaterialCategoryGroup.EVENTS, label: 'Events' },
    { materialCategoryGroup: MaterialCategoryGroup.UPGRADE, label: 'Upgrade' },
    { materialCategoryGroup: MaterialCategoryGroup.CRAFTING, label: 'Crafting' },
    { materialCategoryGroup: MaterialCategoryGroup.ESSENCE, label: 'Essence' },
    { materialCategoryGroup: MaterialCategoryGroup.MANA_SPIRAL, label: 'Mana Spiral' },
    { materialCategoryGroup: MaterialCategoryGroup.NO_CATEGORY_GROUP, label: 'Other' }
  ];

  const [activeMaterialCategoryGroup, setActiveMaterialCategoryGroup] = useState(MaterialCategoryGroup.UPGRADE);

  const handleButtonClick = (materialCategoryGroup) => {
    setActiveMaterialCategoryGroup(materialCategoryGroup);
    onSetActiveMaterialCategoryGroup(materialCategoryGroup);
  };

  return (
    <ButtonGroup className="button-group">
      {buttons.map((button) => (
        <Button
          key={button.materialCategoryGroup}
          variant='contained'
          style={{ backgroundColor: activeMaterialCategoryGroup === button.materialCategoryGroup ? '#493b8f' : '#7a62f0' }}
          onClick={() => handleButtonClick(button.materialCategoryGroup)}
          sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
        >
          {button.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default MaterialList_MaterialCategoryButtonGroup;