import { createTheme, ThemeOptions } from '@mui/material/styles';

export const lightTheme: ThemeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1E1E1E',
    },
    secondary: {
      main: '#318e81',
    },
    info: {
      main: '#fff',
    },
    background: {
      default: '#fbf7f7',
      paper: '#fbf7f7',
    },
    warning: {
      main: '#3b5998',
    },
    grey: {
      900: '#f6ecec',
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'fixed',
      },
      styleOverrides: {
        root: {
          backgroundColor: '#f6ecec',
          height: 60,
        },
      },
    },
  },
});
