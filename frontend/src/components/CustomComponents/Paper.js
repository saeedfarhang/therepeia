import React from "react";
import { makeStyles, Paper as MuiPaper } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  paper: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: "none",
    padding: "30px 40px",
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
  },
  input: {
    margin: "8px 0",
    direction: "rtl",
  },
}));

export default function Paper(props) {
  const classes = useStyle();
  return <MuiPaper className={classes.paper}></MuiPaper>;
}
