import React from "react";
import {
  InputLabel,
  makeStyles,
  TextField as MuiTextField,
} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  TextField: {
    margin: 4,
  },
}));

export default function TextField(props) {
  const classes = useStyles();
  return (
    <div>
      <MuiTextField
        {...props}
        color={"secondary"}
        className={clsx(classes.TextField, props.className)}
        // label={props.label}
        variant={props.variant ? props.variant : "outlined"}
        size="small"
      >
        {props.selectOptions && props.selectOptions}
      </MuiTextField>
    </div>
  );
}
