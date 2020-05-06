import React from 'react';

import BdcUnauthorizedContainer from "../common/BdcUnauthorizedContainer";
import {Card, Grid, Hidden} from "@material-ui/core";

export default function LoginContainer(props) {
  return (
    <BdcUnauthorizedContainer>
      <Card>
        <Grid container alignItems={"center"} style={{height: "100vh"}}>
          <Hidden xsDown>
            <Grid item sm={5} style={{width: "100%", height: "100%"}}>
              <div style={{
                backgroundImage: "url('https://i.ibb.co/R4B6jy9/999-62-1.jpg')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "50% 50%",
                backgroundSize: "cover",
                width: "100%",
                height: "100%",
                color: "white",
                position: "relative"
              }}>
                <h1 style={{
                  position: "absolute",
                  top: "40%",
                  left: "0px",
                  right: "0px",
                  textAlign: "center",
                  fontSize: "3em"
                }}>Unparalled Asset Management. <br /> Established 2017</h1>
              </div>
            </Grid>
          </Hidden>
          {props.children}
        </Grid>
      </Card>
    </BdcUnauthorizedContainer>
  )
}