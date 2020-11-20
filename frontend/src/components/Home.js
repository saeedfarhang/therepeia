import React, { Fragment, useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import Axios from "axios";
import { axiosInstance } from "../axios";
import { makeStyles } from "@material-ui/styles";
import { isLoggedIn, UserId } from "../UserState";
import { func } from "prop-types";

const useStyle = makeStyles({
  root: {
    height: "100vh",
  },
});

export default function App() {
  const classes = useStyle();

  // console.log("user is", UserId());
  const [user, setUser] = useState({});
  useEffect(() => {
    axiosInstance.get(`accounts/getuser/${UserId()}/`).then((res) => {
      setUser(res.data);
    });
  }, []);

  console.log(user);
  return (
    <Grid
      container
      alignItems="center"
      alignContent="center"
      className={classes.root}
      justify="center"
    >
      <Grid item>
        <Typography align="center" variant="h1">
          changes apllies
        </Typography>

        <Typography align="center" variant="body1">
          we're provide some new functionality on this site. we will comming
          soon!
        </Typography>
      </Grid>
    </Grid>
  );
}
