import React, { useCallback } from 'react';
import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {auth} from "../../actions";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

interface BdcMenuState {
  auth: any
}

export default function BdcMenu() {
  const dispatch = useDispatch();
  const username = useSelector((state: BdcMenuState) => state.auth.username);
  const classes = useStyles();
  const logout = useCallback(
    () => dispatch(auth.logout()),
    [dispatch]
  );

  const renderLoginLogout = () => {
    if (username) {
      return (<Button color={"inherit"} onClick={logout}>Logout</Button>);
    }
    return (<Button component={Link} to={"/login"} color={"inherit"}>Login</Button>);
  }
  return (
    <div className={classes.root}>
      <AppBar position={"static"}>
        <Toolbar variant={"dense"}>
          <Button component={Link} to={"/"} color={"inherit"} className={classes.menuButton}>Home</Button>
          <Button component={Link} to={"/dashboard"} color={"inherit"}>Dashboard</Button>
          <Typography className={classes.title}></Typography>
          {renderLoginLogout()}
        </Toolbar>
      </AppBar>
    </div>
  )
}
