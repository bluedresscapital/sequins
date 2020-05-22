import React from 'react';

import BdcContainer from "../common/BdcContainer";
import {
  Card,
  CardContent,
  Grid,
} from '@material-ui/core';
import {portfolio} from '../../redux/actions';
import {useDispatch, useSelector} from "react-redux";
import AccountValues from "./AccountValues";
import PortfolioPerformance from "./PortfolioPerformance";
import DailyPortfolioPerformance from "./DailyPortfolioPerformance";

interface DashboardState {
  portfolio: any
}

export default function Dashboard() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(portfolio.loadPortfolios())
    dispatch(portfolio.loadPortfolioValues())
    // eslint-disable-next-line
  }, [])

  const portfolios = useSelector((state: DashboardState) => state.portfolio.portfolios)
  const portValues = useSelector((state: DashboardState) => state.portfolio.port_values)

  return (
    <BdcContainer title={"Dashboard"}>
      <div style={{padding: "32px"}}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={7} xl={6}>
            <AccountValues portfolios={portfolios} port_values={portValues}/>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={5} xl={6}>
            <DailyPortfolioPerformance />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={5} xl={6}>
            <PortfolioPerformance />
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
