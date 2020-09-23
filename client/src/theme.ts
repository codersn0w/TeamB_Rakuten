import {createMuiTheme, Theme} from "@material-ui/core/styles";
import { lime} from "@material-ui/core/colors";

export const theme:Theme = createMuiTheme({
  palette: {
    primary: {
      light: "#a7ffeb",
      main: lime["A700"],
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
  typography: {
    fontFamily: [
      "Noto Sans JP",
      "Lato",
      "游ゴシック Medium",
      "游ゴシック体",
      "Yu Gothic Medium",
      "YuGothic",
      "ヒラギノ角ゴ ProN",
      "Hiragino Kaku Gothic ProN",
      "メイリオ",
      "Meiryo",
      "ＭＳ Ｐゴシック",
      "MS PGothic",
      "sans-serif",
    ].join(","),
    fontWeightLight:300,
    fontWeightMedium:400,
    fontWeightBold:500,
  },
});