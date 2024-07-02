import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';

import FileInput from './components/input/FileInput';
import SaveEditor from './components/SaveEditor';
import { EditorState } from './enum/Enums';

function App() {

  const editorState = useSelector(state => state.editorState);

  const checkHappy = () => {
    if (editorState === EditorState.VALID_JSON_IMPORTED) {
      return <h1>Save editor is happy.</h1>;
    }
    return <h1>Save editor is sad.</h1>;
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
          {checkHappy()}
        </header>
        <FileInput />
        {saveEditor()}
      </div>
  );
}

export default App;
