import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff8a65',
    },
    secondary: {
      main: '#0d47a1',
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
