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
import ImageUtils from '../../../util/ImageUtils';

// Components
import { FortBonusListType } from './FortBonusList';

function FortBonusList_SingleList({ label, listType, listName }) {
  const dispatch = useDispatch();

  const bonusList = useSelector(state => state.jsonData.data.fort_bonus_list[listName]);
  if (!bonusList) {
    return "List: " + listName + " not found in this save.";
  }

  const bonusFieldName = listType === FortBonusListType.Weapon ? "weapon_type" : "elemental_type";

  const typeImgSize = 20;

  const getTypeSrc = (typeId, bonusFieldName) => {
    if (bonusFieldName === "weapon_type") {
      return ImageUtils.getWeaponTypeImage(typeId, typeImgSize);
    } else {
      return ImageUtils.getElementTypeImage(typeId, typeImgSize);
    }
  }

  const getTypeImg = (typeSrc) => {
    return <img src={typeSrc} width={typeImgSize} height={typeImgSize} />;
  }

  const round = (num) => {
    return Math.round(num * 100) / 100;
  }

  // take in a bonus list object and return a row
  const row = (bonusListObject) => {
    const typeId = bonusListObject[bonusFieldName];
    if (typeId === 99) {
      return null;
    }
    const typeImg = getTypeImg(getTypeSrc(typeId, bonusFieldName));
    const dragonDamage = listType === FortBonusListType.Element_Dragon ? (
      <div> Damage: {bonusListObject.dragon_bonus}%,&nbsp;</div>
    ) : null;
    const hp = bonusListObject.hp;
    const str = bonusListObject.attack;
    return (
      <div key={typeId} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ marginRight: '10px' }}>
          {typeImg}
        </div>
        {dragonDamage}
        <div> HP: {round(hp)}%,&nbsp;</div>
        <div>Strength: {round(str)}%</div>
      </div>
    );
  }

  const rows = bonusList.map((bonusListObject) => row(bonusListObject));

  return (
    <fieldset style={{ border: '1px solid #ccc', padding: '10px', display: 'inline-block' }}>
      <legend style={{ padding: '0 10px' }}>{label}</legend>
      <div>
        {rows}
      </div>
    </fieldset>
  );
}

export default FortBonusList_SingleList;