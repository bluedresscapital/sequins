import React from "react";
import {useSelector} from "react-redux";
import {
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import TransfersTable from "./TransfersTable";

interface ViewPortfoliosState {
  portfolio: any,
  transfer: any,
}

export default function ViewPortfolio() {
  const portfolios = useSelector((state: ViewPortfoliosState) => state.portfolio.portfolios)
  const selectedPort = useSelector((state: ViewPortfoliosState) => state.portfolio.selected_port)
  const transfers = useSelector((state: ViewPortfoliosState) => state.transfer.transfers)
  // TODO filter by selectedPort?
  let filtered_transfers = transfers.filter(({ port_id }) => selectedPort===-1 || port_id === selectedPort)

  return (
    <div style={{padding: "32px"}}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
          <TransfersTable transfers={filtered_transfers}/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
          <Card>
            <CardContent>
              <Typography variant={"h6"}>Orders</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      SelectedPort: {selectedPort}
    </div>
  )
}