import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { ElementTypeId } from '../../../enum/Enums';

import ImageUtils from '../../../util/ImageUtils';

const IMG_SIZE = 24;

function DragonList_ElementButtonGroup({onSetActiveElement, activeElement}) {

  const buttons = [
    { element: ElementTypeId.FLAME },
    { element: ElementTypeId.WATER },
    { element: ElementTypeId.WIND },
    { element: ElementTypeId.LIGHT },
    { element: ElementTypeId.SHADOW }
  ];

  const handleButtonClick = (element) => {
    onSetActiveElement(element);
  };

  return (
    <ButtonGroup>
      {buttons.map((button) => (
        <Button
          key={button.element}
          variant='contained'
          style={{ backgroundColor: activeElement === button.element ? '#493b8f' : '#7a62f0' }}
          onClick={() => handleButtonClick(button.element)}
          sx={{ textTransform: 'none' }}
        >
          <img 
            src={ImageUtils.getElementTypeImage(button.element, IMG_SIZE)} 
            alt="Element Icon" 
            style={{ width: IMG_SIZE, height: IMG_SIZE }} 
          />
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default DragonList_ElementButtonGroup;