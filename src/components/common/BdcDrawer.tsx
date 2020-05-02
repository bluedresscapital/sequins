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
import {auth} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import {DARKER_BLUE, HINT_OF_BLUE} from "../../Theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    user: {
      backgroundColor: HINT_OF_BLUE,
      textAlign: "center",
      padding: "24px",
    },
    selected: {
      color: DARKER_BLUE,
    },
    unselected: {
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
  const { pathname } = useLocation();

  return (
    <div>
      <div className={classes.user}>
        <PersonIcon fontSize={"large"}/>
        {username === "" ? <ListItemText>Loading user...</ListItemText> :
          <ListItemText>
            Welcome, {username}!
          </ListItemText>}
      </div>
      <List>
        {[
          { link: "/dashboard", icon: <DashboardIcon />, text: "Dashboard"},
          { link: "/", icon: <ExploreIcon />, text: "Explore"},
          { link: "/portfolios/view", icon: <DonutLargeIcon/>, text: "View Portfolios"},
        ].map(({ link, icon, text}, i) => (
          <ListItem button component={Link} to={link} className={pathname===link ? classes.selected : classes.unselected} key={i}>
            <ListItemIcon className={pathname===link ? classes.selected : classes.unselected}>
              {icon}
            </ListItemIcon>
            <ListItemText>{text}</ListItemText>
          </ListItem>
          ))}
      </List>
      <Divider variant={"middle"}/>
      <List>
        {[
          { link: "/portfolios/add", icon: <AddIcon />, text: "Add Portfolio"},
          { link: "/account", icon: <AccountBalanceIcon/>, text: "Brokerages"},
          { link: "/profile", icon: <SettingsIcon/>, text: "Settings"},
        ].map(({ link, icon, text}, i) => (
          <ListItem button component={Link} to={link} className={pathname===link ? classes.selected : classes.unselected} key={i}>
            <ListItemIcon className={pathname===link ? classes.selected : classes.unselected}>
              {icon}
            </ListItemIcon>
            <ListItemText>{text}</ListItemText>
          </ListItem>
        ))}
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