import React, { useState, useContext } from 'react';

import { useSelector, useDispatch } from 'react-redux'; 
import { setList } from '../../../actions/JsonDataActions';

import { MappingContext } from '../../SaveEditor';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import JsonUtils from '../../../util/JsonUtils';
import DragaliaUtils from '../../../util/DragaliaUtils';

function AbilityCrestList_ListMaxButton() { 
  
  const dispatch = useDispatch();

  const wyrmprintMap = useContext(MappingContext).wyrmprintMap;
  const wyrmprintIds = new Set(Object.keys(wyrmprintMap).map(key => parseInt(key, 10)));

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const wyrmprintList = useSelector(state => state.jsonData.data.ability_crest_list);

  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleMaxList = () => {
    handleClickOpen();
  };

  const handleMaxListConfirm = () => {
    // fetch getTime, is_favorite for each owned wyrmprint
    const idToGetTime = JsonUtils.getFieldMapFromList(wyrmprintList, "ability_crest_id", "gettime");
    const idToIsFavorite = JsonUtils.getFieldMapFromList(wyrmprintList, "ability_crest_id", "is_favorite");
    // create a new list of every weapon, maxed out. Use existing getTime/is_favorite if they were owned.
    const newWyrmprintList = [];
    wyrmprintIds.forEach(wyrmprintId => {
      const wyrmprintDetails = DragaliaUtils.getWyrmprintDetails(wyrmprintMap[wyrmprintId]);
      const getTime = idToGetTime[wyrmprintId] ?? null;
      const isFavorite = idToIsFavorite[wyrmprintId] ?? 0;
      newWyrmprintList.push(
        DragaliaUtils.getMaxedWyrmprint(wyrmprintId, wyrmprintDetails, getTime, isFavorite)
      );
    });
    dispatch(setList("ability_crest_list", newWyrmprintList));
  }
  
  const props = {
    variant: 'contained',
    style: { backgroundColor: '#9c1e63' },
    sx: { 
      textTransform: 'none',
      color: 'white',
      '&.Mui-disabled': {
        color: 'white',
        opacity: 0.5
      }
    }
  }

  return (
    <>
      <Button 
        key="Max List" 
        onClick={() => handleMaxList() } 
        disabled={
          false
        }
        {...props}
      >
        Max Wyrmprint List
      </Button>
      <Dialog open={isDialogOpen} onClose={handleClose}>
        <DialogTitle>{"Confirm Action"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to max out all Wyrmprints?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => { 
            handleClose();
            handleMaxListConfirm();
          }}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AbilityCrestList_ListMaxButton;