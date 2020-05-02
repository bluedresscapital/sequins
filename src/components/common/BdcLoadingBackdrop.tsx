import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import {LIGHTER_BLUE} from "../../Theme";

export default function BdcLoadingBackdrop(props) {
  return (
    <div
      hidden={!props.open}
      style={{
      position: "absolute",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
      backgroundColor: "rgb(0,0,0,0.3)",
      textAlign: "center",
      zIndex: 9999
    }}>
      <CircularProgress style={{
        position: "absolute",
        top: "45%",
        color: LIGHTER_BLUE,
      }}/>
    </div>
  )

}