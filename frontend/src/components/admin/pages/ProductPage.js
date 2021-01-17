import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import Products from "../Products";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: 50,
  },
  paper: {
    padding: theme.spacing(2),

    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));
export default function ProductPage() {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Products />
      </Paper>
    </div>
  );
}
