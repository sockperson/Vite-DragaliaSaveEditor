// React
import React, {useState, useContext} from 'react';
import { MappingContext } from '../../SaveEditor';

// Redux
import { useSelector, useDispatch } from 'react-redux'; 
import { removeJsonDataListObject } from '../../../actions/JsonDataActions';

// MUI
import { Grid, Pagination } from '@mui/material';

// Util
import JsonUtils from '../../../util/JsonUtils';

// Enum
import { WeaponTypeId } from '../../../enum/Enums';
import { ElementTypeId } from '../../../enum/Enums';

// Components
import CharaList_ElementButtonGroup from './CharaList_ElementButtonGroup';
import CharaList_WeaponTypeButtonGroup from './CharaList_WeaponTypeButtonGroup';
import CharaList_CharaSelectButton from './CharaList_CharaSelectButton';
import CharaList_CharaInfo from './CharaList_CharaInfo';
import CharaList_CharaUpgradeButtons from './CharaList_CharaUpgradeButtons';
import CharaList_ListMaxButton from './CharaList_ListMaxButton';

function CharaList() {

  const [activeAdventurerId, setActiveAdventurerId] = useState(undefined);
  const [activeWeaponType, setActiveWeaponType] = useState(WeaponTypeId.SWORD);
  const [activeElementType, setActiveElementType] = useState(ElementTypeId.FLAME);

  const adventurerMap = useContext(MappingContext).adventurerMap;
  const allAdventurersList = Object.values(adventurerMap);

  const getFilteredAdventurers = () => {
    const filteredPossibleAdventurerIds = JsonUtils.filteredAdventurerList(
      allAdventurersList, activeElementType, activeWeaponType).map(adventurer => adventurer.IdLong);
    if (filteredPossibleAdventurerIds.length !== 0) {
      return (
        <Grid container spacing={2} style={{ justifyContent: "flex-start" }}>
          {Array.from(filteredPossibleAdventurerIds).map(id => {
            const adventurerMeta = adventurerMap[id];
            const isActive = adventurerMeta ? (activeAdventurerId === id) : false;
            return (
              <Grid item xs={3} sm={3} md={2} lg={2} xl={2} style={{ width: "20%" }} key={id}>
                <CharaList_CharaSelectButton
                  charaId={id}
                  adventurerMeta={adventurerMeta}
                  isActive={isActive}
                  onSetActiveAdventurerId={setActiveAdventurerId}
                />
              </Grid>
            );
          })}
        </Grid>
      );
    } else {
      return (
        <p>No adventurers found :)</p>
      );
    }
  }

  const getActiveAdventurer = () => {
    const adventurerMeta = adventurerMap[activeAdventurerId]
    return (
      <CharaList_CharaInfo
        adventurerId={activeAdventurerId}
        adventurerMeta={adventurerMeta}
      />
    );
  }

  const getUpgradeOptions = () => {
    const adventurerMeta = adventurerMap[activeAdventurerId]
    if (activeAdventurerId == undefined) {
      return <div></div>
    } else {
      return (
        <CharaList_CharaUpgradeButtons
          adventurerId={activeAdventurerId}
          adventurerMeta={adventurerMeta}
        />
      );
    }
  }

  return (
    <div>
        <div style={{ marginTop: '20px' }}>
            <CharaList_ListMaxButton />
        </div>
        <div style={{ marginTop: '20px' }}>
            <CharaList_ElementButtonGroup 
                onSetActiveElement={setActiveElementType} 
                activeElement={activeElementType} 
            />
        </div>
        <div>
            <CharaList_WeaponTypeButtonGroup 
                onSetActiveWeaponType={setActiveWeaponType} 
                activeWeaponType={activeWeaponType} 
            />
        </div>
        {getFilteredAdventurers()}
        <div style={{ marginTop: '20px' }}>
            {getActiveAdventurer()}
        </div>
        <div style={{ marginTop: '20px' }}>
            {getUpgradeOptions()}
        </div>
    </div>
  );
}

export default CharaList;