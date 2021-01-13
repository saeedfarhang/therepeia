import React from "react";
import { Button as MuiButton, createMuiTheme, Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { borderRadius } from "@material-ui/system";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";
import { red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    red: {
      light: "#68f7ee",
      dark: "#00938c",
      main: "#1fc4bc",
      contrastText: "#ffffff",
    },
  },
});

const useStyle = makeStyles((theme) => ({
  root: {},
}));

export default function Button(props) {
  const classes = useStyle();
  const history = useHistory();

  const handleClick = () => {
    history.push(props.url);
  };

  return (
    <MuiButton
      {...props}
      type={props.type}
      variant={props.variant ? props.variant : "contained"}
      className={clsx(props.className, classes.root)}
      endIcon={props.endIcon}
      startIcon={props.startIcon}
      color={props.color}
      size={props.size}
      // onClick={props.onClick ? props.onClick : handleClick}
      style={props.fontSize ? { fontSize: props.fontSize } : props.style}
    >
      {props.text}
    </MuiButton>
  );
}
