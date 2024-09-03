import React, {useState, useRef, useEffect, createContext} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { addEditorInfos } from '../actions/JsonDataActions';

import UserData from './lists/UserData/UserData';
import QuestWallList from './lists/QuestWallList/QuestWallList';
import MaterialList from './lists/MaterialList/MaterialList';
import SummonTicketList from './lists/SummonTicketList/SummonTicketList';
import WeaponList from './lists/WeaponList/WeaponList';
import AbilityCrestList from './lists/AbilityCrestList/AbilityCrestList';
import TalismanList from './lists/TalismanList/TalismanList';
import FortBonusList from './lists/FortBonusList/FortBonusList';
import CharaList from './lists/CharaList/CharaList';
import DragonList from './lists/DragonList/DragonList';

import ExportButton from './output/ExportButton';

import DragaliaData from '../DragaliaData';
import useRepairUtils from '../util/RepairUtils';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import celesteballIcon from '../assets/icons/celesteball.png';
import eudenIcon from '../assets/icons/euden.png';
import goldCrystalIcon from '../assets/icons/goldCrystal.png';
import summonVoucherIcon from '../assets/icons/summonVoucher.png';
import squishumsIcon from '../assets/icons/squishums.png';
import wyrmprintIcon from '../assets/icons/wyrmprint.png';
import swordUpgradeIcon from '../assets/icons/swordUpgrade.png';
import portraitWyrmprintStarIcon from '../assets/icons/portraitWyrmprintStar.png';
import hpStrengthIcon from '../assets/icons/hpStrength.png';
import dragonUpIcon from '../assets/icons/dragonUp.png';
import euden2Icon from '../assets/icons/euden2.png';

const MappingContext = createContext();

function SaveEditor({ editorVersion }) {

  const dispatch = useDispatch();

  const jsonData = useSelector(state => state.jsonData);
  const userName = useSelector(state => state.jsonData.data.user_data.name);

  // Resources
  const materialMapRef = useRef(null);
  const dragonMapRef = useRef(null);
  const summonTicketMapRef = useRef(null);
  const weaponMapRef = useRef(null);
  const weaponSkinMapRef = useRef(null);
  const wyrmprintMapRef = useRef(null);
  const adventurerMapRef = useRef(null);
  const portraitWyrmprintMapRef = useRef(null);
  const abilityMapRef = useRef(null);
  const charaStoryMapRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [neededRepair, setNeededRepair] = useState(false);
  const [repairResults, setRepairResults] = useState([]);
  const [areMapsLoaded, setAreMapsLoaded] = useState(false);

  // Handle loading resources
  useEffect(() => {
    const loadMaps = async () => {
      const [
        loadedMaterialMap, 
        loadedDragonMap, 
        loadedSummonTicketMap, 
        loadedWeaponMap, 
        loadedWeaponSkinMap, 
        loadedWyrmprintMap,
        loadedAdventurerMap,
        loadedPortraitWyrmprintMap,
        loadedAbilityMap,
        loadedCharaStoryMap
      ] = await Promise.all([
        DragaliaData.getMaterialMap(),
        DragaliaData.getDragonMap(),
        DragaliaData.getSummonTicketMap(),
        DragaliaData.getWeaponMap(),
        DragaliaData.getWeaponSkinMap(),
        DragaliaData.getWyrmprintMap(),
        DragaliaData.getAdventurerMap(),
        DragaliaData.getPortraitWyrmprintMap(),
        DragaliaData.getAbilityMap(),
        DragaliaData.getCharaStoryMap()
      ]);

      materialMapRef.current = loadedMaterialMap;
      dragonMapRef.current = loadedDragonMap;
      summonTicketMapRef.current = loadedSummonTicketMap;
      weaponMapRef.current = loadedWeaponMap;
      weaponSkinMapRef.current = loadedWeaponSkinMap;
      wyrmprintMapRef.current = loadedWyrmprintMap;
      adventurerMapRef.current = loadedAdventurerMap;
      portraitWyrmprintMapRef.current = loadedPortraitWyrmprintMap;
      abilityMapRef.current = loadedAbilityMap;   
      charaStoryMapRef.current = loadedCharaStoryMap;   

      dispatch(addEditorInfos(editorVersion));
      setIsLoading(false);
      setAreMapsLoaded(true);
    };

    loadMaps();
  }, []);

  const maps = {
    materialMap: materialMapRef.current, 
    dragonMap: dragonMapRef.current,
    summonTicketMap: summonTicketMapRef.current,
    weaponMap: weaponMapRef.current,
    weaponSkinMap: weaponSkinMapRef.current,
    wyrmprintMap: wyrmprintMapRef.current,
    adventurerMap: adventurerMapRef.current,
    portraitWyrmprintMap: portraitWyrmprintMapRef.current,
    abilityMap: abilityMapRef.current,
    charaStoryMap: charaStoryMapRef.current
  };

  const runRepair = async (results, repair, ...input) => {
    const [repaired, info] = await repair(...input);
    if (repaired) {
      setNeededRepair(true);
      results.push(info);
    }
  }

  const { repairDragonStories } = useRepairUtils(maps);

  useEffect(() => {
    if (areMapsLoaded) {
      const repairSave = async () => {
        const results = [];
        await runRepair(results, repairDragonStories);
        setRepairResults(results);
      };
      repairSave();
    }
  }, [areMapsLoaded]);

  if (isLoading) {
    return <div>Loading resources...</div>;
  }

  const getWelcome = () => {
    return (
      <div style={{ marginBottom: '20px' }}>
        {`Hello ${userName}!`}
      </div>
    );
  };

  const getRepairResults = () => {
    if (neededRepair) {
      return (
        <div>
          <p>Some data was repaired.</p>
          <ul>
            {repairResults.map((result, index) => <li key={index}>{result}</li>)}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }

  const getAccordion = (title, content, icon) => {
    const src = icon ? icon : celesteballIcon;
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<img src={src} alt="Celeste Ball" style={{ width: 32, height: 32 }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{ marginLeft: '16px' }}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {content}
        </AccordionDetails>
      </Accordion>
    );
  }

  return (
    <div style={{ height: '100vh' }}>
      <MappingContext.Provider value={maps}>
        {getRepairResults()}
        {getWelcome()}
        {getAccordion("Basic User Data", <UserData/>, eudenIcon)}
        {getAccordion("Mercurial Gauntlet", <QuestWallList/>, goldCrystalIcon)}
        {getAccordion("Summon Vouchers", <SummonTicketList/>, summonVoucherIcon)}
        {getAccordion("Materials", <MaterialList/>, squishumsIcon)}
        {getAccordion("Weapons", <WeaponList/>, swordUpgradeIcon)}
        {getAccordion("Wyrmprints", <AbilityCrestList/>, wyrmprintIcon)}
        {getAccordion("Portrait Wyrmprints", <TalismanList/>, portraitWyrmprintStarIcon)}
        {getAccordion("Stat Bonuses", <FortBonusList/>, hpStrengthIcon)}
        {getAccordion("Adventurers", <CharaList/>, euden2Icon)}
        {getAccordion("Dragons", <DragonList/>, dragonUpIcon)}
        <ExportButton />
      </MappingContext.Provider>
    </div>
  );
}

export default SaveEditor;
export { MappingContext };