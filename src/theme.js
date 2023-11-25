import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      }
    }
  }
});

export default theme;
