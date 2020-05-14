import React from 'react';

import BdcContainer from "../common/BdcContainer";
import TimeSeries from "./TimeSeries";
import {
  Card,
  CardContent,
  Grid,
} from '@material-ui/core';

export default function Dashboard() {
  let data =[
    {
      "id": "SPY",
      "data": [
        {
          "x": "2020-05-02",
          "y": 220,
        },
        {
          "x": "2020-05-03",
          "y": 220,
        },
        {
          "x": "2020-05-04",
          "y": 225,
        },
        {
          "x": "2020-05-05",
          "y": 223,
        }
      ]
    },
    {
      "id": "BDC",
      "data": [
        {
          "x": "2020-05-02",
          "y": 150,
        },
        {
          "x": "2020-05-03",
          "y": 240,
        },
        {
          "x": "2020-05-04",
          "y": 230,
        },
        {
          "x": "2020-05-05",
          "y": 235,
        }
      ]
    }
  ]
  return (
    <BdcContainer title={"Dashboard"}>
      <div style={{padding: "32px"}}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card>
              <CardContent>
                <TimeSeries
                  title={"SPY"}
                  data={data}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card>
              <CardContent>
                Hi
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </BdcContainer>
  )
}
