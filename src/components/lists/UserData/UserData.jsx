import React, {useState, useRef} from 'react';
import { useSelector } from 'react-redux';

import UserData_NumberField from './UserData_NumberField';
import UserData_TextField from './UserData_TextField';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';

// all of these max values are arbitrary; idk what in the ingame max values are
// doesn't really matter ig

function UserData() {

  const tutorialStatus = useSelector(state => state.jsonData.data.user_data.tutorial_status);
  const tutorialFlagList = useSelector(state => state.jsonData.data.user_data.tutorial_flag_list);

  const tutorialInfo = () => {
    let tutorialStatusString = "Just started";
    if (tutorialStatus >= 60999) {
      tutorialStatusString = "Completed Tutorial";
    } else if (tutorialStatus >= 11003) {
      tutorialStatusString = "Completed Halidom Tutorial";
    } else if (tutorialStatus >= 10711) {
      tutorialStatusString = "Completed Wyrmprint Tutorial";
    } else if (tutorialStatus >= 10601) {
      tutorialStatusString = "Completed Upgrade Tutorial";
    } else if (tutorialStatus >= 10301) {
      tutorialStatusString = "Completed Team Building Tutorial";
    }

    let tutorialFlagString = "Just started";
    if (tutorialFlagList.includes(1030)) {
      tutorialFlagString = "Completed Tutorial";
    } else if (tutorialFlagList.includes(1024)) {
      tutorialFlagString = "Completed Weapons Tutorial";
    } else if (tutorialFlagList.includes(1023)) {
      tutorialFlagString = "Completed Wyrmprint Tutorial";
    } else if (tutorialFlagList.includes(1001)) {
      tutorialFlagString = "Completed Dragon Upgrade Tutorial";
    }

    return (
      <div>
        <p>Tutorial Status: {tutorialStatusString}, Tutorial Flags: {tutorialFlagString}</p>
      </div>
    );
  }

  return (
    <div>
      <Box sx={{ border: '1px solid grey', borderRadius: '4px', p: 2 }}>
        <p>Basic User Data</p>
        <div style={{ marginBottom: '20px' }}>
        <UserData_TextField
              fieldName="name"
              fieldLabel="Player Name"
        />
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <UserData_NumberField
              fieldName="quest_skip_point"
              fieldLabel="Skip Tickets"
              maxValue="400"
              iconName="skipTicket"
              increment="10"
              iconSize="32px"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <UserData_NumberField
              fieldName="dew_point"
              fieldLabel="Eldwater"
              maxValue="200000000"
              iconName="eldwater"
              increment="10000"
              iconSize="32px"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <UserData_NumberField
              fieldName="build_time_point"
              fieldLabel="Hustle Hammers"
              maxValue="1000"
              iconName="hustleHammer"
              increment="1"
              iconSize="32px"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <UserData_NumberField
              fieldName="crystal"
              fieldLabel="Wyrmite"
              maxValue="10000000"
              iconName="wyrmite"
              increment="1200"
              iconSize="24px"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <UserData_NumberField
              fieldName="mana_point"
              fieldLabel="Mana"
              maxValue="1000000000"
              iconName="mana"
              increment="10000"
              iconSize="32px"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <UserData_NumberField
              fieldName="coin"
              fieldLabel="Rupies"
              maxValue="4000000000"
              iconName="rupies"
              increment="100000"
              iconSize="32px"
            />
          </Grid>
        </Grid>
      </Box>
      {tutorialInfo()}
    </div>
  );
}

export default UserData;