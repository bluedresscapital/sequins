import React, { Component } from 'react';
import { Button } from '@material-ui/core';

import BdcContainer from "./common/BdcContainer";

class Landing extends Component {
    render() {
        return (
            <BdcContainer>
                <h1>Landing!</h1>
                <Button variant="contained" color="primary">Hello!</Button>
            </BdcContainer>
        )
    }
}

export default Landing;