// https://www.filestack.com/fileschool/react/react-file-upload/
import React, {useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux'; 

import { updateJsonDataObjectField } from '../../../actions/JsonDataActions';

import TextField from '@mui/material/TextField';

import InputAdornment from '@mui/material/InputAdornment';

import eudenIcon from '../../../assets/icons/euden.png';

function UserData_TextField({fieldName, fieldLabel}) {

  const userDataField = useSelector(state => state.jsonData.data.user_data[fieldName]);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    let value = event.target.value;
    dispatch(updateJsonDataObjectField("user_data", fieldName, value));
  };

  return (
    <div>
      <TextField
          label={fieldLabel}
          value={userDataField}
          variant="outlined"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"> {/* Text input in user_data only for player name; hardcoded Euden icon */}
                <img src={eudenIcon} alt={fieldLabel} style={{ width: 32, height: 32 }} />
              </InputAdornment>
            ),
            inputProps: { 
              maxLength: 10
            }
          }}
        />
    </div>
  );
}

export default UserData_TextField;