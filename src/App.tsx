import './App.css';
import { MainContent } from './components/index';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CoreContextProvider } from './shared';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CoreContextProvider>
        <MainContent />
      </CoreContextProvider>
    </ThemeProvider>
  );
}

export default App;
