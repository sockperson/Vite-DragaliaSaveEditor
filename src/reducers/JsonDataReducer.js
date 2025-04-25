import {
  UPDATE_JSON_DATA, UPDATE_OBJECT_FIELD, UPDATE_LIST_FIELD,
  ADD_LIST_OBJECT, REPLACE_LIST_OBJECT, SET_LIST,
  ADD_EDITOR_INFOS, REMOVE_LIST_OBJECT, RESET_LIST_OBJECT_LIST_FIELD,
  ADD_TO_OBJECT_LIST_OBJECT_FIELD, SET_OBJECT_OBJECT,
  ADD_OBJECT_FIELD, TOGGLE_LIST_FIELD
} from "../actions/JsonDataActions";

import { produce } from "immer";

const initialState = null;

function jsonDataReducer(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case UPDATE_JSON_DATA:
        return action.payload;
      case UPDATE_OBJECT_FIELD: {
        const { objectName, fieldName, value } = action.payload;
        if (!draft.data) {
          return;
        }
        if (!draft.data[objectName]) {
          draft.data[objectName] = {};
        }
        draft.data[objectName][fieldName] = value;
        break;
      }
      case ADD_OBJECT_FIELD: {
        const { objectName, fieldName, value } = action.payload;
        if (!draft.data) {
          return;
        }
        if (!draft.data[objectName]) {
          draft.data[objectName] = {};
        }
        if (!draft.data[objectName][fieldName]) {
          draft.data[objectName][fieldName] = 0;
        }
        draft.data[objectName][fieldName] += value;
        break;
      }
      case UPDATE_LIST_FIELD: {
        const { listName, idFieldName, id, fieldName, value } = action.payload;
        if (!draft.data[listName]) {
          console.warn(`List ${listName} not found in state.`);
          return;
        }
        const targetIndex = draft.data[listName].findIndex(item => item[idFieldName] === id);
        if (targetIndex === -1) {
          console.warn(`Item with ${idFieldName}=${id} not found in ${listName}.`);
          return;
        }
        draft.data[listName][targetIndex][fieldName] = value;
        break;
      }
      case TOGGLE_LIST_FIELD: {
        const { listName, idFieldName, id, fieldName } = action.payload;
        if (!draft.data[listName]) {
          console.warn(`List ${listName} not found in state.`);
          return;
        }
        const targetIndex = draft.data[listName].findIndex(item => item[idFieldName] === id);
        if (targetIndex === -1) {
          console.warn(`Item with ${idFieldName}=${id} not found in ${listName}.`);
          return;
        }
        const value = draft.data[listName][targetIndex][fieldName];
        if (value > 1 || value < 0) {
          console.warn(`Invalid value ${value} for ${fieldName} when attempting to TOGGLE_LIST_FIELD.`);
          return
        }
        draft.data[listName][targetIndex][fieldName] = value === 0 ? 1 : 0;
        break;
      }
      case ADD_LIST_OBJECT: {
        const { listName, object } = action.payload;
        if (!draft.data[listName]) {
          console.warn(`List ${listName} not found in state.`);
          return;
        }
        draft.data[listName].push(object);
        break;
      }
      case REMOVE_LIST_OBJECT: {
        const { listName, idFieldName, id } = action.payload;
        if (!draft.data[listName]) {
          console.warn(`List ${listName} not found in state.`);
          return;
        }
        const targetIndex = draft.data[listName].findIndex(item => item[idFieldName] === id);
        if (targetIndex === -1) {
          console.warn(`Item with ${idFieldName}=${id} not found in ${listName}.`);
          return;
        }
        draft.data[listName].splice(targetIndex, 1);
        break;
      }
      case REPLACE_LIST_OBJECT: {
        const { listName, idFieldName, object } = action.payload;
        if (!draft.data[listName]) {
          console.warn(`List ${listName} not found in state.`);
          return;
        }
        const targetIndex = draft.data[listName].findIndex(item => item[idFieldName] === object[idFieldName]);
        if (targetIndex === -1) {
          console.warn(`Item with ${idFieldName}=${object[idFieldName]} not found in ${listName}.`);
          return;
        }
        draft.data[listName][targetIndex] = object;
        break;
      }
      case SET_LIST: {
        const { listName, list } = action.payload;
        if (!draft.data[listName]) {
          console.warn(`List ${listName} not found in state.`);
          return;
        }
        draft.data[listName] = list;
        break;
      }
      case RESET_LIST_OBJECT_LIST_FIELD:
        const { listName, objectListName, objectListFieldName, id } = action.payload;
        if (!draft.data[listName]) {
          console.warn(`List ${listName} not found in state.`);
          return;
        }
        draft.data[listName].forEach(item => {
          item[objectListName].forEach(subItem => {
            if (subItem[objectListFieldName] === id) {
              subItem[objectListFieldName] = 0;
            }
          });
        });
        break;
      case ADD_TO_OBJECT_LIST_OBJECT_FIELD: {
        const { objectName, listName, idFieldName, id, valueFieldName, addValue } = action.payload;
        if (!draft.data[objectName]) {
          console.warn(`Object ${objectName} not found in state.`);
          return;
        }
        if (!draft.data[objectName][listName]) {
          console.warn(`List ${listName} not found in state.`);
          return;
        }
        let found = false;
        draft.data[objectName][listName].forEach(item => {
          if (item[idFieldName] === id) {
            item[valueFieldName] += addValue;
            found = true;
          }
        });
        if (!found) {
          console.warn(`Item with ${idFieldName}=${id} not found in ${listName}.`);
        }
        break;
      }
      case SET_OBJECT_OBJECT: {
        const { objectName, objectName2, object } = action.payload;
        if (!draft.data[objectName]) {
          console.warn(`Object ${objectName} not found in state.`);
          return;
        }
        draft.data[objectName][objectName2] = object;
        break;
      }
      case ADD_EDITOR_INFOS:
        const { version } = action.payload;
        const infos = {
          author: "sockperson",
          version: version,
          time: Math.floor(Date.now() / 1000)
        }
        draft.data.save_editor_info = infos;
        break;
    }
  });
}

export default jsonDataReducer;