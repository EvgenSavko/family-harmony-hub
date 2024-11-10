import React from 'react';
import './App.css';
import { MainContent } from './components/index';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainContent />
    </ThemeProvider>
  );
}

export default App;
