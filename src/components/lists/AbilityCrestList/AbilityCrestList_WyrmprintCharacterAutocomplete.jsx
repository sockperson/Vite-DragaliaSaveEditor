import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function AbilityCrestList_WyrmprintCharacterAutocomplete({onSetActiveCharacterName, featuredCharacterList}) {

  const [activeCharacterName, setActiveCharacterName] = useState('');

  const handleChange = (event, characterName) => {
    setActiveCharacterName(characterName);
    onSetActiveCharacterName(characterName);
  };

  return (
    <Autocomplete
      options={featuredCharacterList}
      value={activeCharacterName}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} label="Character Name" />}
    />
  );
}

export default AbilityCrestList_WyrmprintCharacterAutocomplete;