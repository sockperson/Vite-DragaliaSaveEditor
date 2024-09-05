// https://www.filestack.com/fileschool/react/react-file-upload/
import React, {useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux'; 

import { updateJsonDataObjectField } from '../../../actions/JsonDataActions';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import celesteBirbIcon from '../../../assets/icons/celesteBirb.png';

import skipTicketIcon from '../../../assets/icons/skip_ticket.png';
import eldwaterIcon from '../../../assets/icons/eldwater.png';
import hustleHammerIcon from '../../../assets/icons/hustle_hammer.png';
import wyrmiteIcon from '../../../assets/icons/wyrmite.png';
import manaIcon from '../../../assets/icons/mana.png';
import rupiesIcon from '../../../assets/icons/rupies.png';

const iconMap = {
  celesteBirb: celesteBirbIcon,
  skipTicket: skipTicketIcon,
  eldwater: eldwaterIcon,
  hustleHammer: hustleHammerIcon,
  wyrmite: wyrmiteIcon,
  mana: manaIcon,
  rupies: rupiesIcon
}

// field: the actual field name in save data (e.g. "coin")
// fieldName: the display name of the field (e.g. "Rupies")
function UserData_NumberField({fieldName, fieldLabel, maxValue, iconName, increment, iconSize}) {
  
  const userDataField = useSelector(state => state.jsonData.data.user_data[fieldName]);

  const [inputValue, setInputValue] = useState(userDataField ? userDataField : 0);

  const dispatch = useDispatch();

  const icon = iconMap[iconName] || celesteBirbIcon;

  const handleBlur = () => {
    dispatch(updateJsonDataObjectField("user_data", fieldName, inputValue));
  }

  const handleChange = (event) => {
    let value = event.target.value;
    let newValue = Math.max(Math.min(value, maxValue), 0);
    setInputValue(newValue);
  };

  return (
    <div>
      <TextField
          label={fieldLabel}
          type="number"
          value={inputValue}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={icon} alt={fieldLabel} style={{ width: iconSize, height: iconSize }} />
              </InputAdornment>
            ),
            inputProps: { 
              min: 0, 
              max: Number(maxValue),
              step: increment || 1
            }
          }}
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
        />
    </div>
  );
}

export default UserData_NumberField;