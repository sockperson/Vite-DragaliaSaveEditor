// https://www.filestack.com/fileschool/react/react-file-upload/
import React, {useState, memo} from 'react';

import { useSelector, useDispatch } from 'react-redux'; 

import { updateJsonDataListField, addJsonDataListObject } from '../../../actions/JsonDataActions';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import ImageUtils from '../../../util/ImageUtils';

import notteWtfIcon from '../../../assets/icons/nottewtf.png';

const MaterialList_NumberInput = memo(({materialId, materialMeta}) => {

  const dispatch = useDispatch();

  const materialObject = useSelector(state => state.jsonData.data.material_list
    .find(materialObject => materialObject["material_id"] === materialId));

  const iconSize = 36;
  const icon = ImageUtils.getMaterialImage(materialMeta.Id, iconSize)
  
  const quantity = materialObject ? materialObject.quantity : 0;
  const ticketObjectExists = materialObject ? true : false;

  const handleQuantityChange = (event) => {
    let value = event.target.value;
    let newValue = Math.max(Math.min(value, 999999), 0);

    if (ticketObjectExists) {
      dispatch(updateJsonDataListField("material_list", 
        "material_id", materialId, "quantity", newValue));
    } else {
      const newMaterialObject = { 
        material_id: materialId, 
        quantity: newValue
      }
      dispatch(addJsonDataListObject("material_list", newMaterialObject));
    }
  };

  return (
    <TextField style={{ width: "80%" }}
          label={materialMeta.Name || "Unknown Item"}
          type="number"
          value={quantity}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={icon} alt={materialMeta.Name || "Unknown Item"} style={{ width: iconSize, height: iconSize }} />
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
});

export default MaterialList_NumberInput;