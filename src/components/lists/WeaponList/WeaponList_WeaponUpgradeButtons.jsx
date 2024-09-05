import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux'; 
import { updateJsonDataListField, addJsonDataListObject, 
  replaceJsonDataListObject, addToObjectListObjectField } from '../../../actions/JsonDataActions';

import { WeaponBuildupPieceType } from '../../../enum/Enums';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';

import DragaliaUtils from '../../../util/DragaliaUtils';

import ImageUtils from '../../../util/ImageUtils';

import notteWtfIcon from '../../../assets/icons/nottewtf.png';

import useDragaliaActions from '../../../util/DragaliaActionsUtils';

function WeaponList_WeaponSelectButton({weaponId, weaponMeta}) { 
  
  const dispatch = useDispatch();
  const { addWeaponSkin, handleWeaponBuildupSkins, handleWeaponBuildupSkinsAll } = useDragaliaActions();

  const weaponObject = useSelector(state => state.jsonData.data.weapon_body_list
    .find(weaponObject => weaponObject["weapon_body_id"] === weaponId));
  
  const isOwned = weaponObject ? true : false;
    
  const weaponDetails = DragaliaUtils.getWeaponDetails(weaponMeta);

  const weaponLevelCap = weaponObject ? 
    DragaliaUtils.getWeaponLevelCap(weaponMeta, weaponObject.limit_break_count) :
    -1;

  const weaponUnbindCap = weaponObject ?
    DragaliaUtils.getWeaponUnbindCap(weaponObject.limit_over_count) :
    -1;

  const onCraft = () => {
    const newWeaponObject = DragaliaUtils.getNewWeapon(weaponId);
    dispatch(addJsonDataListObject("weapon_body_list", newWeaponObject));
    addWeaponSkin(weaponId);
  }

  const onLevelup = (levelupCount) => {
    const level = weaponObject.buildup_count;
    const newLevel = Math.min(level + levelupCount, weaponLevelCap);
    dispatch(updateJsonDataListField("weapon_body_list", 
      "weapon_body_id", weaponId, "buildup_count", newLevel));
  }

  const onUnbind = () => { 
    const unbinds = weaponObject.limit_break_count;
    const newUnbinds = Math.min(unbinds + 1, weaponDetails.maxUnbindCount, weaponUnbindCap);
    dispatch(updateJsonDataListField("weapon_body_list", 
      "weapon_body_id", weaponId, "limit_break_count", newUnbinds));
    handleWeaponBuildupSkins(weaponMeta, WeaponBuildupPieceType.UNBIND, newUnbinds);
  }

  const onRefine = () => {
    const refines = weaponObject.limit_over_count;
    const newRefines = Math.min(refines + 1, weaponDetails.maxRefineCount);
    dispatch(updateJsonDataListField("weapon_body_list", 
      "weapon_body_id", weaponId, "limit_over_count", newRefines));
    handleWeaponBuildupSkins(weaponMeta, WeaponBuildupPieceType.REFINEMENT, newRefines);
  }

  const onAddCopies = () => {
    const copies = weaponObject.equipable_count;
    const newCopies = Math.min(copies + 1, weaponDetails.maxCopies);
    dispatch(updateJsonDataListField("weapon_body_list", 
      "weapon_body_id", weaponId, "equipable_count", newCopies));
  }

  const onUnlockWeaponBonus = () => {
    dispatch(updateJsonDataListField("weapon_body_list", 
      "weapon_body_id", weaponId, "fort_passive_chara_weapon_buildup_count", 1));
    handleWeaponBonus();
  }

  const onUnlockFiveStarSlot = () => {
    const slotCount = weaponObject.additional_crest_slot_type_1_count;
    const newSlotCount = Math.min(slotCount + 1, weaponDetails.maxBonusFiveStarSlotCount);
    dispatch(updateJsonDataListField("weapon_body_list", 
      "weapon_body_id", weaponId, "additional_crest_slot_type_1_count", newSlotCount));
  }

  const onUnlockSindomSlot = () => {
    const slotCount = weaponObject.additional_crest_slot_type_3_count;
    const newSlotCount = Math.min(slotCount + 1, weaponDetails.maxBonusSindomSlotCount);
    dispatch(updateJsonDataListField("weapon_body_list", 
      "weapon_body_id", weaponId, "additional_crest_slot_type_3_count", newSlotCount));
  }

  const onMax = () => {
    handleWeaponBonus();
    handleWeaponBuildupSkinsAll(weaponMeta);
    if (!isOwned) {
      const newWeaponObject = DragaliaUtils.getMaxedWeapon(weaponId, weaponDetails, null);
      dispatch(addJsonDataListObject("weapon_body_list", newWeaponObject));
      addWeaponSkin(weaponId);
    } else {
      const newWeaponObject = DragaliaUtils.getMaxedWeapon(weaponId, weaponDetails, weaponObject.gettime);
      dispatch(replaceJsonDataListObject("weapon_body_list", "weapon_body_id", newWeaponObject));
    }
  }

  const handleWeaponBonus = () => {
    const weaponBonus = DragaliaUtils.getWeaponBonus(weaponMeta);
    const hasWeaponBonus = (weaponObject?.fort_passive_chara_weapon_buildup_count ?? 0) === 1;
    if (weaponBonus > 0 && !hasWeaponBonus) {
      dispatch(addToObjectListObjectField(
        "fort_bonus_list", "param_bonus_by_weapon", "weapon_type", 
        weaponMeta.WeaponTypeId, "hp", weaponBonus));
      dispatch(addToObjectListObjectField(
        "fort_bonus_list", "param_bonus_by_weapon", "weapon_type", 
        weaponMeta.WeaponTypeId, "attack", weaponBonus));
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
        key="craft" 
        onClick={() => onCraft() } 
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
          weaponObject.buildup_count >= weaponDetails.maxLevel ||
          weaponObject.buildup_count >= weaponLevelCap
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
          weaponObject.buildup_count >= weaponDetails.maxLevel ||
          weaponObject.buildup_count >= weaponLevelCap
        }
      >
        Level +10
      </Button>
      <Button 
        key="Unbind" 
        onClick={() => onUnbind() } 
        {...commonProps}
        disabled={
          !isOwned ||
          weaponObject.limit_break_count >= weaponDetails.maxUnbindCount ||
          weaponObject.limit_break_count >= weaponUnbindCap
        }
      >
        Unbind
      </Button>
      <Button 
        key="Refine" 
        onClick={() => onRefine() } 
        {...commonProps}
        disabled={
          !isOwned ||
          weaponObject.limit_over_count >= weaponDetails.maxRefineCount
        }
      >
        Refine
      </Button>
      <Button 
        key="Copies +1" 
        onClick={() => onAddCopies() } 
        {...commonProps}
        disabled={
          !isOwned ||
          weaponObject.equipable_count >= weaponDetails.maxCopies
        }
      >
        Copies +1
      </Button>
      <Button 
        key="Weapon Bonus" 
        onClick={() => onUnlockWeaponBonus() } 
        {...commonProps}
        disabled={
          !isOwned ||
          !weaponDetails.canHaveWeaponBonus ||
          weaponObject.fort_passive_chara_weapon_buildup_count === 1 ||
          weaponObject.limit_break_count < weaponDetails.maxUnbindCount
        }
      >
        Unlock Weapon Bonus
      </Button>
      <Button 
        key="5 slot" 
        onClick={() => onUnlockFiveStarSlot() } 
        {...commonProps}
        disabled={
          !isOwned ||
          weaponObject.additional_crest_slot_type_1_count >= weaponDetails.maxBonusFiveStarSlotCount
        }
      >
        Unlock 5★ Slot
      </Button>
      <Button 
        key="6 slot" 
        onClick={() => onUnlockSindomSlot() } 
        {...commonProps}
        disabled={
          !isOwned ||
          weaponObject.additional_crest_slot_type_3_count >= weaponDetails.maxBonusSindomSlotCount
        }
      >
        Unlock SinDom Slot
      </Button>
      <Button 
        key="max" 
        onClick={() => onMax() } 
        {...commonProps}
        disabled={
          isOwned &&
          weaponObject.buildup_count >= weaponDetails.maxLevel &&
          weaponObject.limit_break_count >= weaponDetails.maxUnbindCount &&
          weaponObject.limit_over_count >= weaponDetails.maxRefineCount &&
          weaponObject.equipable_count >= weaponDetails.maxCopies &&
          (!weaponDetails.canHaveWeaponBonus || weaponObject.fort_passive_chara_weapon_buildup_count === 1) &&
          weaponObject.additional_crest_slot_type_1_count >= weaponDetails.maxBonusFiveStarSlotCount &&
          weaponObject.additional_crest_slot_type_3_count >= weaponDetails.maxBonusSindomSlotCount
        }
      >
        Max
      </Button>
    </ButtonGroup>
  );
  

}

export default WeaponList_WeaponSelectButton;