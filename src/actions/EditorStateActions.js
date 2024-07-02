const UPDATE_EDITOR_STATE = 'UPDATE_EDITOR_STATE';

function updateEditorState(editorState) {
  return {
    type: UPDATE_EDITOR_STATE,
    payload: editorState,
  };
}

export { 
    UPDATE_EDITOR_STATE, updateEditorState
};