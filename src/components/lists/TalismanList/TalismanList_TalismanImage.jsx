import React, {memo, useContext} from 'react';
import { MappingContext } from '../../SaveEditor';

import CircleIcon from '@mui/icons-material/Circle';

import ImageUtils from '../../../util/ImageUtils';

const TalismanList_TalismanImage = memo((
    {adventurerId, abilityIds, isUsed, imageSize}) =>
{

  const ABILITY_IMAGE_SIZE = 100;

  const adventurerMap = useContext(MappingContext).adventurerMap;
  const abilityMap = useContext(MappingContext).abilityMap;

  const adventurerMeta = adventurerMap[adventurerId];
  const abilityCount = abilityIds.length;
  const advSrc = ImageUtils.getAdventurerImage(adventurerMeta, imageSize);

  const getAbilityImages = () => {
    let size = 0;
    switch (abilityCount) {
      case 1:
        size = 0.40 * imageSize;
        break;
      case 2:
        size = 0.35 * imageSize;
        break;
      case 3:
        size = 0.30 * imageSize;
        break;
    }

    const out = [];
    for (let i = 0; i < abilityCount; i++) {
      const abilityId = abilityIds[i];
      const abilityMeta = abilityMap[abilityId];
      const abilityName = abilityMeta.Name;
      const abilityIconName = abilityMeta.AbilityIconName;
      const abilityImgSrc = ImageUtils.getAbilityImage(abilityIconName, ABILITY_IMAGE_SIZE);
      out.push(
        <img 
          src={abilityImgSrc} 
          alt={abilityName} 
          style={{
            position: 'absolute',
            top: `${size * i}%`,
            right: '0',
            width: `${size}%`,
            height: `${size}%`
          }}
          key={`talisman-ability-${i}`}
        />
      );
    }

    return out;
  }

  const getUsedIcon = () => {
    if (isUsed) {
      const size = imageSize * 0.15;
      const wrapperSize = size * 0.65;
    
      return (
        <div
          style={{
            position: 'absolute',
            top: `0px`,
            right: `${imageSize - wrapperSize * 1.5}px`,
            width: `${wrapperSize}px`,
            height: `${wrapperSize}px`,
            borderRadius: '50%',
            border: '3px solid white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircleIcon
            sx={{
              fontSize: size,
              color: 'SlateBlue',
              opacity: 1
            }}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              border: 'none'
            }}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div style={{ position: 'relative', width: imageSize, height: imageSize }}>
    <img 
        src={advSrc} 
        alt={"Talisman Image"} 
        style={{ width: imageSize, height: imageSize }} 
      />
      {getAbilityImages()}
      {getUsedIcon()}
    </div>
  );
});

export default TalismanList_TalismanImage;