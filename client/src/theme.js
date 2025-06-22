import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#147247',
      accent: '#a7ffeb',
    },
    secondary: {
      main: '#4CAF50',
    },
    text: {
      primary: '#212529',
      onDark: '#FFFFFF',
      onLight: '#0A3A2C',
    },
    background: {
      default: '#F9FAFB', 
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

export default theme;