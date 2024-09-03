import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { MappingContext } from '../../SaveEditor';

import { Grid, Autocomplete, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  InputLabel, FormControl, InputAdornment, Button, Tooltip } from '@mui/material';

import { addJsonDataListObject, resetListObjectListField } from '../../../actions/JsonDataActions';

import ImageUtils from '../../../util/ImageUtils';
import DragaliaUtils from '../../../util/DragaliaUtils';
import JsonUtils from '../../../util/JsonUtils';

import notteWtfIcon from '../../../assets/icons/nottewtf.png';

import TalismanList_TalismanImage from './TalismanList_TalismanImage';

function TalismanList_TalismanCreator({
  onRemoveActiveTalisman, activeTalismanKeyId
}) {
  const dispatch = useDispatch();

  const TALISMAN_IMG_SIZE = 100;
  const ADV_IMG_SIZE = 40;
  const ABILITY_IMG_SIZE = 40;
  const TALISMAN_LIST_MAX_CAPACITY = 500;
  
  const adventurerMap = useContext(MappingContext).adventurerMap;
  const abilityMap = useContext(MappingContext).abilityMap;
  const portraitWyrmprintMap = useContext(MappingContext).portraitWyrmprintMap;

  const [activeFeaturedAdventurerMeta, setActiveFeaturedAdventurerMeta] = useState(adventurerMap[10150502]);
  const [activeAbility1Meta, setActiveAbilityId1] = useState(abilityMap[340000100]);
  const [activeAbility2Meta, setActiveAbilityId2] = useState(abilityMap[340000131]);

  const talismanList = useSelector(state => state.jsonData.data.talisman_list);
  const partyList = useSelector(state => state.jsonData.data.party_list);

  const advImgSrc = activeFeaturedAdventurerMeta ? (ImageUtils.getAdventurerImage(
    activeFeaturedAdventurerMeta,
    ADV_IMG_SIZE
  )) : notteWtfIcon;

  const ability1ImgSrc = activeAbility1Meta ? (ImageUtils.getAbilityImage(
    activeAbility1Meta.AbilityIconName,
    ABILITY_IMG_SIZE
  )) : notteWtfIcon;

  const ability2ImgSrc = activeAbility2Meta ? (ImageUtils.getAbilityImage(
    activeAbility2Meta.AbilityIconName,
    ABILITY_IMG_SIZE
  )) : notteWtfIcon;

  const allAdventurerList = Object.values(adventurerMap);
  const allAdventurerNameList = allAdventurerList.map(adventurer => adventurer.FullName); 
  allAdventurerNameList.push('');

  const ability1Options = [
    {id: 340000010, label: "Strength +20%" },
    {id: 340000020, label: "Skill Damage +40%" },
    {id: 340000030, label: "Critical Rate +15%" },
    {id: 340000050, label: "Force Strike +50%"},
    {id: 340000070, label: "HP +15%" },
    {id: 340000100, label: "Dragon Damage +18%" },
    {id: 340000120, label: "Dragon Haste +15%" }
  ]

  const ability2Options = [
    {id: 340000040, label: "Skill Haste +8%"},
    {id: 340000060, label: "Skill Prep +50%" },
    {id: 340000080, label: "Defense +10%"},
    {id: 340000090, label: "Critical Damage +15%" },
    {id: 340000110, label: "Recovery Potency +20%" },
    {id: 340000130, label: "Dragon Time +20%" },
    {id: 340000131, label: "Steady Hitter I" },
    {id: 340000132, label: "Easy Hitter I" },
    {id: 340000133, label: "Lucky Hitter I" },
    {id: 340000134, label:  "Hasty Hitter I" },
  ];

  const initialAbility1 = ability1Options.find(option => option.id === activeAbility1Meta.Id);
  const initialAbility2 = ability2Options.find(option => option.id === activeAbility2Meta.Id);

  let activeAbilityIds = [];
  activeAbilityIds.push(activeAbility1Meta.Id);
  activeAbilityIds.push(activeAbility2Meta.Id);
  activeAbilityIds = activeAbilityIds.filter(id => id !== 0);

  const [isDeleteEquippedDialogOpen, setIsDeleteEquippedDialogOpen] = useState(false);

  const handleClose = () => {
    setIsDeleteEquippedDialogOpen(false);
  }

  const handleDeleteEquippedTalisman = () => {
    onRemoveActiveTalisman();
    dispatch(resetListObjectListField("party_list", "party_setting_list", "equip_talisman_key_id", activeTalismanKeyId));
  };

  // TODO: adventurer autocomplete should use id-name tuples
  const handleActiveAdventurerChange = (event, name) => {
    const activeAdventurerId = Object.values(adventurerMap)
      .find(adventurer => adventurer.FullName === name)?.IdLong;
    const activeAdventurerMeta = adventurerMap[activeAdventurerId];
    setActiveFeaturedAdventurerMeta(activeAdventurerMeta);
  }

  const handleActiveAbility1Change = (event, idLabel) => {
    const id = idLabel.id;
    setActiveAbilityId1(abilityMap[id]);
  }

  const handleActiveAbility2Change = (event, idLabel) => {
    const id = idLabel.id;
    setActiveAbilityId2(abilityMap[id]);
  }

  const adventurerAutocomplete = () => {
    return (
      <Autocomplete
        options={allAdventurerNameList}
        value={activeFeaturedAdventurerMeta.FullName}
        onChange={handleActiveAdventurerChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Featured Adventurer"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <img 
                    src={advImgSrc} 
                    alt={activeFeaturedAdventurerMeta.Name} 
                    style={
                      { 
                        width: ADV_IMG_SIZE, 
                        height: ADV_IMG_SIZE
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

  const ability1Autocomplete = () => {
    return (
      <Autocomplete
          value={initialAbility1}
          options={ability1Options}
          getOptionLabel={(option) => option.label}
          onChange={handleActiveAbility1Change}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Ability 1"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <img 
                      src={ability1ImgSrc} 
                      alt={"TODO"} 
                      style={
                        { 
                          width: ABILITY_IMG_SIZE, 
                          height: ABILITY_IMG_SIZE
                        }
                      } 
                    />
                  </InputAdornment>
                ),
              }}
            />)}
        />
    );
  }

  const ability2Autocomplete = () => {
    return (
      <Autocomplete
          value={initialAbility2}
          options={ability2Options}
          getOptionLabel={(option) => option.label}
          onChange={handleActiveAbility2Change}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Ability 2"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <img 
                      src={ability2ImgSrc} 
                      alt={"TODO"} 
                      style={
                        { 
                          width: ABILITY_IMG_SIZE, 
                          height: ABILITY_IMG_SIZE
                        }
                      } 
                    />
                  </InputAdornment>
                ),
              }}
            />)}
        />
    );
  }

  const handleAdd = () => {
    const maybeTalismanMeta = Object.values(portraitWyrmprintMap)
      .find(portraitWyrmprintMeta => portraitWyrmprintMeta.CharaId === activeFeaturedAdventurerMeta.IdLong);
    if (!maybeTalismanMeta) {
      return;
    }
    const talismanId = maybeTalismanMeta.Id;
    const newTalisman = DragaliaUtils.getTalisman(
      talismanList, talismanId, activeAbility1Meta.Id, activeAbility2Meta.Id,
      0, 0, 0, null 
    );
    dispatch(addJsonDataListObject("talisman_list", newTalisman));
  }

  const handleRemove = () => {
    const isEquipped = JsonUtils.getTalismanEquippedParty(partyList, activeTalismanKeyId) != -1;
    if (isEquipped) {
      setIsDeleteEquippedDialogOpen(true);
    } else {
      onRemoveActiveTalisman();
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

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={12} lg={6} style={{ display: 'flex', flexDirection: 'column' }}>
        <fieldset style={{ flex: 1 }}>
          <legend>Template Wyrmprint</legend>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TalismanList_TalismanImage
                adventurerId={activeFeaturedAdventurerMeta.IdLong}
                abilityIds={activeAbilityIds}
                isUsed={false}
                imageSize={TALISMAN_IMG_SIZE}
              />
            </Grid>
            <Grid item>
              {adventurerAutocomplete()}
            </Grid>
            <Grid item>
              {ability1Autocomplete()}
            </Grid>
            <Grid item>
              {ability2Autocomplete()}
            </Grid>
          </Grid>
        </fieldset>
      </Grid>
      <Grid item xs={12} lg={6} style={{ display: 'flex', flexDirection: 'column' }}>
        <fieldset style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <legend>Wyrmprint Options</legend>
          <Grid container direction="column" spacing={2} style={{ flex: 1 }}>
            <Tooltip 
              title={talismanList.length >= TALISMAN_LIST_MAX_CAPACITY ? "Wyrmprint inventory is full." : ""}
              disableHoverListener={talismanList.length < TALISMAN_LIST_MAX_CAPACITY}
            >
              <span> {/* Tooltip does not work with disabled buttons, so we wrap the button in a span */}
                <Button 
                  key="add" 
                  onClick={() => handleAdd()} 
                  {...commonButtonProps}
                  disabled={talismanList.length >= TALISMAN_LIST_MAX_CAPACITY}
                  style={{ marginTop: '64px', backgroundColor: '#7a62f0' }}
                >
                  Add Template Wyrmprint
                </Button>
              </span>
            </Tooltip>
          </Grid>
          <Grid item style={{ flex: 1 }}>
            <Button 
              key="remove" 
              onClick={() => handleRemove()} 
              {...commonButtonProps}
              disabled={activeTalismanKeyId === null}
              style={{ marginTop: '80px', backgroundColor: '#7a62f0' }}
            >
              Remove Selected Wyrmprint
            </Button>
          </Grid>
        </fieldset>
      </Grid>
      <Dialog open={isDeleteEquippedDialogOpen} onClose={handleClose}>
        <DialogTitle>{"Confirm Action"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This Wyrmprint is currently equipped. Deleting it will unequip it from all adventurers.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => { 
            handleClose();
            handleDeleteEquippedTalisman();
          }}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default TalismanList_TalismanCreator;