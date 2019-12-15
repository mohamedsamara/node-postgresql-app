import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1565c0',
    },
    secondary: {
      main: '#bbdefb',
    },
    special: {
      main: '#f44336',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#e8eaf6',
    },
  },
  typography: {
    fontFamily: '"Roboto Slab", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

export default theme;
