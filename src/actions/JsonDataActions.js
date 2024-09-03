const UPDATE_JSON_DATA = 'UPDATE_JSON_DATA';
const UPDATE_OBJECT_FIELD = 'UPDATE_OBJECT_FIELD';
const ADD_OBJECT_FIELD = 'ADD_OBJECT_FIELD';
const UPDATE_LIST_FIELD = 'UPDATE_LIST_FIELD';
const TOGGLE_LIST_FIELD = 'TOGGLE_LIST_FIELD';
const ADD_LIST_OBJECT = 'ADD_LIST_OBJECT';
const REPLACE_LIST_OBJECT = 'REPLACE_LIST_OBJECT';
const SET_LIST = 'SET_LIST';
const REMOVE_LIST_OBJECT = 'REMOVE_LIST_OBJECT';
const RESET_LIST_OBJECT_LIST_FIELD = 'RESET_LIST_OBJECT_LIST_FIELD';
const ADD_TO_OBJECT_LIST_OBJECT_FIELD = 'ADD_TO_OBJECT_LIST_OBJECT_FIELD';
const SET_OBJECT_OBJECT = 'SET_OBJECT_OBJECT';

const ADD_EDITOR_INFOS = 'ADD_EDITOR_INFOS';

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

// used to add to field in savedata objects such as "user_data"
// ex: add 1000 to Rupies value
// addJsonDataObjectField("user_data", "coin", 1000)
function addJsonDataListObjectField(objectName, fieldName, value) {
  return {
    type: ADD_OBJECT_FIELD,
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

// used to toggle 0/1 values in savedata list object such as "dragon_list"
// ex: toggle dragon with id 123 to be locked
// updateJsonDataListField("dragon_list", "dragon_key_id", 123, "is_lock")
function toggleJsonDataListField(listName, idFieldName, id, fieldName) {
  return {
    type: TOGGLE_LIST_FIELD,
    payload: { listName, idFieldName, id, fieldName }
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

// used to remove an object from a savedata list
// ex: remove a talisman from talisman_list
// removeJsonDataListObject("talisman_list", "talisman_key_id", talismanKeyId)
// note both ids and keyids can be used; shouldn't really matter
function removeJsonDataListObject(listName, idFieldName, id) {
  return {
    type: REMOVE_LIST_OBJECT,
    payload: { listName, idFieldName, id }
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

// reset a field in a list-object-list to 0
// ex: in "party_list", go through each party object and set the value of
// "equip_talisman_key_id" in "party_setting_list" to 0, if "equip_talisman_key_id" is a specific id
function resetListObjectListField(listName, objectListName, objectListFieldName, id) {
  return {
    type: RESET_LIST_OBJECT_LIST_FIELD,
    payload: { listName, objectListName, objectListFieldName, id }
  }
}

// add a value to a field in an object-list-object
// ex: in "fort_bonus_list", go through a list and add to a field with matching id
// objectName: "fort_bonus_list"
// listName: "param_bonus"
// idFieldName: "weapon_type"
// id: 1
// valueFieldName: "hp"
// addValue: 1.0
function addToObjectListObjectField(objectName, listName, idFieldName, id, valueFieldName, addValue) {
  return {
    type: ADD_TO_OBJECT_LIST_OBJECT_FIELD,
    payload: { objectName, listName, idFieldName, id, valueFieldName, addValue }
  }
}

// set an object in a savedata object
// ex: set "param_bonus" in "fort_bonus_list"
function setObjectObject(objectName, objectName2, object) {
  return {
    type: SET_OBJECT_OBJECT,
    payload: { objectName, objectName2, object }
  }
}

// adds editor infos to data
function addEditorInfos(version) {
  return {
    type: ADD_EDITOR_INFOS,
    payload: { version }
  }
}

export { 
  UPDATE_JSON_DATA, updateJsonData,
  UPDATE_OBJECT_FIELD, updateJsonDataObjectField,
  ADD_OBJECT_FIELD, addJsonDataListObjectField,
  UPDATE_LIST_FIELD, updateJsonDataListField,
  TOGGLE_LIST_FIELD, toggleJsonDataListField,
  ADD_LIST_OBJECT, addJsonDataListObject,
  REMOVE_LIST_OBJECT, removeJsonDataListObject,
  REPLACE_LIST_OBJECT, replaceJsonDataListObject,
  SET_LIST, setList,
  RESET_LIST_OBJECT_LIST_FIELD, resetListObjectListField,
  ADD_TO_OBJECT_LIST_OBJECT_FIELD, addToObjectListObjectField,
  SET_OBJECT_OBJECT, setObjectObject,
  ADD_EDITOR_INFOS, addEditorInfos
};