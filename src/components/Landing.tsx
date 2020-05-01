import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup } from '@material-ui/core';
import { landing } from '../redux/actions';

import BdcContainer from "./common/BdcContainer";

interface LandingState {
  landing: any
}

export default function Landing() {
  const num = useSelector((state: LandingState) => state.landing.num )
  const dispatch = useDispatch();
  const addNum = useCallback(
    () => dispatch(landing.addNum()),
    [dispatch]
  )
  const subNum = useCallback(
    () => dispatch(landing.subNum()),
    [dispatch]
  )
  const resetNum = useCallback(
    () => dispatch(landing.resetNum()),
    [dispatch]
  )
  return (
    <BdcContainer title={"Landing"}>
      <p>{num}</p>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button onClick={addNum}>Add</Button>
        <Button onClick={subNum}>Sub</Button>
        <Button onClick={resetNum}>Reset</Button>
      </ButtonGroup>
    </BdcContainer>
  )
}
