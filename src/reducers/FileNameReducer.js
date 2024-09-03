import { UPDATE_FILE_NAME } from "../actions/FileNameActions";

const initialState = "savedata.txt";

function fileNameReducer(state = initialState, action) {
    switch (action.type) {
      case UPDATE_FILE_NAME:
        return action.payload;
      default:
        return state;
    }
  }
  
  export default fileNameReducer;