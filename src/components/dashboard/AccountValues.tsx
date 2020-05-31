import React from "react";
import {Card, CardContent, Divider, Grid, Typography} from "@material-ui/core";
import AnimatedNumber from 'react-animated-number';

interface AccountValuesProps {
  portfolios: any
  port_values: any
}

export default function AccountValues(props: AccountValuesProps) {
  const numDuration = 500
  const { portfolios, port_values } = props;
  let currValue = 0
  let prevValue = 0
  portfolios.forEach(({id}) => {
    currValue += port_values[id] ? parseFloat(port_values[id].curr_val) : 0
    prevValue += port_values[id] ? parseFloat(port_values[id].prev_val) : 0
  })
  let change = currValue - prevValue
  let perc_change = 100 * ((currValue / prevValue) - 1)
  perc_change = isNaN(perc_change) ? 0.0 : perc_change
  return (
    <Card style={{height: "100%"}}>
      <CardContent>
        <Grid container>
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={3}>
            <Typography variant={"h6"}>
              Prev close
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant={"h6"}>
              Current Value
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant={"h6"}>
              Net change
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant={"h6"}>
              Account value
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant={"subtitle1"}>
              <AnimatedNumber
                value={prevValue} formatValue={v => "$" + v.toFixed(2)}
                duration={numDuration}
              />
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant={"subtitle1"}>
              <AnimatedNumber
                value={currValue} formatValue={v => "$" + v.toFixed(2)}
                duration={numDuration}
              />
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant={"subtitle1"}>
              <AnimatedNumber
                value={change} formatValue={v => "$" + v.toFixed(2)}
                duration={numDuration}
              />
              <AnimatedNumber
                value={perc_change} formatValue={v => " (" + v.toFixed(2) + "%)"}
                duration={numDuration}
              />
            </Typography>
          </Grid>
          {portfolios.map(({id, name}, i) => {
            let cur = port_values[id] ? parseFloat(port_values[id].curr_val) : 0
            let prev = port_values[id] ? parseFloat(port_values[id].prev_val) : 0
            let change = cur - prev
            let perc_change = port_values[id] ? parseFloat(port_values[id].daily_change) : 1
            perc_change = (perc_change - 1) * 100
            return (
              <Grid container key={i}>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={3} style={{paddingLeft: "12px"}}>
                  <Typography variant={"h6"}>
                    {name}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant={"subtitle1"}>
                    <AnimatedNumber
                      value={prev} formatValue={v => "$" + v.toFixed(2)}
                      duration={numDuration}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant={"subtitle1"}>
                    <AnimatedNumber
                      value={cur} formatValue={v => "$" + v.toFixed(2)}
                      duration={numDuration}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant={"subtitle1"}>
                    <AnimatedNumber
                      value={change} formatValue={v => "$" + v.toFixed(2)}
                      duration={numDuration}
                    />
                    <AnimatedNumber
                      value={perc_change} formatValue={v => " (" + v.toFixed(2) + "%)"}
                      duration={numDuration}
                    />
                  </Typography>
                </Grid>
              </Grid>
            )
          })}
        </Grid>
      </CardContent>
    </Card>
  )
}