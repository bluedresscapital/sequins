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
import { PRIMARY_BLUE } from '../../Theme';
import {useSelector} from "react-redux";
import { Redirect } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {auth} from "../../actions";
import {useDispatch} from "react-redux";
import BdcDrawer from "./BdcDrawer";
import {Link} from 'react-router-dom';

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
    },
    appBar: {
      backgroundColor: PRIMARY_BLUE,
      [theme.breakpoints.up('sm')]: {
        width: "100%",
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      [theme.breakpoints.up('xs')]: {
        marginTop: "64px"
      },
      [theme.breakpoints.down('xs')]: {
        marginTop: "56px",
      },
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
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    homeLink: {
      color: 'white',
      textDecoration: 'none',
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
      <Backdrop className={classes.backdrop} open={username===""} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} elevation={0}>
        <Toolbar>
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
            <Link to={"/"} className={classes.homeLink}>
              Blue Dress Capital
            </Link>
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
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
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