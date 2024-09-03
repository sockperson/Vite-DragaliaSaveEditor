const UPDATE_FILE_NAME = 'UPDATE_FILE_NAME';

function updateFileName(fileName) {
  return {
    type: UPDATE_FILE_NAME,
    payload: fileName,
  };
}

export { 
  UPDATE_FILE_NAME, updateFileName
};