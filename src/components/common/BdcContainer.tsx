/*
* NOTE(ma): Lol a ton of this file's code is copy pasta from material ui
* Edit this file WITH EXTREME CAUTION :D
* */

import React, {useCallback} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {DARKER_BLUE, DARKEST_BLUE, LIGHTER_BLUE, PRIMARY_BLUE} from '../../Theme';
import {useSelector} from "react-redux";
import { Redirect } from 'react-router-dom';
import {auth} from "../../redux/actions";
import {useDispatch} from "react-redux";
import BdcDrawer from "./BdcDrawer";
import {Link} from 'react-router-dom';
import BdcLoadingBackdrop from "./BdcLoadingBackdrop";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    title: {
      flexGrow: 1,
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
      borderRight: "0px",
    },
    drawerChild: {
      borderRight: "0px",
    },
    appBar: {
      backgroundColor: DARKEST_BLUE,
      [theme.breakpoints.up('sm')]: {
        width: "100%",
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
      marginLeft: "8px",
    },
    // necessary for content to be below app bar
    toolbar: Object.assign(theme.mixins.toolbar, {
      padding: "0px",
    }),
    drawerPaper: {
      [theme.breakpoints.up('xs')]: {
        marginTop: "64px"
      },
      [theme.breakpoints.down('xs')]: {
        marginTop: "56px",
      },
      boxShadow: "0px 1px 7px #999",
      borderRight: "0px",
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: 0,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(3),
      width: 'auto',
      [theme.breakpoints.down('xs')]: {
        width: '150px',
        float: 'right',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
    },
    signout: {
      color: 'white'
    },
    homeLink: {
      color: 'white',
      textDecoration: 'none',
    },
    banner: {
      backgroundColor: DARKER_BLUE,
      [theme.breakpoints.up('xs')]: {
        height: "64px"
      },
      [theme.breakpoints.down('xs')]: {
        height: "56px",
      },
      padding: "15px",
      color: "white",
      display: "inline-block",
      minWidth: "240px",
      marginRight: "16px",
    }
  }),
);

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: any
  title: string
}

interface BdcContainerState {
  auth: any
}

export default function BdcContainer(props: Props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const dispatch = useDispatch();
  const logout = useCallback(
    () => dispatch(auth.logout()),
    [dispatch]
  );

  const username = useSelector((state:BdcContainerState) => state.auth.username);
  if (username == null) {
    return (<Redirect to={"/welcome"} />)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <BdcLoadingBackdrop open={username===""} />
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} elevation={0}>
        <Toolbar>
          <Hidden xsDown>
            <div className={classes.banner}>
              <Typography variant={"h6"} style={{margin: "0px"}}>
                <Link to={"/"} style={{color: "white", textDecoration: "none"}}>
                    <img
                      style={{
                        maxHeight: "30px",
                        backgroundColor: "rgb(255,255,255,0.3)",
                        borderRadius: "30%",
                        marginRight: "10px",
                      }}
                      src={"https://avatars3.githubusercontent.com/u/64178086?s=400&u=8e16687c519c5304d079b2182701af5bc30e3db6&v=4"}
                    />
                  Blue Dress Capital
                </Link>
              </Typography>
            </div>
          </Hidden>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {props.title}
          </Typography>
          <Typography className={classes.title}></Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <IconButton className={classes.signout} onClick={logout}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
              paperAnchorDockedLeft: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            className={classes.drawerChild}
          >
            <BdcDrawer />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
            className={classes.drawerChild}
          >
            <BdcDrawer />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div>
          {props.children}
        </div>
      </main>
    </div>
  );
}