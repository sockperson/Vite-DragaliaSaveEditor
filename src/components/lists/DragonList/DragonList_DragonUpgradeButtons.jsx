import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux'; 
import { updateJsonDataListField, addJsonDataListObject, toggleJsonDataListField, 
  replaceJsonDataListObject, addToObjectListObjectField } from '../../../actions/JsonDataActions';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';

import DragaliaUtils from '../../../util/DragaliaUtils';
import useDragaliaActions from '../../../util/DragaliaActionsUtils';

import ImageUtils from '../../../util/ImageUtils';
import { StatType } from '../../../enum/Enums';

import notteWtfIcon from '../../../assets/icons/nottewtf.png';

const MAX_AUGMENT_COUNT = 50;
const MAX_BOND_LEVEL = 30;
const ARSENE_ID = 20050522;

function DragonList_DragonUpgradeButtons({dragonKeyId, dragonMeta}) { 
  
  const dispatch = useDispatch();
  const { addDragonStory, handleDragonEncyclopedia } = useDragaliaActions();

  const dragonObject = useSelector(state => state.jsonData.data.dragon_list
    .find(dragonObject => dragonObject["dragon_key_id"] === dragonKeyId));
  const dragonReliabilityObject = useSelector(state => state.jsonData.data.dragon_reliability_list)
    .find(reliabilityObject => reliabilityObject["dragon_id"] === dragonMeta.Id);

  const onMax = () => {
    const newDragonObject = DragaliaUtils.getMaxedDragonFromExisting(dragonMeta, dragonObject);
    dispatch(replaceJsonDataListObject("dragon_list", "dragon_key_id", newDragonObject));
    handleDragonEncyclopedia(dragonObject);
  }

  const onMaxAugments = (statType) => {
    let field = "";
    switch (statType) {
      case StatType.HP:
        field = "hp_plus_count";
        break;
      case StatType.STRENGTH:
        field = "attack_plus_count";
        break;
      default:
        console.error(`Invalid stat type: ${statType}`);
        return;
    }
    dispatch(updateJsonDataListField("dragon_list", 
      "dragon_key_id", dragonKeyId, field, MAX_AUGMENT_COUNT));
  }

  const onMaxBond = () => {
    dispatch(updateJsonDataListField("dragon_reliability_list", 
      "dragon_id", dragonMeta.Id, "reliability_level", MAX_BOND_LEVEL));
    addDragonStory(dragonMeta, 1);  // stories are unlocked by bond
    addDragonStory(dragonMeta, 2);
  }

  const onMinBond = () => {
    dispatch(updateJsonDataListField("dragon_reliability_list", 
      "dragon_id", dragonMeta.Id, "reliability_level", 1));
    // should minimizing bond remove stories? 
    // don't know how servers handle trying to add already existing stories
  }

  const onToggleLock = () => {
    dispatch(toggleJsonDataListField("dragon_list", 
      "dragon_key_id", dragonKeyId, "is_lock"));
  }
  
  const commonProps = {
    variant: 'contained',
    style: { backgroundColor: '#7a62f0' },
    sx: { 
      textTransform: 'none',
      color: 'white',
      '&.Mui-disabled': {
        color: 'white',
        opacity: 0.5
      }
    }
  }

  const isBondLevelMaxed = dragonReliabilityObject ?
    dragonReliabilityObject.reliability_level >= MAX_BOND_LEVEL : false;
  const isBondLevelMin = dragonReliabilityObject ?
    dragonReliabilityObject.reliability_level <= 1 : false;
  const isLocked = dragonObject ? (dragonObject.is_lock === 1) : false;

  return (
    <ButtonGroup style={{ gap: '10px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Button 
        key="max_hp_augments" 
        onClick={() => onMaxAugments(StatType.HP) } 
        {...commonProps}
        disabled={
          dragonObject.hp_plus_count >= MAX_AUGMENT_COUNT
        }
      >
        Max HP Augments
      </Button>
      <Button 
        key="max_str_augments" 
        onClick={() => onMaxAugments(StatType.STRENGTH) } 
        {...commonProps}
        disabled={
          dragonObject.attack_plus_count >= MAX_AUGMENT_COUNT
        }
      >
        Max Strength Augments
      </Button>
      <Button 
        key="max_bond" 
        onClick={() => onMaxBond() } 
        {...commonProps}
        disabled={
          isBondLevelMaxed
        }
      >
        Max Bond
      </Button>
      <Button 
        key="min_bond" 
        onClick={() => onMinBond() } 
        {...commonProps}
        disabled={
          isBondLevelMin ||
          dragonMeta.Id === ARSENE_ID
        }
      >
        Minimize Bond
      </Button>
      <Button 
        key="toggle_lock" 
        onClick={() => onToggleLock() } 
        {...commonProps}
        disabled={
          false
        }
      >
        Toggle Lock
      </Button>
      <Button 
        key="max" 
        onClick={() => onMax() } 
        {...commonProps}
        disabled={
          DragaliaUtils.isDragonMaxed(dragonObject, dragonMeta)
        }
      >
        Max
      </Button>
    </ButtonGroup>
  );
  

}

export default DragonList_DragonUpgradeButtons;