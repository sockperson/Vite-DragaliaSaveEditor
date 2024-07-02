import { UPDATE_EDITOR_STATE } from "../actions/EditorStateActions";
import { EditorState } from "../enum/Enums";

const initialState = EditorState.DEFAULT;

function editorStateReducer(state = initialState, action) {
    switch (action.type) {
      case UPDATE_EDITOR_STATE:
        return action.payload;
      default:
        return state;
    }
  }
  
  export default editorStateReducer;