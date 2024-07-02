import { WyrmprintAvailability } from "../enum/Enums";

const subtractSets = (setA, setB) => {
    const resultSet = new Set();
    setA.forEach(element => {
        if (!setB.has(element)) {
            resultSet.add(element);
        }
    });
    return resultSet;
};

const getUniqueKeyId = (list, key_id_field_name) => {
    const key_id_set = getSetFromList(list, key_id_field_name);
    let keyId = 1;
    while (key_id_set.has(keyId)) {
        keyId++;
    }
    return keyId;
}

const findById = (list, id_field_name, value) => {
    return list.find(obj => obj[id_field_name] === value);
}

const filteredWeaponList = (weaponList, weaponTypeId, weaponSeries) => {
    return weaponList.filter(weapon => 
        weapon.WeaponTypeId === weaponTypeId && 
        weapon.WeaponSeries === weaponSeries &&
        weapon.IsPlayable === 1
    );
};

const filteredWyrmprintListByRarityAvailability = (wyrmprintList, rarity, wyrmprintAvilability) => {
    return wyrmprintList.filter(wyrmprint => 
        wyrmprint.Rarity === rarity && 
        wyrmprint.Availability === wyrmprintAvilability
    );
}

const filteredWyrmprintListByCharacter = (wyrmprintList, characterName) => {
    return wyrmprintList.filter(wyrmprint => 
        wyrmprint.FeaturedCharacters.includes(characterName)
    );
}

const printObj = (obj, text) => {
    if (text) {
        console.log(text, JSON.stringify(obj, null, 2));
    } else {
        console.log(JSON.stringify(obj, null, 2));
    }
}

const getFieldMapFromList = (list, idFieldName, fieldName) => {
    const fieldMap = {};
    list.forEach(obj => {
        fieldMap[obj[idFieldName]] = obj[fieldName];
    });
    return fieldMap;
}

export default {
    subtractSets,
    getUniqueKeyId,
    findById,
    filteredWeaponList,
    filteredWyrmprintListByRarityAvailability,
    filteredWyrmprintListByCharacter,
    printObj,
    getFieldMapFromList
}