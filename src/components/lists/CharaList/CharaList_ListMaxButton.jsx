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
import CircularProgress from '@mui/material/CircularProgress';

import JsonUtils from '../../../util/JsonUtils';
import DragaliaUtils from '../../../util/DragaliaUtils';
import useDragaliaActions from '../../../util/DragaliaActionsUtils';

function CharaList_ListMaxButton() { 
  
  const dispatch = useDispatch();
  const { maxAdventurer, maxTutorial } = useDragaliaActions();

  const adventurerMap = useContext(MappingContext).adventurerMap;
  const adventurerIds = new Set(Object.keys(adventurerMap).map(key => parseInt(key, 10)));

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const adventurerList = useSelector(state => state.jsonData.data.chara_list);
  const adventurerMapById = adventurerList.reduce((map, adventurer) => {
    map[adventurer.chara_id] = adventurer;
    return map;
  }, {});

  const tutorialFlagList = useSelector(state => state.jsonData.data.user_data.tutorial_flag_list);
  const tutorialStatus = useSelector(state => state.jsonData.data.user_data.tutorial_status);

  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleMaxList = () => {
    handleClickOpen();
  };

  const handleMaxListConfirm = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        // go through each possible ID and handle maxing out the adventurer or adding it
        adventurerIds.forEach(adventurerId => {
          const adventurerObject = adventurerMapById[adventurerId];
          maxAdventurer(adventurerId, adventurerObject);
        });
      } finally {
        setIsLoading(false);
        setIsDialogOpen(false);
      }
    }, 10);
    if (!DragaliaUtils.isTutorialMaxed(tutorialStatus, tutorialFlagList)) {
      maxTutorial();
    }
  };
  
  const tutorialWarning = DragaliaUtils.isTutorialMaxed(tutorialStatus, tutorialFlagList) ? "" 
  : "(This save file is flagged as not having completed all tutorials. Proceeding with this option will skip the tutorial.)";
  const tutorialWarningText = <>
    <br />
    <span style={{ color: 'red' }}>{tutorialWarning}</span>
  </>;

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
        Max Adventurer List
      </Button>
      <Dialog open={isDialogOpen} onClose={handleClose}>
        <div style={{ position: 'relative' }}>
          {isLoading && (
            <CircularProgress 
              size={32} 
              style={{ position: 'absolute', top: 16, right: 16 }} 
            />
          )}
          <DialogTitle>{"Confirm Action"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to max out all Adventurers?
              {tutorialWarningText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={isLoading}>Cancel</Button>
            <Button 
              onClick={async () => { 
                await handleMaxListConfirm();
              }}
              disabled={isLoading}
            >
              Confirm
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}

export default CharaList_ListMaxButton;