import React, { useState, useContext } from 'react';

import { useSelector } from 'react-redux'; 
import { MappingContext } from '../../SaveEditor';

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

const MAX_AUGMENT_COUNT = 100;
const MAX_BURST_ATTACK_LEVEL = 2;
const MAX_EX_ABILITY_LEVEL = 5;

function CharaList_CharaInfo({adventurerId, adventurerMeta}) { 

  const adventurerObject = useSelector(state => state.jsonData.data.chara_list
    .find(adventurerObject => adventurerObject["chara_id"] === adventurerId));
  
  const unitStoryList = useSelector(state => state.jsonData.data.unit_story_list);
  const charaStoryMap = useContext(MappingContext).charaStoryMap;

  let content;
  if (adventurerMeta === undefined) {
    content = (<p>No Adventurer selected.</p>);
  } else {
    const adventurerDetails = DragaliaUtils.getAdventurerDetails(adventurerMeta);
    const rarity = adventurerObject ? `${adventurerObject.rarity}★` : "N/A";
    const level = adventurerObject ? adventurerObject.level : 0;
    const hpAugments = adventurerObject ? adventurerObject.hp_plus_count : 0;
    const strAugments = adventurerObject ? adventurerObject.attack_plus_count : 0;
    const skill1Level = adventurerObject ? adventurerObject.skill_1_level : 0;
    const skill2Level = adventurerObject ? adventurerObject.skill_2_level : 0;
    const ability1Level = adventurerObject ? adventurerObject.ability_1_level : 0;
    const ability2Level = adventurerObject ? adventurerObject.ability_2_level : 0;
    const ability3Level = adventurerObject ? adventurerObject.ability_3_level : 0;
    const forceStrikeLevel = adventurerObject ? adventurerObject.burst_attack_level : 0;
    const comboUpgradeCount = adventurerObject ? adventurerObject.combo_buildup_count : 0;
    const hp = adventurerObject ? adventurerObject.hp : 0;
    const str = adventurerObject ? adventurerObject.attack : 0;
    const coabilityLevel = adventurerObject ? adventurerObject.ex_ability_level : 0;
    const exCoabilityLevel = adventurerObject ? adventurerObject.ex_ability_2_level : 0;
    const isTemporary = adventurerObject ? (adventurerObject.is_temporary === 1 ? "Yes" : "No") : "N/A";
    let hasUnlockedSharedSkill = adventurerObject ? (adventurerObject.is_unlock_edit_skill === 1 ? "Yes" : "No") : "No";
    hasUnlockedSharedSkill = adventurerDetails.hasSkillShare ? hasUnlockedSharedSkill : "No Shared Skill Available";
    const manaCircleCount = adventurerObject ? adventurerObject.mana_circle_piece_id_list.length : 0;
    const isExpired = adventurerObject ? (adventurerObject.list_view_flag === 1 ? "No" : "Yes") : "N/A";
    const getTime = adventurerObject ? new Date(adventurerObject.gettime * 1000).toString() : "Not Obtained";

    const stories = charaStoryMap[adventurerId];
    const hasStory = stories !== undefined;
    let storiesDisplay;
    if (hasStory) {
      let storiesUnlockedCount = 0;
      for (const storyId of Object.values(stories)) {
        const story = unitStoryList.find(story => story.unit_story_id === storyId);
        if (story !== undefined) {
          storiesUnlockedCount++;
        }
      }
      storiesDisplay = `${storiesUnlockedCount}/5`;
    } else {
      storiesDisplay = "Adventurer has no stories";
    }

    content = (
      <List dense>
        <ListItem key={1}>
        <Grid container justifyContent="center" spacing={1}> 
            <Grid item xs={3}><ListItemText primary={"Name"} secondary={adventurerMeta.FullName} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Id"} secondary={adventurerMeta.IdLong} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Rarity"} secondary={rarity} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Level"} secondary={`${level}/${adventurerDetails.maxLevel}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"HP Augments"} secondary={`${hpAugments}/${MAX_AUGMENT_COUNT}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Strength Augments"} secondary={`${strAugments}/${MAX_AUGMENT_COUNT}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Skill 1 Level"} secondary={`${skill1Level}/${adventurerDetails.maxSkill1Level}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Skill 2 Level"} secondary={`${skill2Level}/${adventurerDetails.maxSkill2Level}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Ability 1 Level"} secondary={`${ability1Level}/${adventurerDetails.maxAbility1Level}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Ability 2 Level"} secondary={`${ability2Level}/${adventurerDetails.maxAbility2Level}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Ability 3 Level"} secondary={`${ability3Level}/${adventurerDetails.maxAbility3Level}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Force Strike Upgrades"} secondary={`${forceStrikeLevel}/${MAX_BURST_ATTACK_LEVEL}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Combo Upgrades"} secondary={`${comboUpgradeCount}/${adventurerDetails.maxComboBuildupCount}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Base HP"} secondary={`${hp}/${adventurerDetails.maxHp}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Base Strength"} secondary={`${str}/${adventurerDetails.maxStr}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Co-ability Level"} secondary={`${coabilityLevel}/${MAX_EX_ABILITY_LEVEL}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Chain Co-ability Level"} secondary={`${exCoabilityLevel}/${MAX_EX_ABILITY_LEVEL}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Is Temporary?"} secondary={isTemporary} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Shared Skill Unlocked?"} secondary={hasUnlockedSharedSkill} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Mana Circles"} secondary={`${manaCircleCount}/${adventurerDetails.maxManaCircleCount}`} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Is Expired?"} secondary={isExpired} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Obtain time"} secondary={getTime} /></Grid>
            <Grid item xs={3}><ListItemText primary={"Stories Unlocked"} secondary={storiesDisplay} /></Grid>
          </Grid>
        </ListItem>
      </List>
    );
  }

  return content;
}

export default CharaList_CharaInfo;