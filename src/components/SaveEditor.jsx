import React, {useState, useRef, useEffect, createContext} from 'react';

import { useSelector } from 'react-redux';

import UserData from './lists/UserData/UserData';
import QuestWallList from './lists/QuestWallList/QuestWallList';
import MaterialList from './lists/MaterialList/MaterialList';
import SummonTicketList from './lists/SummonTicketList/SummonTicketList';
import WeaponList from './lists/WeaponList/WeaponList';
import AbilityCrestList from './lists/AbilityCrestList/AbilityCrestList';

import DragaliaData from '../DragaliaData';

import { Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import celesteballIcon from '../assets/icons/celesteball.png';

const MappingContext = createContext();

function SaveEditor() {

  const jsonData = useSelector(state => state.jsonData);
  
  // Resources
  const materialMapRef = useRef(null);
  const dragonMapRef = useRef(null);
  const summonTicketMapRef = useRef(null);
  const weaponMapRef = useRef(null);
  const weaponSkinMapRef = useRef(null);
  const wyrmprintMapRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  const handlePrintSaveData = () => {
    console.log(saveData); 
  };

  const handleDownloadSaveData = () => {
    // wtf this lol
    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = 'savedata2.txt';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle loading resources
  useEffect(() => {
    const loadMaps = async () => {
      const [
        loadedMaterialMap, 
        loadedDragonMap, 
        loadedSummonTicketMap, 
        loadedWeaponMap, 
        loadedWeaponSkinMap, 
        loadedWyrmprintMap
      ] = await Promise.all([
        DragaliaData.getMaterialMap(),
        DragaliaData.getDragonMap(),
        DragaliaData.getSummonTicketMap(),
        DragaliaData.getWeaponMap(),
        DragaliaData.getWeaponSkinMap(),
        DragaliaData.getWyrmprintMap(),
      ]);

      materialMapRef.current = loadedMaterialMap;
      dragonMapRef.current = loadedDragonMap;
      summonTicketMapRef.current = loadedSummonTicketMap;
      weaponMapRef.current = loadedWeaponMap;
      weaponSkinMapRef.current = loadedWeaponSkinMap;
      wyrmprintMapRef.current = loadedWyrmprintMap;

      setIsLoading(false);
    };

    loadMaps();
  }, []);


  if (isLoading) {
    return <div>Loading resources...</div>;
  }

  const getAccordion = (title, content) => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<img src={celesteballIcon} alt="Celeste Ball" style={{ width: 24, height: 24 }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {content}
        </AccordionDetails>
      </Accordion>
    );
  }

  // TODO: use states for user_data
  return (
    <div>
      <MappingContext.Provider value={
        {
          materialMap: materialMapRef.current, 
          dragonMap: dragonMapRef.current,
          summonTicketMap: summonTicketMapRef.current,
          weaponMap: weaponMapRef.current,
          weaponSkinMap: weaponSkinMapRef.current,
          wyrmprintMap: wyrmprintMapRef.current
        }
      }>
        {getAccordion("Basic User Data", <UserData/>)}
        {getAccordion("Mercurial Gauntlet", <QuestWallList/>)}
        {getAccordion("Summon Vouchers", <SummonTicketList/>)}
        {getAccordion("Materials", <MaterialList/>)}
        {getAccordion("Weapons", <WeaponList/>)}
        {getAccordion("Wyrmprints", <AbilityCrestList/>)}
        <Button variant="contained" color="primary" onClick={handlePrintSaveData}>
          Print saveData
        </Button>
        <Button variant="contained" color="primary" onClick={handleDownloadSaveData}>
          Download saveData
        </Button>
      </MappingContext.Provider>
    </div>
  );
}

export default SaveEditor;
export { MappingContext };