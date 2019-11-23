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
    error: {
      main: red.A400,
    },
    background: {
      default: '#e8eaf6',
    },
  },
});

export default theme;
