import React, {useState, useContext} from 'react';
import { MappingContext } from '../../SaveEditor';
import { useSelector, useDispatch } from 'react-redux'; 
import { removeJsonDataListObject } from '../../../actions/JsonDataActions';

import { Grid, Pagination } from '@mui/material';

// Enum
import { ElementTypeId } from '../../../enum/Enums';
import { DragonSellAmounts } from '../../../definitions/Definitions';

// Components
import DragonList_ElementButtonGroup from './DragonList_ElementButtonGroup';
import DragonList_DragonSelectButton from './DragonList_DragonSelectButton';
import DragonList_DragonInfo from './DragonList_DragonInfo';
import DragonList_DragonUpgradeButtons from './DragonList_DragonUpgradeButtons';
import DragonList_DragonCreator from './DragonList_DragonCreator';

// Actions
import { addJsonDataListObjectField } from '../../../actions/JsonDataActions';

import JsonUtils from '../../../util/JsonUtils';

const ITEMS_PER_PAGE = 25;
const DRAGON_LIST_MAX_CAPACITY = 500;

function DragonList() {
  const dispatch = useDispatch();

  const dragonListMaxCapacity = useSelector(state => state.jsonData.data.user_data.max_dragon_quantity);
  const dragonList = useSelector(state => state.jsonData.data.dragon_list);
  const dragonKeyIds = dragonList.map(dragonObject => dragonObject["dragon_key_id"]);

  const [activeDragonKeyId, setActiveDragonKeyId] = useState(null);
  const [activeDragonId, setActiveDragonId] = useState(null);
  const [activeElementType, setActiveElementType] = useState(ElementTypeId.FLAME);
  
  const defaultPages = {
    [ElementTypeId.FLAME]: 1,
    [ElementTypeId.WATER]: 1,
    [ElementTypeId.WIND]: 1,
    [ElementTypeId.LIGHT]: 1,
    [ElementTypeId.SHADOW]: 1
  }

  const [currentPages, setCurrentPages] = useState(defaultPages);
  
  const dragonMap = useContext(MappingContext).dragonMap;

  const onSetActiveDragonIds = (dragonKeyId, dragonId) => { 
    setActiveDragonKeyId(dragonKeyId);
    setActiveDragonId(dragonId);
  }

  const onSellActiveDragon = () => {
    dispatch(removeJsonDataListObject("dragon_list", "dragon_key_id", activeDragonKeyId));
    // handle sell amount
    const sellAmount = DragonSellAmounts[dragonMap[activeDragonId].Rarity];
    dispatch(addJsonDataListObjectField("user_data", "dew_point", sellAmount));
    setActiveDragonKeyId(null);
    setActiveDragonId(null);
  }

  // given list of dragon key ids and their corresponding dragon ids,
  // return a list of dragon key id + dragon meta tuples that match the active element type
  const getDragonsByElement = () => {
    const out = [];
    for (const keyId of dragonKeyIds) {
      const dragon = dragonList.find(dragonObject => dragonObject["dragon_key_id"] === keyId);
      const fullId = dragon.dragon_id;
      const dragonMeta = dragonMap[fullId];
      if (dragonMeta.ElementalTypeId === activeElementType) {
        out.push({ dragonKeyId: keyId, dragonMeta: dragonMeta });
      }
    }
    return out;
  }

  const indexOfLastItem = currentPages[activeElementType] * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const getSelectedDragons = getDragonsByElement();
  const currentDragons = getSelectedDragons.slice(indexOfFirstItem, indexOfLastItem)

  const getDragonSelectButtons = () => {
    if (currentDragons.length > 0) {
      return (
        <Grid container spacing={0} style={{ justifyContent: "flex-start" }}>
          {currentDragons.map(({dragonKeyId, dragonMeta}) => {
            return (
              <Grid item xs={3} sm={3} md={2} lg={1} xl={1}
              style={{ width: "10%" }} key={dragonKeyId}>
                <DragonList_DragonSelectButton 
                  dragonKeyId={dragonKeyId} 
                  dragonMeta={dragonMeta}
                  isActive={dragonKeyId === activeDragonKeyId}
                  onSetActiveDragonIds={onSetActiveDragonIds}
                  key={dragonKeyId}
                />
              </Grid>
            );
          })}
        </Grid>
      );
    }
    return <p>No Dragons found :)</p>;
  }

  const getPagination = () => {
    const dragonCount = currentDragons.length;
    if (dragonCount > 0) {
      return (
        <div>
          <Pagination style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
            count={Math.ceil(getSelectedDragons.length / ITEMS_PER_PAGE)}
            page={currentPages[activeElementType]}
            onChange={handlePageChange}
            color="primary"
          />
          <p>{`(${dragonList.length}/${dragonListMaxCapacity})`}</p>
        </div>
      );
    }
    return null;
  } 
  
  const getActiveDragon = () => {
    const dragonMeta = dragonMap[activeDragonId];
    return (
      <DragonList_DragonInfo
        dragonKeyId={activeDragonKeyId}
        dragonMeta={dragonMeta}
      />
    );
  }

  const getUpgradeOptions = () => {
    const dragonMeta = dragonMap[activeDragonId];
    if (activeDragonId == undefined) {
      return <div></div>
    } else {
      return (
        <DragonList_DragonUpgradeButtons
          dragonKeyId={activeDragonKeyId}
          dragonMeta={dragonMeta}
        />
      );
    }
  }

  const handlePageChange = (event, value) => {
    const newPages = { ...currentPages };
    newPages[activeElementType] = value;
    setCurrentPages(newPages);
  };

  const activeDragonObject = dragonList.find(dragonObject => dragonObject["dragon_key_id"] === activeDragonKeyId);

  return (
    <div>
      <DragonList_ElementButtonGroup 
        onSetActiveElement={setActiveElementType} 
        activeElement={activeElementType}
      />
      <div>
        {getDragonSelectButtons()}
        {getPagination()}
        {getActiveDragon()}
        <div style={{ marginTop: '20px' }}>
            {getUpgradeOptions()}
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <DragonList_DragonCreator
          onSellActiveDragon={onSellActiveDragon}
          activeDragonKeyId={activeDragonKeyId}
          saveActiveDragonMeta={dragonMap[activeDragonId]}
          saveActiveDragonObject={activeDragonObject}
        />
      </div>
    </div>
  );
}

export default DragonList;