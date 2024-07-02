import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import ImageUtils from '../../../util/ImageUtils';

import notteWtfIcon from '../../../assets/icons/nottewtf.png';

function AbilityCrestList_WyrmprintNameAutocomplete({activeWyrmprintMeta, onSetActiveWyrmprintIdByName, wyrmprintNameList}) {

  const [activeWyrmprintName, setActiveWyrmprintName] = useState('');

  const IMG_SIZE = 36;

  const imgSrc = activeWyrmprintMeta ? (ImageUtils.getWyrmprintImage(
    activeWyrmprintMeta.BaseId,
    activeWyrmprintMeta.Rarity,
    IMG_SIZE
  )) : notteWtfIcon;

  const handleChange = (event, wyrmprintName) => {
    setActiveWyrmprintName(wyrmprintName);
    onSetActiveWyrmprintIdByName(wyrmprintName);
  };

  return (
    <Autocomplete
      options={wyrmprintNameList}
      value={activeWyrmprintName}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Wyrmprint Name"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <img 
                  src={imgSrc} 
                  alt={activeWyrmprintMeta?.Name ?? "None"} 
                  style={
                    { 
                      width: IMG_SIZE, 
                      height: IMG_SIZE
                    }
                  } 
                />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}

export default AbilityCrestList_WyrmprintNameAutocomplete;