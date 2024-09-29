import React, { useState, useContext } from 'react';

import { useSelector, useDispatch } from 'react-redux'; 
import { setList, setObjectObject } from '../../../actions/JsonDataActions';

import { MappingContext } from '../../SaveEditor';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import JsonUtils from '../../../util/JsonUtils';
import DragaliaUtils from '../../../util/DragaliaUtils';

import param_bonus_by_weapon from '../../../assets/savedata/param_bonus_by_weapon.json';

import useDragaliaActions from '../../../util/DragaliaActionsUtils';

function WeaponList_ListMaxButton() { 
  
  const dispatch = useDispatch();
  const { addWeaponSkin, handleWeaponBuildupSkinsAll, maxTutorial } = useDragaliaActions();

  const weaponMap = useContext(MappingContext).weaponMap;
  const weaponIds = new Set(Object.keys(weaponMap).map(key => parseInt(key, 10)));

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const weaponList = useSelector(state => state.jsonData.data.weapon_body_list);

  const tutorialFlagList = useSelector(state => state.jsonData.data.user_data.tutorial_flag_list);
  const tutorialStatus = useSelector(state => state.jsonData.data.user_data.tutorial_status);

  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleMaxList = () => {
    handleClickOpen();
  };

  const handleMaxListConfirm = () => {
    // fetch getTime for each owned weapon
    const idToGetTime = JsonUtils.getFieldMapFromList(weaponList, "weapon_body_id", "gettime");
    // create a new list of every weapon, maxed out. Use existing getTimes if they were owned.
    const newWeaponList = [];
    weaponIds.forEach(weaponId => {
      const weaponMeta = weaponMap[weaponId];
      const weaponDetails = DragaliaUtils.getWeaponDetails(weaponMeta);
      const getTime = idToGetTime[weaponId] ?? null;
      newWeaponList.push(
        DragaliaUtils.getMaxedWeapon(weaponId, weaponDetails, getTime)
      );
      addWeaponSkin(weaponId);
      handleWeaponBuildupSkinsAll(weaponMeta);
    });
    dispatch(setList("weapon_body_list", newWeaponList));
    dispatch(setObjectObject("fort_bonus_list", "param_bonus_by_weapon", param_bonus_by_weapon));
    if (!DragaliaUtils.isTutorialMaxed(tutorialStatus, tutorialFlagList)) {
      maxTutorial();
    }
  }

  const tutorialWarning = DragaliaUtils.isTutorialMaxed(tutorialStatus, tutorialFlagList) ? "" 
    : "(This save file is flagged as not having completed all tutorials. Proceeding with this option will skip the tutorial.)";
  const tutorialWarningText = <>
    <br />
    <span style={{ color: 'red' }}>{tutorialWarning}</span>
  </>

  const props = {
    variant: 'contained',
    style: { backgroundColor: '#9c1e63' },
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
    <>
      <Button 
        key="Max List" 
        onClick={() => handleMaxList() } 
        disabled={
          false
        }
        {...props}
      >
        Max Weapon List
      </Button>
      <Dialog open={isDialogOpen} onClose={handleClose}>
        <DialogTitle>{"Confirm Action"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to max out all weapons?
            {tutorialWarningText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => { 
            handleClose();
            handleMaxListConfirm();
          }}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
  

}

export default WeaponList_ListMaxButton;