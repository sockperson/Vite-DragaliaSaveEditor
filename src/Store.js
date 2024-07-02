import { configureStore, combineReducers } from '@reduxjs/toolkit';

import editorStateReducer from './reducers/EditorStateReducer';
import jsonDataReducer from './reducers/JsonDataReducer';

const rootReducer = combineReducers({
  editorState: editorStateReducer,
  jsonData: jsonDataReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;