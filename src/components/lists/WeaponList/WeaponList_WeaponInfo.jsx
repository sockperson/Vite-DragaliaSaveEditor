import React, { useState } from 'react';

import { useSelector } from 'react-redux'; 

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { WeaponSeries } from '../../../enum/Enums';

import ImageUtils from '../../../util/ImageUtils';
import DragaliaUtils from '../../../util/DragaliaUtils';

import notteWtfIcon from '../../../assets/icons/nottewtf.png';

function WeaponList_WeaponInfo({weaponId, weaponMeta}) { 

  const weaponObject = useSelector(state => state.jsonData.data.weapon_body_list
    .find(weaponObject => weaponObject["weapon_body_id"] === weaponId));
  
  let content;
  if (weaponMeta === undefined) {
    content = (<p>No weapon selected.</p>);
  } else {
    const weaponDetails = DragaliaUtils.getWeaponDetails(weaponMeta);
    const level = weaponObject ? weaponObject.buildup_count : 0;
    const unbindCount = weaponObject ? weaponObject.limit_break_count : 0;
    const refineCount = weaponObject ? weaponObject.limit_over_count : 0;
    const copies = weaponObject ? weaponObject.equipable_count : 0;
    const bonusFiveStarSlotCount = weaponObject ? weaponObject.additional_crest_slot_type_1_count : 0;
    const bonusSindomSlotCount = weaponObject ? weaponObject.additional_crest_slot_type_3_count : 0;
    const unlockedWeaponBonus = weaponObject ? weaponObject.fort_passive_chara_weapon_buildup_count : 0;
    const getTime = weaponObject ? new Date(weaponObject.gettime * 1000).toString() : "Not Obtained";
    content = (
      <List dense>
        <ListItem key={1}>
        <Grid container justifyContent="center" spacing={1}> 
            <Grid item xs={4}><ListItemText primary={"Name"} secondary={weaponDetails.name} /></Grid>
            <Grid item xs={4}><ListItemText primary={"Id"} secondary={weaponDetails.id} /></Grid>
            <Grid item xs={4}><ListItemText primary={"Rarity"} secondary={`${weaponDetails.rarity}★`} /></Grid>
            <Grid item xs={4}><ListItemText primary={"Level"} secondary={`${level}/${weaponDetails.maxLevel}`} /></Grid>
            <Grid item xs={4}><ListItemText primary={"Unbinds"} secondary={`${unbindCount}/${weaponDetails.maxUnbindCount}`} /></Grid>
            {weaponDetails.maxRefineCount > 0 ? (
              <Grid item xs={4}><ListItemText primary={"Refine Count"} secondary={`${refineCount}/${weaponDetails.maxRefineCount}`} /></Grid>
            ) : null}
            <Grid item xs={4}><ListItemText primary={"Copies"} secondary={`${copies}/${weaponDetails.maxCopies}`} /></Grid>
            {weaponDetails.maxBonusFiveStarSlotCount > 0 ? (
              <Grid item xs={4}><ListItemText primary={"Bonus 5★ Wyrmprint Slot Count"} secondary={`${bonusFiveStarSlotCount}/${weaponDetails.maxBonusFiveStarSlotCount}`} /></Grid>
            ): null}
            {weaponDetails.maxBonusSindomSlotCount > 0 ? (
              <Grid item xs={4}><ListItemText primary={"Bonus Sinister Dominion Wyrmprint Slot Count"} secondary={`${bonusSindomSlotCount}/${weaponDetails.maxBonusSindomSlotCount}`} /></Grid>
            ): null}
            {weaponDetails.canHaveWeaponBonus ? (
              <Grid item xs={4}><ListItemText primary={"Unlocked Weapon Bonus?"} secondary={unlockedWeaponBonus ? "Yes" : "No"} /></Grid>
            ) : null}
            <Grid item xs={4}><ListItemText primary={"Obtain time"} secondary={getTime} /></Grid>
          </Grid>
        </ListItem>
      </List>
    );
  }

  return content;
}

export default WeaponList_WeaponInfo;