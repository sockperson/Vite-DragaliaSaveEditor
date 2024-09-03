import React from 'react';

import { useSelector, useDispatch } from 'react-redux'; 

import { updateJsonDataListField, addJsonDataListObject } from '../../../actions/JsonDataActions';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import ImageUtils from '../../../util/ImageUtils';
import JsonUtils from '../../../util/JsonUtils';

function SummonTicketList_NumberInput ({summonTicketId, summonTicketMeta}) {

  const dispatch = useDispatch();

  const summonTicketList = useSelector(state => state.jsonData.data.summon_ticket_list); // needed to generate unique key_id

  const ticketObject = useSelector(state => state.jsonData.data.summon_ticket_list
    .find(ticketObject => ticketObject["summon_ticket_id"] === summonTicketId));

  const quantity = ticketObject ? ticketObject.quantity : 0;
  const ticketObjectExists = ticketObject ? true : false;
  
  const iconSize = 48;
  const name = summonTicketMeta.Name || "Unknown Summon Ticket";
  const icon = ImageUtils.getConsumableImage(summonTicketMeta.Id, iconSize)

  const handleQuantityChange = (event) => {
    let value = event.target.value;
    let newValue = Math.max(Math.min(value, 999999), 0);

    if (ticketObjectExists) {
      dispatch(updateJsonDataListField("summon_ticket_list", 
        "summon_ticket_id", summonTicketId, "quantity", newValue));
    } else {
      const newTicketObject = { 
        key_id: JsonUtils.getUniqueKeyId(summonTicketList, "key_id"),
        summon_ticket_id: summonTicketMeta.Id, 
        quantity: newValue,
        use_limit_time: 0 
      }
      dispatch(addJsonDataListObject("summon_ticket_list", newTicketObject));
    }
  };

  return (
    <TextField style={{ width: "80%" }}
          label={name}
          type="number"
          value={quantity}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={icon} alt={name} style={{ width: iconSize, height: iconSize }} />
              </InputAdornment>
            ),
            inputProps: { 
              min: 0, 
              max: 999999,
              step: 1
            }
          }}
          variant="outlined"
          onChange={handleQuantityChange}
        />
  );
};

export default SummonTicketList_NumberInput;