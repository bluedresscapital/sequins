import React from "react";
import { Button } from '@material-ui/core';
// import { PRIMARY_BLUE } from "../../Theme";

export default function BdcPrimaryButton(props) {
  return (<Button  {...props} variant={"contained"} >{props.children}</Button>)

}