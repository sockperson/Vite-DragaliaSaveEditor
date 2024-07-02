import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';

import FileInput from './components/input/FileInput';
import SaveEditor from './components/SaveEditor';
import { EditorState } from './enum/Enums';

function App() {

  const VERSION = "beta-1.0";

  const editorState = useSelector(state => state.editorState);

  const getEditorState = () => {
    switch (editorState) {
      case EditorState.VALID_JSON_IMPORTED:
        return <p>Valid JSON imported.</p>;
      case EditorState.INVALID_JSON_IMPORTED:
        return <p>Invalid JSON imported.</p>;
      case EditorState.SAVE_READ:
        return <p>Showing save editor.</p>;  
      case EditorState.DEFAULT:
        return <p>No JSON imported yet.</p>
      default:
        return <h1>Save editor is neutral.</h1>;
    }
  };

  const saveEditor = () => {
    if (editorState >= EditorState.SAVE_READ) {
      return (        
        <SaveEditor/>
      );
    }
    return <div></div>;
  };

  return (
      <div className="App">
        <header className="App-header">
          <h1>Dragalia Lost Save Editor</h1>
          <p>{VERSION}</p>
          {getEditorState()}
        </header>
        <FileInput />
        {saveEditor()}
      </div>
  );
}

export default App;
