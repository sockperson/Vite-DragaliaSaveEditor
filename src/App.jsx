import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';

import { useSelector } from 'react-redux';
import './App.css';

import FileInput from './components/input/FileInput';
import SaveEditor from './components/SaveEditor';
import { EditorState } from './enum/Enums';
import ErrorBoundary from './ErrorBoundary';

function App() {

  const VERSION = "beta-1.1";

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
        return <h1>Unrecognized editor state.</h1>;
    }
  };

  const saveEditor = () => {
    if (editorState >= EditorState.SAVE_READ) {
      return (        
        <SaveEditor editorVersion={VERSION}/>
      );
    }
    return <div></div>;
  };

  return (
    <ErrorBoundary>
      <div className="App" style={{ height: '100vh', overflowY: 'auto' }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="github" 
              href="https://github.com/sockperson/Vite-DragaliaSaveEditor"
              target="_blank" rel="noopener noreferrer"
            >
              <GitHubIcon />
            </IconButton>
            <Typography variant="h6" style={{ 
              flexGrow: 0, 
              marginLeft: '16px',
              fontFamily: '"ITC Avant Garde Gothic Condensed Bold", sans-serif' 
            }}>
              Dragalia Lost Save Editor
            </Typography>
            <div style={{ flexGrow: 1 }}></div>
            <Typography variant="h6" style={{ 
              flexGrow: 0, 
              marginRight: '16px',
              fontFamily: '"ITC Avant Garde Gothic Condensed Bold", sans-serif' 
            }}>
              {VERSION}
            </Typography>
          </Toolbar>
        </AppBar>
        <header className="App-header" style={{marginTop: '30px'}}>
          {getEditorState()}
        </header>
        <FileInput />
        {saveEditor()}
      </div>
    </ErrorBoundary>
  );
}

export default App;
