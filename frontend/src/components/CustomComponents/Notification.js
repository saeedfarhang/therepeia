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

/* after import Notifications from CustomComponents:
  add this state to component:

    const [notify, setNotify] = useState({
      isOpen: false,
      message: "",
      type: "",
    });

  and use this to open it:

    setNotify({
      isOpen: true,
      message: "مشکلی وجود دارد",
      type: "error",
    });

  then add this in component return:

    <Notification notify={notify} setNotify={setNotify} />
  */
