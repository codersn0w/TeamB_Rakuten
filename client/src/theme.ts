import {createMuiTheme, Theme} from "@material-ui/core/styles";

export const theme:Theme = createMuiTheme({
  palette: {
    primary: {
      light: "#BFEAE6",
      main: "#2BBBAD",
      dark: "#1E8279",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ff9865",
      main: "#ee6738",
      dark: "#b5360a",
      contrastText: "#ffffff",
    },
  },
});