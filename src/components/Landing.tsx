import React from 'react';
import {connect} from 'react-redux';
import { Button, ButtonGroup } from '@material-ui/core';
import { landing } from '../actions';

import BdcContainer from "./common/BdcContainer";

const Landing = props => {
  return (
    <BdcContainer>
      <h1>Landing!</h1>
      <p>{props.landing.num}</p>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button onClick={props.addNum}>Add</Button>
        <Button onClick={props.subNum}>Sub</Button>
        <Button onClick={props.resetNum}>Reset</Button>
      </ButtonGroup>
    </BdcContainer>
  )
}

const mapStateToProps = state => {
  return {
    landing: state.landing,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNum: () => dispatch(landing.addNum()),
    subNum: () => dispatch(landing.subNum()),
    resetNum: () => dispatch(landing.resetNum()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);