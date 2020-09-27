import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const font = '"Open Sans", sans-serif';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3d5afe',
    },
    secondary: {
      main: '#1976d2',
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
    fontFamily: font,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

export default theme;
