import React from 'react';

import BdcContainer from "../common/BdcContainer";
import TimeSeries from "./TimeSeries";
import {
  Card,
  CardContent,
  Grid,
} from '@material-ui/core';
import {portfolio} from '../../redux/actions';
import {useDispatch, useSelector} from "react-redux";

interface DashboardState {
  portfolio: any
}

export default function Dashboard() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(portfolio.loadPortfolios())
    dispatch(portfolio.loadPortHistories())
    // eslint-disable-next-line
  }, [])

  const portfolios = useSelector((state: DashboardState) => state.portfolio.portfolios)
  const portHistories = useSelector((state: DashboardState) => state.portfolio.port_histories)
  const data: any[] = [];
  for (const portId in portHistories) {
    const series = {
      "name": portfolios.find(p => parseInt(p.id) === parseInt(portId)).name,
      "data": portHistories[portId].map(({date, cum_change}) => ({
        "x": date,
        "y": (cum_change - 1) * 100,
      }))
    };
    data.push(series)
  }
  return (
    <BdcContainer title={"Dashboard"}>
      <div style={{padding: "32px"}}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card>
              <CardContent>
                <TimeSeries
                  title={"Portfolio Performance"}
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
