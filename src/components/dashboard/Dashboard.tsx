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

// Assume comparison is a superset of portHistory
function backfillData(comparison, portHistory) {
  console.log(portHistory)
  let portHash = {}
  portHistory.forEach(({ cum_change, date }) => {
    portHash[date] = (cum_change - 1) * 100
  })
  let data: any[] = []
  let currChange = 0
  comparison.forEach(({ Date }) => {
    let portVal = portHash[Date]
    if (portVal !== undefined) {
      currChange = portVal
    }
    data.push({
      "x": Date,
      "y": currChange
    })
  })
  return data
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
  const comparison = useSelector((state: DashboardState) => state.portfolio.comparison)
  let comparisonData = [];
  if (comparison.length > 0) {
    const initPrice = parseFloat(comparison[0].Price)
    comparisonData = comparison.map(({Date, Price}) => ({
      "x": Date,
      "y": ((parseFloat(Price) / initPrice) - 1) * 100,
    }))
  }
  const comparisonSeries = {
    "name": "SPY",
    "data": comparisonData
  }
  const data: any[] = [comparisonSeries];
  for (const portId in portHistories) {
    const series = {
      "name": (portfolios.find(p => parseInt(p.id) === parseInt(portId)) || {"name": "n/a"}).name,
      // Assume comparison history has the superset of all dates in our port histories
      "data": backfillData(comparison, portHistories[portId])
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
