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

const MAX_AUGMENT_COUNT = 50;
const MAX_SKILL_LEVEL = 2;

function DragonList_DragonInfo({dragonKeyId, dragonMeta}) { 

  const dragonObject = useSelector(state => state.jsonData.data.dragon_list
    .find(dragonObject => dragonObject["dragon_key_id"] === dragonKeyId));

  const maybeId = dragonMeta ? dragonMeta.Id : -1;
  const albumDragonListObject = useSelector(state => state.jsonData.data.album_dragon_list
    .find(obj => obj.dragon_id === maybeId));

  const unitStoryList = useSelector(state => state.jsonData.data.unit_story_list);

  const dragonReliabilityList = useSelector(state => state.jsonData.data.dragon_reliability_list);

  let content;
  if (dragonMeta === undefined) {
    content = (<p>No Dragon selected.</p>);
  } else {

    const dragonDetails = DragaliaUtils.getDragonDetails(dragonMeta);
    const keyId = dragonObject ? dragonObject.dragon_key_id : "N/A";
    const rarity = dragonObject ? `${dragonMeta.Rarity}★` : "N/A";
    const level = dragonObject ? dragonObject.level : 0;
    const hpAugments = dragonObject ? dragonObject.hp_plus_count : 0;
    const strAugments = dragonObject ? dragonObject.attack_plus_count : 0;
    const exp = dragonObject ? dragonObject.exp : 0;
    const isLocked = dragonObject ? (dragonObject.is_lock === 1 ? "Yes" : "No") : "N/A";
    const skill1Level = dragonObject ? dragonObject.skill_1_level : 0;
    const ability1Level = dragonObject ? dragonObject.ability_1_level : 0;
    const ability2Level = dragonObject ? dragonObject.ability_2_level : 0;
    const ability2Display = dragonDetails.maxAbility2Level > 0 ?
      `${ability2Level}/${dragonDetails.maxAbility2Level}` :
      "No Ability 2";
    const unbinds = dragonObject ? dragonObject.limit_break_count : 0;
    const getTime = dragonObject ? new Date(dragonObject.get_time * 1000).toString() : "Not Obtained";

    const albumDragonListLevel = albumDragonListObject ? albumDragonListObject.max_level : 0;
    const albumDragonListUnbinds = albumDragonListObject ? albumDragonListObject.max_limit_break_count : 0;

    const storyId1 = +`${dragonMeta.BaseId}011`;
    const storyId2 = +`${dragonMeta.BaseId}012`;
    const story1Unlocked = unitStoryList.find(story => story.unit_story_id === storyId1) !== undefined;
    const story2Unlocked = unitStoryList.find(story => story.unit_story_id === storyId2) !== undefined;
    const storiesUnlockedCount = (story1Unlocked ? 1 : 0) + (story2Unlocked ? 1 : 0); 

    const dragonReliabilityObject = dragonReliabilityList.find(obj => obj.dragon_id === dragonMeta.Id);
    const reliability = dragonReliabilityObject ? dragonReliabilityObject.reliability_level : "No Bond Found";

    content = (
      <List dense>
        <ListItem key={1}>
        <Grid container justifyContent="center" spacing={1}> 
            <Grid item xs={3}><ListItemText primary={"Name"} secondary={dragonMeta.FullName} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Id"} secondary={dragonMeta.Id} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Key Id"} secondary={keyId} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Rarity"} secondary={rarity} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Level"} secondary={`${level}/${dragonDetails.maxLevel}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Exp"} secondary={`${exp}/${dragonDetails.maxExp}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Unbinds"} secondary={`${unbinds}/${dragonDetails.maxUnbindCount}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Is Locked"} secondary={isLocked} /></Grid>
            <Grid item xs={3}><ListItemText primary={"HP Augments"} secondary={`${hpAugments}/${MAX_AUGMENT_COUNT}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Strength Augments"} secondary={`${strAugments}/${MAX_AUGMENT_COUNT}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Skill Level"} secondary={`${skill1Level}/${MAX_SKILL_LEVEL}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Ability 1 Level"} secondary={`${ability1Level}/${dragonDetails.maxAbility1Level}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Ability 2 Level"} secondary={ability2Display} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Obtain time"} secondary={getTime} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Encyclopedia Max Level"} secondary={`${albumDragonListLevel}/${dragonDetails.maxLevel}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Encyclopedia Max Unbinds"} secondary={`${albumDragonListUnbinds}/${dragonDetails.maxUnbindCount}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Stories Unlocked"} secondary={`${storiesUnlockedCount}/2`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Bond Level"} secondary={reliability} /></Grid>
          </Grid>
        </ListItem>
      </List>
    );
  }

  return content;
}

export default DragonList_DragonInfo;