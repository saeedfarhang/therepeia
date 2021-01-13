import { makeStyles, Snackbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Alert } from "@material-ui/lab";

const useStyle = makeStyles((theme) => ({
  root: { marginTop: 50 },
}));

export default function Notification(props) {
  const classes = useStyle();
  const { notify, setNotify } = props;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({ ...notify, isOpen: false });
  };

  return (
    <Snackbar
      className={classes.root}
      open={notify.isOpen}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={props.duration ? props.duration : 4000}
      onClose={handleClose}
    >
      <Alert severity={notify.type} variant="filled" onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
