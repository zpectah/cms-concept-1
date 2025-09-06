import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  palette: {
    primary: {
      main: '#01719A',
    },
  },
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 800,
      letterSpacing: '-.025em',
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 700,
      textTransform: 'uppercase',
    },
    h3: {
      fontSize: '1.6rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.45rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.3rem',
      fontWeight: 300,
    },
    h6: {
      fontSize: '1.15rem',
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 300,
      textTransform: 'uppercase',
    },
    subtitle2: {
      fontWeight: 300,
    },
    body2: {
      fontSize: '.85rem',
    },
    button: {
      fontSize: '1rem',
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: () => ({
        html: {
          fontSize: '16px',
        },
        body: {
          fontSize: '1rem',
        },
        'html, body': {
          width: '100%',
          height: '100%',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
      }),
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCard: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiCardHeader: {
      defaultProps: {
        slotProps: {
          title: {
            variant: 'h4',
          },
        },
      },
    },
  },
});

export default theme;
