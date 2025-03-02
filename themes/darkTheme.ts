import { createTheme, ThemeOptions } from '@mui/material/styles';

export const darkTheme: ThemeOptions = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fbf7f7',
    },
    secondary: {
      main: '#318e81',
    },
    info: {
      main: '#ecc7c7',
    },
    background: {
      default: '#1E1E1E',
      paper: '#1E1E1E',
    },
    grey: {
      900: '#1E1E1E',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'fixed',
      },
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          height: 60,
        },
      },
    },
  },
});
