import React, { Component } from 'react';
import { Container } from '@material-ui/core';

import BdcMenu from "./BdcMenu";

class BdcContainer extends Component {
    render() {
        return (
            <div>
                <BdcMenu />
                <Container maxWidth={"sm"}>
                    {this.props.children}
                </Container>
            </div>

        )
    }
}

export default BdcContainer;