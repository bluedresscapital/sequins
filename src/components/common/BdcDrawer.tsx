import React, {useCallback} from "react";
import PersonIcon from "@material-ui/icons/Person";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExploreIcon from "@material-ui/icons/Explore";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import AddIcon from "@material-ui/icons/Add";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {auth} from "../../actions";
import {useDispatch, useSelector} from "react-redux";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    user: {
      textAlign: "center",
      padding: "24px"
    },
  })
)

interface BdcDrawerState {
  auth: any
}

export default function BdcDrawer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const logout = useCallback(
    () => dispatch(auth.logout()),
    [dispatch]
  );
  const username = useSelector((state:BdcDrawerState) => state.auth.username);

  return (
    <div>
      <div className={classes.user}>
        <PersonIcon fontSize={"large"}/>
        {username === "" ? <ListItemText>Loading user...</ListItemText> :
          <ListItemText>
            Welcome, {username}!
          </ListItemText>}
      </div>
      <Divider variant={"middle"} />
      <List>
        <ListItem button component={Link} to={"/dashboard"}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText>Explore</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DonutLargeIcon />
          </ListItemIcon>
          <ListItemText>View Portfolios</ListItemText>
        </ListItem>
      </List>
      <Divider variant={"middle"}/>
      <List>
        <ListItem button>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText>Add Portfolio</ListItemText>
        </ListItem>
        <ListItem button component={Link} to={"/account"}>
          <ListItemIcon>
            <AccountBalanceIcon />
          </ListItemIcon>
          <ListItemText>Brokerages</ListItemText>
        </ListItem>
        <ListItem button component={Link} to={"/profile"}>
          <ListItemIcon>
            <SettingsIcon/>
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </ListItem>
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText>Sign Out</ListItemText>
        </ListItem>
      </List>
    </div>
  );
}