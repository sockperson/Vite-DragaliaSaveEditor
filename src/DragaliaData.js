import materialList from './assets/lists/materials/materials.json';
import dragonList from './assets/lists/dragons/dragons.json';
import summonTicketList from './assets/lists/summon_ticket/summon_ticket.json';
import weaponList from './assets/lists/weapon/weapons.json';
import weaponSkinList from './assets/lists/weapon/weaponSkin.json';
import wyrmprintList from './assets/lists/wyrmprints/wyrmprints.json';

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

export default {
    getMaterialMap,
    getDragonMap,
    getSummonTicketMap,
    getWeaponMap,
    getWeaponSkinMap,
    getWyrmprintMap,
    getMaterialIdsByCategoryGroup
}