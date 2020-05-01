import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {PRIMARY_BLUE} from "../../Theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      backgroundColor: PRIMARY_BLUE,
      [theme.breakpoints.up('sm')]: {
        width: "100%",
      },
    },
    title: {
      flexGrow: 1,
    },
  })
)

export default function BdcUnauthorizedContainer(props) {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="fixed" className={classes.appBar} elevation={0}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Blue Dress Capital
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        {props.children}
      </div>
    </div>
  )
}