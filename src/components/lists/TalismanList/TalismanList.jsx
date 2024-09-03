import React, {useState, useContext} from 'react';
import { MappingContext } from '../../SaveEditor';
import { useSelector, useDispatch } from 'react-redux'; 
import { removeJsonDataListObject } from '../../../actions/JsonDataActions';

import { Grid, Pagination } from '@mui/material';

import JsonUtils from '../../../util/JsonUtils';

import TalismanList_TalismanSelectButton from './TalismanList_TalismanSelectButton';
import TalismanList_TalismanInfo from './TalismanList_TalismanInfo';
import TalismanList_TalismanCreator from './TalismanList_TalismanCreator';

const ITEMS_PER_PAGE = 25;
const TALISMAN_LIST_MAX_CAPACITY = 500;

function TalismanList() {
  const dispatch = useDispatch();

  const talismanList = useSelector(state => state.jsonData.data.talisman_list);
  const talismanKeyIds = talismanList.map(talismanObject => talismanObject["talisman_key_id"]);

  const [activeTalismanKeyId, setActiveTalismanKeyId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentTalismanKeyIds = talismanKeyIds.slice(indexOfFirstItem, indexOfLastItem)

  const onSetActiveTalismanKeyId = (talismanKeyId) => { setActiveTalismanKeyId(talismanKeyId); }
  const onRemoveActiveTalisman = () => {
    dispatch(removeJsonDataListObject("talisman_list", "talisman_key_id", activeTalismanKeyId));
    setActiveTalismanKeyId(null);
  }

  const getTalismanSelectButtons = () => {
    if (currentTalismanKeyIds.length > 0) {
      return (
        <Grid container spacing={0} style={{ justifyContent: "flex-start" }}>
          {currentTalismanKeyIds.map(keyId => {
            return (
              <Grid item xs={3} sm={3} md={2} lg={1} xl={1}
              style={{ width: "10%" }} key={keyId}>
                <TalismanList_TalismanSelectButton 
                  talismanKeyId={keyId} 
                  onSetActiveTalismanKeyId={onSetActiveTalismanKeyId}
                  isActive={keyId === activeTalismanKeyId}
                  key={keyId}
                />
              </Grid>
            );
          })}
        </Grid>
      );
    }
    return <p>No portrait Wyrmprints found :)</p>;
  }

  const getPagination = () => {
    const talismanCount = talismanKeyIds.length;
    if (talismanCount > 0) {
      return (
        <div>
          <Pagination style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
            count={Math.ceil(talismanList.length / ITEMS_PER_PAGE)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
          <p>{`(${talismanCount}/${TALISMAN_LIST_MAX_CAPACITY})`}</p>
        </div>
      );
    }
    return null;
  }
  
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      {getTalismanSelectButtons()}
      {getPagination()}
      <TalismanList_TalismanInfo talismanKeyId={activeTalismanKeyId} />
      <TalismanList_TalismanCreator
        onRemoveActiveTalisman={onRemoveActiveTalisman}
        activeTalismanKeyId={activeTalismanKeyId}
      />
    </div>
  );
}

export default TalismanList;