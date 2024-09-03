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

// Components
import FortBonusList_SingleList from './FortBonusList_SingleList';

export const FortBonusListType = Object.freeze({
  Weapon: 0,
  Element: 1,
  Element_Dragon: 2,
});

function FortBonusList() {
  const bonusLists = [
    <FortBonusList_SingleList 
        label="Facilities (Weapons)" 
        listType={FortBonusListType.Weapon} 
        listName="param_bonus" 
    />,
    <FortBonusList_SingleList 
      label="Facilities (Elements)" 
      listType={FortBonusListType.Element} 
      listName="element_bonus" 
    />,
    <FortBonusList_SingleList 
      label="Facility (Dragons)" 
      listType={FortBonusListType.Element_Dragon} 
      listName="dragon_bonus" 
    />,
    <FortBonusList_SingleList 
      label="Weapon Bonuses" 
      listType={FortBonusListType.Weapon} 
      listName="param_bonus_by_weapon" 
    />,
    <FortBonusList_SingleList 
      label="Encyclopedia (Elements)" 
      listType={FortBonusListType.Element} 
      listName="chara_bonus_by_album" 
    />,
    <FortBonusList_SingleList 
      label="Encyclopedia (Dragons)" 
      listType={FortBonusListType.Element} 
      listName="dragon_bonus_by_album" 
    />
  ];

  return (
    <Grid container spacing={2}>
      {bonusLists.map((bonusList, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          {bonusList}
        </Grid>
      ))}
    </Grid>
  );
}

export default FortBonusList;