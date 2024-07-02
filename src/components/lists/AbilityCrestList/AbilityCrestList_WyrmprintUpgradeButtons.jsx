import React from 'react';

import { useSelector, useDispatch } from 'react-redux'; 
import { updateJsonDataListField, addJsonDataListObject, replaceJsonDataListObject } from '../../../actions/JsonDataActions';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import DragaliaUtils from '../../../util/DragaliaUtils';
import { StatType } from '../../../enum/Enums';

function AbilityCrestList_WyrmprintUpgradeButtons({wyrmprintId, wyrmprintMeta}) { 
  
  const dispatch = useDispatch();

  const wyrmprintObject = useSelector(state => state.jsonData.data.ability_crest_list
    .find(wyrmprintObject => wyrmprintObject["ability_crest_id"] === wyrmprintId));
  
  const isOwned = wyrmprintObject ? true : false;
    
  const wyrmprintDetails = DragaliaUtils.getWyrmprintDetails(wyrmprintMeta);

  const WYRMPRINT_MAX_UNBIND_COUNT = 4;
  const WYRMPRINT_MAX_EQUIPABLE_COUNT = 4;

  const onGet = () => {
    const newWyrmprintObject = DragaliaUtils.getNewWyrmprint(wyrmprintId);
    dispatch(addJsonDataListObject("ability_crest_list", newWyrmprintObject));
  }

  const onLevelup = (levelupCount) => {
    const level = wyrmprintObject.buildup_count;
    const newLevel = Math.min(level + levelupCount, wyrmprintDetails.maxLevel);
    dispatch(updateJsonDataListField("ability_crest_list", 
      "ability_crest_id", wyrmprintId, "buildup_count", newLevel));
  }

  const onUnbind = () => { 
    const unbinds = wyrmprintObject.limit_break_count;
    const newUnbinds = Math.min(unbinds + 1, WYRMPRINT_MAX_EQUIPABLE_COUNT);
    dispatch(updateJsonDataListField("ability_crest_list", 
      "ability_crest_id", wyrmprintId, "limit_break_count", newUnbinds));
  }

  const onAddCopies = () => {
    const copies = wyrmprintObject.equipable_count;
    const newCopies = Math.min(copies + 1, WYRMPRINT_MAX_EQUIPABLE_COUNT);
    dispatch(updateJsonDataListField("ability_crest_list", 
      "ability_crest_id", wyrmprintId, "equipable_count", newCopies));
  }

  const onAddAugments = (plusCount, statType) => {
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
    const augmentCount = wyrmprintObject[field];
    const newAugmentCount = Math.min(augmentCount + plusCount, wyrmprintDetails.maxAugmentCount);
    dispatch(updateJsonDataListField("ability_crest_list", 
      "ability_crest_id", wyrmprintId, field, newAugmentCount));
  }

  const onToggleIsFavorite = () => {
    const isFavorite = wyrmprintObject.is_favorite;
    const newIsFavorite = isFavorite ? 0 : 1;
    dispatch(updateJsonDataListField("ability_crest_list", 
      "ability_crest_id", wyrmprintId, "is_favorite", newIsFavorite));
  }

  const onMax = () => {
    if (!isOwned) {
      const newWyrmprintObject = DragaliaUtils.getMaxedWyrmprint(wyrmprintId, wyrmprintDetails, null);
      dispatch(addJsonDataListObject("ability_crest_list", newWyrmprintObject));
    } else {
      const newWyrmprintObject = DragaliaUtils.getMaxedWyrmprint(
        wyrmprintId, wyrmprintDetails, wyrmprintObject.gettime, wyrmprintObject.is_favorite
      );
      console.log(newWyrmprintObject);
      dispatch(replaceJsonDataListObject("ability_crest_list", "ability_crest_id", newWyrmprintObject));
    }
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

  return (
    <ButtonGroup style={{ gap: '10px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Button 
        key="get" 
        onClick={() => onGet() } 
        disabled={
          isOwned
        }
        {...commonProps}
      >
        Craft
      </Button>
      <Button 
        key="+1" 
        onClick={() => onLevelup(1) } 
        {...commonProps}
        disabled={
          !isOwned || 
          wyrmprintObject.buildup_count >= wyrmprintDetails.maxLevel
        }
      >
        Level +1
      </Button>
      <Button 
        key="+10" 
        onClick={() => onLevelup(10) } 
        {...commonProps}
        disabled={
          !isOwned || 
          wyrmprintObject.buildup_count >= wyrmprintDetails.maxLevel
        }
      >
        Level +10
      </Button>
      <Button 
        key="+1 HP Augments" 
        onClick={() => onAddAugments(1, StatType.HP) } 
        {...commonProps}
        disabled={
          !isOwned || 
          wyrmprintObject.hp_plus_count >= wyrmprintDetails.maxAugmentCount
        }
      >
        HP Augments +1
      </Button>
      <Button 
        key="+10 HP Augments" 
        onClick={() => onAddAugments(10, StatType.HP) } 
        {...commonProps}
        disabled={
          !isOwned || 
          wyrmprintObject.hp_plus_count >= wyrmprintDetails.maxAugmentCount
        }
      >
        HP Augments +10
      </Button>
      <Button 
        key="+1 STR Augments" 
        onClick={() => onAddAugments(1, StatType.STRENGTH) } 
        {...commonProps}
        disabled={
          !isOwned || 
          wyrmprintObject.attack_plus_count >= wyrmprintDetails.maxAugmentCount
        }
      >
        STR Augments +1
      </Button>
      <Button 
        key="+10 STR Augments" 
        onClick={() => onAddAugments(10, StatType.STRENGTH) } 
        {...commonProps}
        disabled={
          !isOwned || 
          wyrmprintObject.attack_plus_count >= wyrmprintDetails.maxAugmentCount
        }
      >
        STR Augments +10
      </Button>
      <Button 
        key="Unbind" 
        onClick={() => onUnbind() } 
        {...commonProps}
        disabled={
          !isOwned ||
          wyrmprintObject.limit_break_count >= WYRMPRINT_MAX_UNBIND_COUNT
        }
      >
        Unbind
      </Button>
      <Button 
        key="Copies +1" 
        onClick={() => onAddCopies() } 
        {...commonProps}
        disabled={
          !isOwned ||
          wyrmprintObject.equipable_count >= WYRMPRINT_MAX_EQUIPABLE_COUNT
        }
      >
        Copies +1
      </Button>
      <Button 
        key="Favorite" 
        onClick={() => onToggleIsFavorite() } 
        {...commonProps}
        disabled={
          !isOwned
        }
      >
        Toggle Favorite
      </Button>
      <Button 
        key="Max" 
        onClick={() => onMax() } 
        {...commonProps}
        disabled={
          isOwned &&
          wyrmprintObject.buildup_count >= wyrmprintDetails.maxLevel &&
          wyrmprintObject.limit_break_count >= WYRMPRINT_MAX_UNBIND_COUNT &&
          wyrmprintObject.equipable_count >= WYRMPRINT_MAX_EQUIPABLE_COUNT &&
          wyrmprintObject.hp_plus_count >= wyrmprintDetails.maxAugmentCount &&
          wyrmprintObject.attack_plus_count >= wyrmprintDetails.maxAugmentCount
        }
      >
        Max
      </Button>
    </ButtonGroup>
  );
  

}

export default AbilityCrestList_WyrmprintUpgradeButtons;