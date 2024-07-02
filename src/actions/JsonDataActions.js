const UPDATE_JSON_DATA = 'UPDATE_JSON_DATA';
const UPDATE_OBJECT_FIELD = 'UPDATE_OBJECT_FIELD';
const UPDATE_LIST_FIELD = 'UPDATE_LIST_FIELD';
const ADD_LIST_OBJECT = 'ADD_LIST_OBJECT';
const REPLACE_LIST_OBJECT = 'REPLACE_LIST_OBJECT';
const SET_LIST = 'SET_LIST';

function updateJsonData(jsonData) {
  return {
    type: UPDATE_JSON_DATA,
    payload: jsonData
  };
}

// used for updating fields in savedata objects such as "user_data"
// ex: modify Rupies value to 1000
// updateJsonDataObjectField("user_data", "coin", 1000)
function updateJsonDataObjectField(objectName, fieldName, value) {
  return {
    type: UPDATE_OBJECT_FIELD,
    payload: { objectName, fieldName, value }
  }
}

// used for updating fields in savedata list objects such as "weapon_list"
// ex: modify weapon with id 123 to level 80
// updateJsonDataListField("weapon_list", "weapon_body_id", 123, "buildup_count", 80)
function updateJsonDataListField(listName, idFieldName, id, fieldName, value) {
  return {
    type: UPDATE_LIST_FIELD,
    payload: { listName, idFieldName, id, fieldName, value }
  }
}

// used to add an object to a savedata list
// ex: add a new weapon to weapon_body_list
// addJsonDataListObject("weapon_body_list", weaponObject)
function addJsonDataListObject(listName, object) {
  return {
    type: ADD_LIST_OBJECT,
    payload: { listName, object }
  }
}

// used to replace an object to a savedata list
// ex: given a maxed out weapon object, replace a currently existing weapon in weapon_body_list
// replaceJsonDataListObject("weapon_body_list", "weapon_body_id", weaponObject)
function replaceJsonDataListObject(listName, idFieldName, object) {
  return {
    type: REPLACE_LIST_OBJECT,
    payload: { listName, idFieldName, object }
  }
}

// set list to a new list
// ex: replace weapon list with list of maxed weapons
// setList("weapon_body_list", maxedWeaponList)
function setList(listName, list) {
  return {
    type: SET_LIST,
    payload: { listName, list }
  }
}

export { 
  UPDATE_JSON_DATA, updateJsonData,
  UPDATE_OBJECT_FIELD, updateJsonDataObjectField,
  UPDATE_LIST_FIELD, updateJsonDataListField,
  ADD_LIST_OBJECT, addJsonDataListObject,
  REPLACE_LIST_OBJECT, replaceJsonDataListObject,
  SET_LIST, setList
};