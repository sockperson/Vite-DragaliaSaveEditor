import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { MappingContext } from '../../SaveEditor';

import { Grid, Autocomplete, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  InputLabel, FormControl, InputAdornment, Button, Tooltip, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';

import { addJsonDataListObjectField, resetListObjectListField } from '../../../actions/JsonDataActions';

import { ElementTypeId , elementTypeIdToString } from '../../../enum/Enums';

import ImageUtils from '../../../util/ImageUtils';
import DragaliaUtils from '../../../util/DragaliaUtils';
import JsonUtils from '../../../util/JsonUtils';
import { DragonSellAmounts } from '../../../definitions/Definitions';

import notteWtfIcon from '../../../assets/icons/nottewtf.png';
import eldwaterIcon from '../../../assets/icons/eldwater.png';

import useDragaliaActions from '../../../util/DragaliaActionsUtils';

function DragonList_DragonCreator({
  onSellActiveDragon, activeDragonKeyId, saveActiveDragonMeta, saveActiveDragonObject
}) {
  const dispatch = useDispatch();
  const { addDragon } = useDragaliaActions();

  const TALISMAN_IMG_SIZE = 100;
  const DRAGON_IMG_SIZE = 40;
  const ABILITY_IMG_SIZE = 40;
  const TALISMAN_LIST_MAX_CAPACITY = 500;
  const ELDWATER_IMG_SIZE = 20;
  const GALA_BEAST_CIELLA = 20050217;

  const dragonListMaxCapacity = useSelector(state => state.jsonData.data.user_data.max_dragon_quantity);
  
  const dragonMap = useContext(MappingContext).dragonMap;

  const [activeDragonMeta, setActiveDragonMeta] = useState(dragonMap[GALA_BEAST_CIELLA]);
  const [activeElementId, setActiveElementId] = useState(ElementTypeId.WATER);
  const [toAddMaxedDragon, setToAddMaxedDragon] = useState(false);

  const [isDeleteEquippedDialogOpen, setIsDeleteEquippedDialogOpen] = useState(false);

  const dragonList = useSelector(state => state.jsonData.data.dragon_list);
  const partyList = useSelector(state => state.jsonData.data.party_list);

  const buttons = [
    { element: ElementTypeId.FLAME },
    { element: ElementTypeId.WATER },
    { element: ElementTypeId.WIND },
    { element: ElementTypeId.LIGHT },
    { element: ElementTypeId.SHADOW }
  ];

  const eldwater = <img src={eldwaterIcon} alt="Eldwater" style={{ width: ELDWATER_IMG_SIZE, height: ELDWATER_IMG_SIZE }} />

  const sellAmount = saveActiveDragonMeta ? (
    <span>
       ({DragonSellAmounts[saveActiveDragonMeta.Rarity]}{eldwater})
    </span>
  ) : "";

  const allDragonList = Object.values(dragonMap).filter(dragon => dragon.IsPlayable === 1);
  const currentDragonList = allDragonList.filter(dragon => dragon.ElementalTypeId === activeElementId);

  const handleDeleteEquippedDragon = () => {
    onSellActiveDragon();
    dispatch(resetListObjectListField("party_list", "party_setting_list", "equip_dragon_key_id", activeDragonKeyId));
  };

  const handleActiveDragonChange = (event, dragonMeta) => {
    if (dragonMeta != null) {
      setActiveDragonMeta(dragonMeta);
    }
  }

  const handleActiveElementIdChange = (event) => {
    setActiveElementId(event.target.value);
  }

  const handleCheckboxChange = (event) => {
    setToAddMaxedDragon(event.target.checked);
  }

  const handleClose = () => {
    setIsDeleteEquippedDialogOpen(false);
  }

  const dragonAutocomplete = () => {
    return (
      <Autocomplete
        options={currentDragonList}
        value={activeDragonMeta}
        getOptionLabel={(option) => option.FullName}
        onChange={handleActiveDragonChange}
        renderOption={(props, option) => {
          const { key, ...restProps } = props;
          return (
            <li {...restProps} key={option.Id}>
              <img 
                src={ImageUtils.getDragonImage(option)} 
                alt={option.FullName} 
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              {option.FullName}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Dragon"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <img 
                  src={ImageUtils.getDragonImage(activeDragonMeta)} 
                  alt={activeDragonMeta.FullName} 
                  style={{ width: 24, height: 24, marginRight: 8 }} 
                />
              ),
            }}
          />
        )}
      />
    );
  }

  const elementSelect = () => {
    return (
      <Select
        value={activeElementId}
        onChange={handleActiveElementIdChange}
      >
        {buttons.map((button) => (
          <MenuItem key={button.element} value={button.element}>
            <img 
              src={ImageUtils.getElementTypeImage(button.element, 24)} 
              alt={elementTypeIdToString(button.element)} 
              style={{ marginRight: 8, marginBottom: -4 }} 
            />
            {elementTypeIdToString(button.element)}
          </MenuItem>
        ))}
      </Select>
    );
  }

  const toggleMaxedDragonCheckbox = () => {
    return (
      <FormControlLabel
        control={
        <Checkbox
          checked={toAddMaxedDragon}
          onChange={handleCheckboxChange}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      }
      label="Add as maxed dragon?"
      />
    );
  }

  const handleAdd = () => {
    addDragon(activeDragonMeta.Id, toAddMaxedDragon);
  }
  // handle remove for locked dragons
  const handleRemove = () => {
    const isEquipped = JsonUtils.getDragonEquippedParty(partyList, activeDragonKeyId) != -1;
    if (isEquipped) {
      setIsDeleteEquippedDialogOpen(true);
    } else {
      onSellActiveDragon();
    }
  }

  const commonButtonProps = {
    variant: 'contained',
    style: { backgroundColor: '#7a62f0' },
    sx: { 
      textTransform: 'none',
      color: 'white',
      '&.Mui-disabled': {
        color: 'white',
        opacity: 0.5
      }
    }
  }
  
  const NOT_SELECTED_TITLE = "Dragon not selected.";
  const LOCKED_TITLE = "Dragon is locked.";

  const sellButton = () => {
    let displayTitle;
    if (saveActiveDragonMeta) {
      displayTitle = (saveActiveDragonObject.is_lock === 1) ? LOCKED_TITLE : "";
    } else {
      displayTitle = NOT_SELECTED_TITLE
    }
    
    const notSelectedListener = saveActiveDragonMeta ? 
      (saveActiveDragonObject.is_lock === 0) : 
      false;
    return (
      <Grid container direction="column" spacing={2} style={{ flex: 1 }}>
        <Tooltip 
          title={displayTitle}
          disableHoverListener={notSelectedListener}
        >
        <span>
          <Button 
            key="remove" 
            onClick={() => handleRemove()} 
            {...commonButtonProps}
            disabled={activeDragonKeyId === null || saveActiveDragonObject.is_lock === 1}
            style={{ marginTop: '40px', backgroundColor: '#7a62f0' }}
          >
            Sell Selected Dragon&nbsp;{sellAmount}
          </Button>
        </span>
      </Tooltip>
    </Grid>
    );
  };

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={12} lg={6} style={{ display: 'flex', flexDirection: 'column' }}>
        <fieldset style={{ flex: 1 }}>
          <legend>New Dragon</legend>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              {dragonAutocomplete()}
            </Grid>
            <Grid container direction="row" spacing={2} alignItems="center">
              <Grid item style={{ marginLeft: '16px', marginTop: '8px' }}>
                {elementSelect()}
              </Grid>
              <Grid item>
                {toggleMaxedDragonCheckbox()}
              </Grid>
            </Grid> 
          </Grid>
        </fieldset>
      </Grid>
      <Grid item xs={12} lg={6} style={{ display: 'flex', flexDirection: 'column' }}>
        <fieldset style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <legend>Dragon Options</legend>
          <Grid container direction="column" spacing={2} style={{ flex: 1 }}>
            <Tooltip 
              title={dragonList.length >= dragonListMaxCapacity ? "Dragon inventory is full." : ""}
              disableHoverListener={dragonList.length < dragonListMaxCapacity}
            >
              <span>
                <Button 
                  key="add" 
                  onClick={() => handleAdd()} 
                  {...commonButtonProps}
                  disabled={dragonList.length >= dragonListMaxCapacity}
                  style={{ marginTop: '50px', backgroundColor: '#7a62f0' }}
                >
                  Add New Dragon
                </Button>
              </span>
            </Tooltip>
          </Grid>
          {sellButton()}
        </fieldset>
      </Grid>
      <Dialog open={isDeleteEquippedDialogOpen} onClose={handleClose}>
        <DialogTitle>{"Confirm Action"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This Dragon is currently equipped. Selling it will unequip it from all Adventurers.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => { 
            handleClose();
            handleDeleteEquippedDragon();
          }}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default DragonList_DragonCreator;