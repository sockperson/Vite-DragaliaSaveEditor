import materialList from './assets/lists/materials/materials.json';
import dragonList from './assets/lists/dragons/dragons.json';
import summonTicketList from './assets/lists/summon_ticket/summon_ticket.json';
import weaponList from './assets/lists/weapon/weapons.json';
import weaponSkinList from './assets/lists/weapon/weaponSkin.json';
import wyrmprintList from './assets/lists/wyrmprints/wyrmprints.json';
import adventurerList from './assets/lists/adventurers/adventurers.json';
import charaStoryList from './assets/lists/adventurers/CharaStories.json';
import portraitWyrmprintList from './assets/lists/wyrmprints/portraitWyrmprints.json';
import abilityList from './assets/lists/ability/abilities.json';

import JsonUtils from './util/JsonUtils';
import { MaterialCategoryMap } from './definitions/Definitions';

import { MaterialCategoryGroup } from './enum/Enums';

const getMaterialMap = () => {
  let materialMap = {};
  materialList.forEach(material => {
    materialMap[parseInt(material.Id)] = material;
  });
  return materialMap;
}

const getDragonMap = () => {
    let dragonMap = {};
    dragonList.forEach(dragon => {
        dragonMap[parseInt(dragon.Id)] = dragon;
    });
    return dragonMap;
}

const getSummonTicketMap = () => {
  let summonTicketMap = {};
  summonTicketList.forEach(summonTicket => {
    summonTicketMap[parseInt(summonTicket.Id)] = summonTicket;
  });
  return summonTicketMap;
}

const getWeaponMap = () => {
  let weaponMap = {};
  weaponList.forEach(weapon => {
    weaponMap[parseInt(weapon.Id)] = weapon;
  });
  return weaponMap;
}

const getMap = (list) => {
  let map = {};
  list.forEach(item => {
    map[parseInt(item.Id)] = item;
  });
  return map;
}

// same as above but with non-hardcoded ID field
const getMapByKey = (list, idFieldName) => {
  let map = {};
  list.forEach(item => {
    map[parseInt(item[idFieldName])] = item;
  });
  return map;
}

const getMaterialIdsByCategoryGroup = (materialMap) => {
  const out = {};
  // initialize empty list for each category group
  Object.values(MaterialCategoryGroup).forEach(materialCategoryGroup => {
    out[materialCategoryGroup] = [];
  });

  // populate list with material IDs
  Object.entries(materialMap).forEach(([key, value]) => {
    if (value.Category === undefined) {
      out[0].push(parseInt(key));
    } else {
      out[MaterialCategoryMap[value.Category]].push(parseInt(key));
    }
  });

  return out;
}

const getWeaponSkinMap = () => { return getMap(weaponSkinList); }
const getWyrmprintMap = () => { return getMap(wyrmprintList); }
const getAdventurerMap = () => { return getMapByKey(adventurerList, "IdLong"); }
const getPortraitWyrmprintMap = () => { return getMap(portraitWyrmprintList); }
const getAbilityMap = () => { return getMap(abilityList); }
const getCharaStoryMap = () => { return charaStoryList; }

// merge two maps
const addField = () => {
  const map1 = getMap(weaponList);
  const map2 = getMap(weaponList2);
  const addField = "HasWeaponBonus";
  for (let key in map1) {
    map1[key][addField] = map2[key][addField];
  }
  console.log("Output: ", Object.values(map1));
}

export default {
    getMaterialMap,
    getDragonMap,
    getSummonTicketMap,
    getWeaponMap,
    getWeaponSkinMap,
    getWyrmprintMap,
    getMaterialIdsByCategoryGroup,
    getAdventurerMap,
    getPortraitWyrmprintMap,
    getAbilityMap,
    getCharaStoryMap,
    addField
}