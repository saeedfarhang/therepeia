import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import Routing from "./components/Routing";

const themeltr = createMuiTheme({
  direction: "ltr",
});

const theme = createMuiTheme({
  overrides: {
    MuiSelect: {
      select: {
        "&:focus": { borderRadius: 25 },
      },
    },
  },
  direction: "rtl",
  palette: {
    type: "light",
    primary: {
      light: "#ffffff",
      dark: "#aeaeae",
      main: "#e0e0e0",
      contrastText: "#424242",
    },
    secondary: {
      light: "#68f7ee",
      dark: "#00938c",
      main: "#1fc4bc",
      contrastText: "#ffffff",
    },
  },
  shape: {
    borderRadius: 15,
  },

  // shadows:[none],
  typography: {
    fontFamily: ["shabnam", "Roboto"].join(","),
  },
});

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function RTL(props) {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <StylesProvider jss={jss}>
      <Routing />
    </StylesProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
