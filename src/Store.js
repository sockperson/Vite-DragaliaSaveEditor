import { configureStore, combineReducers } from '@reduxjs/toolkit';

import editorStateReducer from './reducers/EditorStateReducer';
import jsonDataReducer from './reducers/JsonDataReducer';
import fileNameReducer from './reducers/FileNameReducer';

const rootReducer = combineReducers({
  editorState: editorStateReducer,
  jsonData: jsonDataReducer,
  fileName: fileNameReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;