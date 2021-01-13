import React from "react";
import { IconButton as MuiIconButton, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "5px",
    padding: "3px 8px",
  },
}));

export default function IconButton(props) {
  const history = useHistory();
  const classes = useStyles();
  const handleClick = () => {
    history.push(props.url);
  };
  return (
    <MuiIconButton
      className={classes.button}
      {...props}
      color={props.color ? props.color : "inherit"}
    >
      {props.icon}
    </MuiIconButton>
  );
}
