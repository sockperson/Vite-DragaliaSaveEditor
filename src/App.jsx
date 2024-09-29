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

  const VERSION = "beta-1.3";

  const editorState = useSelector(state => state.editorState);

  const getEditorState = () => {
    switch (editorState) {
      case EditorState.VALID_JSON_IMPORTED:
        return <p>Valid JSON imported.</p>;
      case EditorState.INVALID_FILE_IMPORTED:
        return <p>Invalid file imported.</p>;
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
        <AppBar position="static" className="app-bar">
          <Toolbar style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <IconButton edge="start" color="inherit" aria-label="github" 
              href="https://github.com/sockperson/Vite-DragaliaSaveEditor"
              target="_blank" rel="noopener noreferrer"
            >
              <GitHubIcon />
            </IconButton>
            <Typography variant="h6" style={{ 
              flexGrow: 1, 
              marginLeft: '16px',
              fontFamily: '"ITC Avant Garde Gothic Condensed Bold", sans-serif',
              textAlign: 'left'
            }}>
              Dragalia Lost Save Editor
            </Typography>
            <Typography variant="h6" style={{ 
              flexGrow: 0, 
              marginRight: '16px',
              fontFamily: '"ITC Avant Garde Gothic Condensed Bold", sans-serif' 
            }}>
              {VERSION}
            </Typography>
          </Toolbar>
        </AppBar>
        <header className="App-header" style={{ marginTop: '30px', padding: '20px' }}>
          {getEditorState()}
        </header>
        <FileInput />
        {saveEditor()}
      </div>
      <style>
        {`
          @media (max-width: 600px) {
            .App-header {
              margin-top: 50px !important;
            }
            .MuiTypography-h6 {
              font-size: 1rem;
            }
            .MuiToolbar-root {
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
            }
            .MuiIconButton-root {
              margin-bottom: 0;
            }
          }
        `}
      </style>
    </ErrorBoundary>
  );
}

export default App;
