import React, {useState, useRef} from 'react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';

import { QuestWallId } from '../../../enum/Enums';

import QuestWallList_Slider from './QuestWallList_Slider';

// all of these max values are arbitrary; idk what in the ingame max values are
// doesn't really matter ig

function QuestWallList({ questWallList, onSaveEdit }) {

  const getQuestWalls = () => {
    return (
      <>
        <Grid container item xs={12} justifyContent="center" alignItems="center">
          {Object.values(QuestWallId).map(questWallId => (
            <Grid item xs={12} key={questWallId}>
              <QuestWallList_Slider questWallId={questWallId}/>
            </Grid>
          ))}
        </Grid>
      </>
    );
  }

  return (
    <div>
      <Box sx={{ border: '1px solid grey', borderRadius: '4px', p: 2 }}>
        <p>Mercurial Gauntlet</p>
        {getQuestWalls()}
      </Box>
    </div>
  );
}

export default QuestWallList;