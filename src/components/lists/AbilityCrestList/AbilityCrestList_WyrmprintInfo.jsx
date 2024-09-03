import React from 'react';

import { useSelector } from 'react-redux'; 

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

import DragaliaUtils from '../../../util/DragaliaUtils';

function AbilityCrestList_WyrmprintInfo({wyrmprintId, wyrmprintMeta}) { 

  const wyrmprintObject = useSelector(state => state.jsonData.data.ability_crest_list
    .find(wyrmprintObject => wyrmprintObject["ability_crest_id"] === wyrmprintId));
    
  let content;
  if (wyrmprintMeta === undefined) {
    content = (<p>No Wyrmprint selected.</p>);
  } else {
    const wyrmprintDetails = DragaliaUtils.getWyrmprintDetails(wyrmprintMeta);
    const level = wyrmprintObject ? wyrmprintObject.buildup_count : 0;
    const unbindCount = wyrmprintObject ? wyrmprintObject.limit_break_count : 0;
    const copies = wyrmprintObject ? wyrmprintObject.equipable_count : 0;
    const hpAugments = wyrmprintObject ? wyrmprintObject.hp_plus_count : 0;
    const strAugments = wyrmprintObject ? wyrmprintObject.attack_plus_count : 0;
    const isNew = wyrmprintObject?.is_new ? "Yes" : "No";
    const isFavorite = wyrmprintObject?.is_favorite ? "Yes" : "No";
    const getTime = wyrmprintObject ? new Date(wyrmprintObject.gettime * 1000).toString() : "Not Obtained";
    const rarity = wyrmprintMeta.Rarity === 9 ? "SinDom" : (`${wyrmprintMeta.Rarity}★`);
    content = (
      <List dense>
        <ListItem key={1}>
        <Grid container justifyContent="center" spacing={1}> 
            <Grid item xs={4}><ListItemText primary={"Name"} secondary={wyrmprintMeta.Name} /></Grid>
            <Grid item xs={4}><ListItemText primary={"Id"} secondary={wyrmprintMeta.Id} /></Grid>
            <Grid item xs={4}><ListItemText primary={"Rarity"} secondary={rarity} /></Grid>
            <Grid item xs={4}><ListItemText primary={"Level"} secondary={`${level}/${wyrmprintDetails.maxLevel}`} /></Grid>
            <Grid item xs={4}><ListItemText primary={"Unbinds"} secondary={`${unbindCount}/4`} /></Grid>
            <Grid item xs={4}><ListItemText primary={"Copies"} secondary={`${copies}/4`} /></Grid>
            <Grid item xs={4}><ListItemText primary={"HP Augments"} secondary={`${hpAugments}/${wyrmprintDetails.maxAugmentCount}`} /></Grid>
            <Grid item xs={4}><ListItemText primary={"Strength Augments"} secondary={`${strAugments}/${wyrmprintDetails.maxAugmentCount}`} /></Grid>
            <Grid item xs={4}><ListItemText primary={"Obtain Time"} secondary={getTime} /></Grid>
            <Grid item xs={4}><ListItemText primary={"Is Favorite"} secondary={isFavorite} /></Grid>
            <Grid item xs={4}><ListItemText primary={"Is New?"} secondary={isNew} /></Grid>
          </Grid>
        </ListItem>
      </List>
    );
  }

  return content;
}

export default AbilityCrestList_WyrmprintInfo;