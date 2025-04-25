import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { updateJsonDataListField, addJsonDataListObject,
  replaceJsonDataListObject, removeJsonDataListObject, addToObjectListObjectField } from '../../../actions/JsonDataActions';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';

import DragaliaUtils from '../../../util/DragaliaUtils';
import useDragaliaActions from '../../../util/DragaliaActionsUtils';

import ImageUtils from '../../../util/ImageUtils';
import { StatType } from '../../../enum/Enums';

import notteWtfIcon from '../../../assets/icons/nottewtf.png';

const MAX_AUGMENT_COUNT = 100;

function CharaList_CharaUpgradeButtons({adventurerId, adventurerMeta}) {

  const dispatch = useDispatch();
  const { addAdventurerStory, removeAdventurerStory, maxAdventurer } = useDragaliaActions();

  const adventurerObject = useSelector(state => state.jsonData.data.chara_list
    .find(adventurerObject => adventurerObject["chara_id"] === adventurerId));

  const isOwned = adventurerObject ? true : false;

  const onGet = () => {
    const newAdventurerObject = DragaliaUtils.getNewAdventurer(adventurerMeta);
    dispatch(addJsonDataListObject("chara_list", newAdventurerObject));
    addAdventurerStory(adventurerId, true);
    dispatch(addToObjectListObjectField(
      "fort_bonus_list", "chara_bonus_by_album", "elemental_type",
      adventurerMeta.ElementalTypeId, "hp", 0.1));
    dispatch(addToObjectListObjectField(
      "fort_bonus_list", "chara_bonus_by_album", "elemental_type",
      adventurerMeta.ElementalTypeId, "attack", 0.1));
  }

  const onRemove = () => {
    const MEGA_MAN = 10750102;
    const PRINCE = 10140101;

    if (adventurerId === MEGA_MAN || adventurerId === PRINCE) {
      return;
    }

    dispatch(removeJsonDataListObject("chara_list", "chara_id", adventurerId));
    removeAdventurerStory(adventurerId);

    dispatch(addToObjectListObjectField(
      "fort_bonus_list", "chara_bonus_by_album", "elemental_type",
      adventurerMeta.ElementalTypeId, "hp", -0.1));
    dispatch(addToObjectListObjectField(
      "fort_bonus_list", "chara_bonus_by_album", "elemental_type",
      adventurerMeta.ElementalTypeId, "attack", -0.1));
  }

  const onMax = () => {
    maxAdventurer(adventurerId, adventurerObject);
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
    dispatch(updateJsonDataListField("chara_list",
      "chara_id", adventurerId, field, MAX_AUGMENT_COUNT));
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
        Get
      </Button>
      <Button
        key="Remove"
        onClick={() => onRemove() }
        disabled={
          !isOwned || [10750102, 10140101].includes(adventurerId)
        }
        {...commonProps}
      >
        Remove
      </Button>
      <Button
        key="max_hp_augments"
        onClick={() => onMaxAugments(StatType.HP) }
        {...commonProps}
        disabled={
          !isOwned ||
          adventurerObject.hp_plus_count >= MAX_AUGMENT_COUNT
        }
      >
        Max HP Augments
      </Button>
      <Button
        key="max_str_augments"
        onClick={() => onMaxAugments(StatType.STRENGTH) }
        {...commonProps}
        disabled={
          !isOwned ||
          adventurerObject.attack_plus_count >= MAX_AUGMENT_COUNT
        }
      >
        Max Strength Augments
      </Button>
      <Button
        key="max"
        onClick={() => onMax() }
        {...commonProps}
        disabled={
          DragaliaUtils.isAdventurerMaxed(adventurerObject, adventurerMeta)
        }
      >
        Max
      </Button>
    </ButtonGroup>
  );


}

export default CharaList_CharaUpgradeButtons;