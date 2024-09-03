const subtractSets = (setA, setB) => {
    const resultSet = new Set();
    setA.forEach(element => {
        if (!setB.has(element)) {
            resultSet.add(element);
        }
    });
    return resultSet;
};

const getSetFromList = (list, field_name) => {
    const resultSet = new Set();
    list.forEach(obj => {
        resultSet.add(obj[field_name]);
    });
    return resultSet;
}

const listHasValue = (list, field_name, value) => {
    return list.some(obj => obj[field_name] === value);
}

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

const checkForDuplicateValues = (list, field_name) => {
    const set = new Set();
    const duplicates = [];
    list.forEach(obj => {
        const value = obj[field_name];
        if (set.has(value)) {
            duplicates.push(value);
        } else {
            set.add(value);
        }
    });
    return duplicates;
}

const filteredWeaponList = (weaponList, weaponTypeId, weaponSeries) => {
    return weaponList.filter(weapon => 
        weapon.WeaponTypeId === weaponTypeId && 
        weapon.WeaponSeries === weaponSeries &&
        weapon.IsPlayable === 1
    );
};

const filteredAdventurerList = (adventurerList, elementTypeId, weaponTypeId) => {
    return adventurerList.filter(adventurer => 
        adventurer.ElementalTypeId === elementTypeId && 
        adventurer.WeaponTypeId === weaponTypeId &&
        adventurer.IsPlayable === 1
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

const getFieldsMapFromList = (list, idFieldName, ...fieldNames) => {
    const fieldMap = {};
    list.forEach(obj => {
        fieldMap[obj[idFieldName]] = fieldNames.map(fieldName => obj[fieldName]);
    });
    return fieldMap;
}

const getTalismanEquippedParty = (partyList, talismanKeyId) => {
    // iterate through partyList and search each object in 
    // party_setting_list for matching equip_talisman_key_id
    for (let i = 0; i < partyList.length; i++) {
        const partySettingList = partyList[i].party_setting_list;
        for (let j = 0; j < partySettingList.length; j++) {
            if (partySettingList[j].equip_talisman_key_id === talismanKeyId) {
                return partyList[i].party_no;
            }
        }
    }
    return -1;
}

const getDragonEquippedParty = (partyList, dragonKeyId) => {
    for (let i = 0; i < partyList.length; i++) {
        const partySettingList = partyList[i].party_setting_list;
        for (let j = 0; j < partySettingList.length; j++) {
            if (partySettingList[j].equip_dragon_key_id === dragonKeyId) {
                return partyList[i].party_no;
            }
        }
    }
    return -1;
}

const sumFields = (object, ...fieldNames) => {
    return fieldNames.reduce((total, fieldName) => {
        return total + (object[fieldName] || 0);
    }, 0);
}

export default {
    subtractSets,
    getUniqueKeyId,
    findById,
    filteredWeaponList,
    filteredAdventurerList,
    filteredWyrmprintListByRarityAvailability,
    filteredWyrmprintListByCharacter,
    printObj,
    getFieldMapFromList,
    getFieldsMapFromList,
    getTalismanEquippedParty,
    getDragonEquippedParty,
    sumFields,
    getSetFromList,
    listHasValue,
    checkForDuplicateValues
}