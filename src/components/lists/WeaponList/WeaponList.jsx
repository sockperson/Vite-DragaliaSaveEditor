import React, {useState, useContext} from 'react';
import { MappingContext } from '../../SaveEditor';

import { Grid } from '@mui/material';

import JsonUtils from '../../../util/JsonUtils';

import { WeaponTypeId } from '../../../enum/Enums';
import { WeaponSeries } from '../../../enum/Enums';

import WeaponList_WeaponTypeButtonGroup from './WeaponList_WeaponTypeButtonGroup';
import WeaponList_WeaponSeriesButtonGroup from './WeaponList_WeaponSeriesButtonGroup';
import WeaponList_WeaponSelectButton from './WeaponList_WeaponSelectButton';
import WeaponList_WeaponInfo from './WeaponList_WeaponInfo';
import WeaponList_WeaponUpgradeButtons from './WeaponList_WeaponUpgradeButtons';
import WeaponList_ListMaxButton from './WeaponList_ListMaxButton';

function WeaponList() {

  const [activeWeaponType, setActiveWeaponType] = useState(WeaponTypeId.SWORD);
  const [activeWeaponSeries, setActiveWeaponSeries] = useState(WeaponSeries.CORE);
  const [activeWeaponId, setActiveWeaponId] = useState(undefined);

  const weaponMap = useContext(MappingContext).weaponMap;
  const weaponSkinMap = useContext(MappingContext).weaponSkinMap;
  const allWeaponsList = Object.values(weaponMap);

  const onSetActiveWeaponType = (weaponType) => { setActiveWeaponType(weaponType); }
  const onSetActiveWeaponSeries = (weaponSeries) => { setActiveWeaponSeries(weaponSeries); }
  const onSetActiveWeaponId = (weaponId) => { setActiveWeaponId(weaponId); }
  
  const getFilteredWeapons = () => {
    const filteredPossibleWeaponIds = JsonUtils.filteredWeaponList(
      allWeaponsList, activeWeaponType, activeWeaponSeries).map(weapon => weapon.Id);
    if (filteredPossibleWeaponIds.length !== 0) {
      return (
        <Grid container spacing={2} style={{ justifyContent: "flex-start" }}>
          {Array.from(filteredPossibleWeaponIds).map(id => {
            const weaponMeta = weaponMap[id];
            const weaponSkinMeta = weaponMeta ? (weaponSkinMap[id]) : undefined;
            const isActive = weaponMeta ? (activeWeaponId === id) : false;
            return (
              <Grid item xs style={{ width: "20%" }} key={id}>
                <WeaponList_WeaponSelectButton
                  weaponId={id}
                  weaponMeta={weaponMeta}
                  weaponSkinMeta={weaponSkinMeta}
                  isActive={isActive}
                  onSetActiveWeaponId={onSetActiveWeaponId}
                />
              </Grid>
            );
          })}
        </Grid>
      );
    } else {
      return (
        <p>No weapons found :)</p>
      );
    }
  }

  const getActiveWeapon = () => {
    const weaponMeta = weaponMap[activeWeaponId]
    const weaponSkinMeta = weaponMeta ? (weaponSkinMap[weaponMeta.Id]) : undefined;
    return (
      <WeaponList_WeaponInfo
        weaponId={activeWeaponId}
        weaponMeta={weaponMeta}
      />
    );
  }

  const getUpgradeOptions = () => {
    const weaponMeta = weaponMap[activeWeaponId]
    if (activeWeaponId == undefined) {
      return <div></div>
    } else {
      return (
        <WeaponList_WeaponUpgradeButtons
          weaponId={activeWeaponId}
          weaponMeta={weaponMeta}
        />
      );
    }
  }

  //TODO
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
      <WeaponList_ListMaxButton/>
      </div>
      <WeaponList_WeaponTypeButtonGroup onSetActiveWeaponType={onSetActiveWeaponType}/>
      <div style={{ marginTop: '20px' }}>
        <WeaponList_WeaponSeriesButtonGroup onSetActiveWeaponSeries={onSetActiveWeaponSeries}/>
      </div>
      <div style={{ marginTop: '20px' }}>
        {getFilteredWeapons()}
      </div>
      <div style={{ marginTop: '20px' }}>
        {getActiveWeapon()}
      </div>
      <div style={{ marginTop: '20px' }}>
        {getUpgradeOptions()}
      </div>
    </div>
  );
}

export default WeaponList;