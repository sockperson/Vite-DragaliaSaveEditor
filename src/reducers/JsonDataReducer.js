import { 
  UPDATE_JSON_DATA, UPDATE_OBJECT_FIELD, UPDATE_LIST_FIELD, 
  ADD_LIST_OBJECT, REPLACE_LIST_OBJECT, SET_LIST
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
      case ADD_LIST_OBJECT: {
        const { listName, object } = action.payload;
        if (!draft.data[listName]) {
          console.warn(`List ${listName} not found in state.`);
          return;
        }
        draft.data[listName].push(object);
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
    }
  });
}
  
export default jsonDataReducer;