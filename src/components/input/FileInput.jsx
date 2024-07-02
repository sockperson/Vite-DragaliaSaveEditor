// https://www.filestack.com/fileschool/react/react-file-upload/
import React, {useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux'; 

import { updateJsonData } from '../../actions/JsonDataActions';
import { updateEditorState } from '../../actions/EditorStateActions';

import { EditorState } from '../../enum/Enums';

function FileInput() {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const editorState = useSelector(state => state.editorState);

  const handleChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const isValidJson = validateJson(text);
        
        const resultEditorState = isValidJson ? 
          EditorState.VALID_JSON_IMPORTED : 
          EditorState.INVALID_FILE_IMPORTED;
        setFile(uploadedFile);
        dispatch(updateEditorState(resultEditorState));
      };
      reader.readAsText(uploadedFile);
    }
  };

  const handleRead = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      try {
        const jsonData = JSON.parse(text);
        dispatch(updateJsonData(jsonData));
        dispatch(updateEditorState(EditorState.SAVE_READ));
      } catch (error) {
        console.error("Error parsing JSON: ", error);
        dispatch(updateJsonData(null));
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRead();
  };

  const validateJson = (text) => {
    try {
      JSON.parse(text);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Upload save data (.txt/.json)</h1>
        <input type="file" onChange={handleChange} ref={fileInputRef} />
        <button type="submit" disabled={editorState!==EditorState.VALID_JSON_IMPORTED}>Load Save</button>
      </form>
    </div>
  );
}

export default FileInput;