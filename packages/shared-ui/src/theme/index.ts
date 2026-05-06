import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: 'rgb(10, 65, 102)' },   
    secondary: { main: '#e5273c' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
  },
});