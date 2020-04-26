import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
});

class BdcMenu extends Component {
    render() {
        return (
            <AppBar position={"static"}>
                <Toolbar variant={"dense"}>
                    <Button component={Link} to={"/"} color={"inherit"}>Home</Button>
                    <Button component={Link} to={"/dashboard"} color={"inherit"}>Dashboard</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(useStyles)(BdcMenu);