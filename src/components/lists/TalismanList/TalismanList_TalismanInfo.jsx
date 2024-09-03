import React, { useContext } from 'react';

import { useSelector } from 'react-redux'; 
import { MappingContext } from '../../SaveEditor';

import { Grid, List, ListItem, ListItemText, Tooltip, IconButton } from '@mui/material';
import lucawhar from '../../../assets/icons/lucawhar.png';

import JsonUtils from '../../../util/JsonUtils';
import DragaliaUtils from '../../../util/DragaliaUtils';

function TalismanList_TalismanInfo({talismanKeyId}) { 

  const talismanObject = useSelector(state => state.jsonData.data.talisman_list
    .find(talismanObject => talismanObject["talisman_key_id"] === talismanKeyId));
  
  const partyList = useSelector(state => state.jsonData.data.party_list);

  const portraitWyrmprintMap = useContext(MappingContext).portraitWyrmprintMap;
  const adventurerMap = useContext(MappingContext).adventurerMap;
  const abilityMap = useContext(MappingContext).abilityMap;

  if (talismanKeyId === null) {
    return null;
  } else {
    const talismanId = talismanObject["talisman_id"];
    const featuredCharacterId = portraitWyrmprintMap[talismanId].CharaId;
    const featuredAdventurerMeta = adventurerMap[featuredCharacterId];
    const featuredAventurerName = featuredAdventurerMeta.FullName;

    const ability1Id = talismanObject["talisman_ability_id_1"];
    const ability2Id = talismanObject["talisman_ability_id_2"];
    const ability3Id = talismanObject["talisman_ability_id_3"];

    const ability1 = ability1Id ? DragaliaUtils.getAbilityNameFormat(
      abilityMap[ability1Id], featuredAdventurerMeta) : "No Ability";
    const ability2 = ability2Id ? DragaliaUtils.getAbilityNameFormat(
      abilityMap[ability2Id], featuredAdventurerMeta) : "No Ability";
    const ability3 = ability3Id ? DragaliaUtils.getAbilityNameFormat(
      abilityMap[ability3Id], featuredAdventurerMeta) : "No Ability";
    

    const additionalHp = talismanObject["additional_hp"];
    const additionalStr = talismanObject["additional_attack"];
    
    const equippedParty = JsonUtils.getTalismanEquippedParty(partyList, talismanKeyId);
    const equippedPartyText = equippedParty == -1 ? "Not equipped" : `Party ${equippedParty}`;

    return (
      <List dense>
        <ListItem key={1}>
        <Grid container spacing={1}> 
            <Grid item xs={4}><ListItemText primary={"Featured Character"} secondary={featuredAventurerName} /></Grid>
            <Grid item xs={4}><ListItemText primary={"Bonus HP"} secondary={additionalHp} /></Grid>
            <Grid item xs={4}><ListItemText primary={"Bonus Str"} secondary={additionalStr} /></Grid>
            <Grid item xs={4}><ListItemText primary={"Ability 1"} secondary={ability1} /></Grid>
            <Grid item xs={4}><ListItemText primary={"Ability 2"} secondary={ability2} /></Grid>
            <Grid item xs={4} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
                <ListItemText primary={"Ability 3"} secondary={ability3}/>
                <Tooltip title="Portrait Wyrmprints with a 3rd ability cannot normally be obtained.">
                  <IconButton>
                    <img src={lucawhar} alt={"Ability 3 Info"} style={{ width: 30, height: 30 }} />
                  </IconButton>
                </Tooltip>
              </div>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    );
  }
}

export default TalismanList_TalismanInfo;