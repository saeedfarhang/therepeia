import React from "react";
import ReactDOM from "react-dom";
import Routing from "./components/Routing";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {},
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Routing />
  </ThemeProvider>,
  document.getElementById("root")
);
