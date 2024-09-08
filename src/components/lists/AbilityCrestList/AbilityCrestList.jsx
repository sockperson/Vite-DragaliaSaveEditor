import React, {useState, useContext} from 'react';
import { MappingContext } from '../../SaveEditor';

import { Grid } from '@mui/material';

import JsonUtils from '../../../util/JsonUtils';

import { WyrmprintAvailability, WyrmprintSearchType } from '../../../enum/Enums';

import AbilityCrestList_WyrmprintSearchTypeButtonGroup from './AbilityCrestList_WyrmprintSearchTypeButtonGroup';
import AbilityCrestList_WyrmprintNameAutocomplete from './AbilityCrestList_WyrmprintNameAutocomplete';
import AbilityCrestList_WyrmprintCharacterAutocomplete from './AbilityCrestList_WyrmprintCharacterAutocomplete';
import AbilityCrestList_WyrmprintRarityButtonGroup from './AbilityCrestList_WyrmprintRarityButtonGroup';
import AbilityCrestList_WyrmprintAvailabilityButtonGroup from './AbilityCrestList_WyrmprintAvailabilityButtonGroup';
import AbilityCrestList_WyrmprintSelectButton from './AbilityCrestList_WyrmprintSelectButton';
import AbilityCrestList_WyrmprintInfo from './AbilityCrestList_WyrmprintInfo';
import AbilityCrestList_WyrmprintUpgradeButtons from './AbilityCrestList_WyrmprintUpgradeButtons';
import AbilityCrestList_ListMaxButton from './AbilityCrestList_ListMaxButton';

function AbilityCrestList() {

  const [activeWyrmprintSearchType, onSetActiveWyrmprintSearchType] = useState(WyrmprintSearchType.NAME);

  // search by icon
  const [activeWyrmprintRarity, setActiveWyrmprintRarity] = useState(2);
  const [activeWyrmprintAvailability, setActiveWyrmprintAvailability] = useState(WyrmprintAvailability.PERMANENT);

  // search by character
  const [activeCharacterName, setActiveCharacterName] = useState('Notte');

  const [activeWyrmprintId, setActiveWyrmprintId] = useState(40090010); // hawk print

  const wyrmprintMap = useContext(MappingContext).wyrmprintMap;
  const allWyrmprintList = Object.values(wyrmprintMap);
  const allWyrmprintNames = allWyrmprintList.map(wyrmprint => wyrmprint.Name);

  const allFeaturedCharacters = Array.from(
    new Set(allWyrmprintList.flatMap(wyrmprint => wyrmprint.FeaturedCharacters))
  );

  const nameToIdMap = Object.entries(wyrmprintMap).reduce((acc, [id, wyrmprint]) => {
    acc[wyrmprint.Name] = id;
    return acc;
  }, {});

  const onSetActiveWyrmprintRarity = (wyrmprintRarity) => { setActiveWyrmprintRarity(wyrmprintRarity); }
  const onSetActiveWyrmprintAvailability = (wyrmprintAvailability) => { setActiveWyrmprintAvailability(wyrmprintAvailability); }
  const onSetActiveWyrmprintId = (wyrmprintId) => { setActiveWyrmprintId(wyrmprintId); }
  const onSetActiveWyrmprintIdByName = (wyrmprintName) => { 
    const wyrmprintId = parseInt(nameToIdMap[wyrmprintName]);
    setActiveWyrmprintId(wyrmprintId);
  }
  const onSetActiveCharacterName = (characterName) => { setActiveCharacterName(characterName); }
  
  
  const getFilteredWyrmprints = () => {
    let filteredPossibleWyrmprintIds;
    switch (activeWyrmprintSearchType) {
      case WyrmprintSearchType.NAME:
        return null;
      case WyrmprintSearchType.ICON:
        filteredPossibleWyrmprintIds = JsonUtils.filteredWyrmprintListByRarityAvailability(
          allWyrmprintList, activeWyrmprintRarity, activeWyrmprintAvailability).map(wyrmprint => wyrmprint.Id
        );
        break;
      case WyrmprintSearchType.CHARACTER:
        filteredPossibleWyrmprintIds = JsonUtils.filteredWyrmprintListByCharacter(
          allWyrmprintList, activeCharacterName).map(wyrmprint => wyrmprint.Id
        );
        break;
    }

    if (filteredPossibleWyrmprintIds.length !== 0) {
      return (
        <Grid container spacing={1} style={{ justifyContent: "flex-start" }}>
          {Array.from(filteredPossibleWyrmprintIds).map(id => {
            const wyrmprintMeta = wyrmprintMap[id];
            const isActive = wyrmprintMeta ? (activeWyrmprintId === id) : false;
            return (
              <Grid item xs style={{ width: "15%" }} key={id}>
                <AbilityCrestList_WyrmprintSelectButton
                  wyrmprintId={id}
                  wyrmprintMeta={wyrmprintMeta}
                  isActive={isActive}
                  onSetActiveWyrmprintId={onSetActiveWyrmprintId}
                />
              </Grid>
            );
          })}
        </Grid>
      );
    } else {
      return (
        <p>No Wyrmprints found :)</p>
      );
    }
  } 

  const getActiveWyrmprint = () => {
    const wyrmprintMeta = wyrmprintMap[activeWyrmprintId]
    return (
      <AbilityCrestList_WyrmprintInfo
        wyrmprintId={activeWyrmprintId}
        wyrmprintMeta={wyrmprintMeta}
      />
    );
  }

  const getWyrmprintSelector = () => {
    switch (activeWyrmprintSearchType) {
      case WyrmprintSearchType.NAME:
        return (
          <div style={{ marginTop: '20px' }}>
            <AbilityCrestList_WyrmprintNameAutocomplete
              activeWyrmprintMeta={wyrmprintMap[activeWyrmprintId]}
              onSetActiveWyrmprintIdByName={onSetActiveWyrmprintIdByName}
              wyrmprintNameList={allWyrmprintNames}
            />
          </div>
        );
      case WyrmprintSearchType.ICON:
        return (
          <div style={{ marginTop: '20px' }}>
            <AbilityCrestList_WyrmprintRarityButtonGroup onSetActiveWyrmprintRarity={onSetActiveWyrmprintRarity}/>
            <div style={{ marginTop: '20px' }}>
            <AbilityCrestList_WyrmprintAvailabilityButtonGroup onSetActiveWyrmprintAvailability={onSetActiveWyrmprintAvailability}/>
            </div>
          </div>
        );
      case WyrmprintSearchType.CHARACTER:
        return (
          <div style={{ marginTop: '20px' }}>
            <AbilityCrestList_WyrmprintCharacterAutocomplete
              onSetActiveCharacterName={onSetActiveCharacterName}
              featuredCharacterList={allFeaturedCharacters}
            />
          </div>
        );
    }
  }

  const getUpgradeOptions = () => {
    const wyrmprintMeta = wyrmprintMap[activeWyrmprintId]
    if (activeWyrmprintId == undefined) {
      return <div></div>
    } else {
      return (
        <AbilityCrestList_WyrmprintUpgradeButtons
          wyrmprintId={activeWyrmprintId}
          wyrmprintMeta={wyrmprintMeta}
        />
      );
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
      <AbilityCrestList_ListMaxButton/>
      </div>
      <AbilityCrestList_WyrmprintSearchTypeButtonGroup onSetActiveWyrmprintSearchType={onSetActiveWyrmprintSearchType}/>
      {getWyrmprintSelector()}
      <div style={{ marginTop: '20px' }}>
        {getFilteredWyrmprints()}
      </div>
      <div style={{ marginTop: '20px' }}>
        {getActiveWyrmprint()}
      </div>
      <div style={{ marginTop: '20px' }}>
        {getUpgradeOptions()}
      </div>
    </div>
  );
}

export default AbilityCrestList;