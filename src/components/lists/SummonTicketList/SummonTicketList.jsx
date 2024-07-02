import React, {useState, useContext} from 'react';

import { MappingContext } from '../../SaveEditor';

import { Grid } from '@mui/material';

import SummonTicketList_NumberInput from './SummonTicketList_NumberInput';

function SummonTicketList() {

  const summonTicketMap = useContext(MappingContext).summonTicketMap;
  const possibleTicketIds = new Set(Object.keys(summonTicketMap).map(key => parseInt(key, 10)));

  const getSummonTickets = () => {
    return (
      <Grid container spacing={1}>
        {Array.from(possibleTicketIds).map(id => (
          <Grid item xs={3} sm={3} md={3} key={id}>
            <SummonTicketList_NumberInput
              summonTicketId={id}
              summonTicketMeta={summonTicketMap[id]}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <div>
      {getSummonTickets()}
    </div>
  );
}

export default SummonTicketList;