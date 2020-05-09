import React from "react";
import {useSelector} from "react-redux";
import {Grid} from '@material-ui/core';
import TransfersTable from "./TransfersTable";
import OrdersTable from "./OrdersTable";

interface ViewPortfoliosState {
  portfolio: any,
  transfer: any,
  order: any,
}

export default function ViewPortfolio() {
  // const portfolios = useSelector((state: ViewPortfoliosState) => state.portfolio.portfolios)
  const selectedPort = useSelector((state: ViewPortfoliosState) => state.portfolio.selected_port)
  const transfers = useSelector((state: ViewPortfoliosState) => state.transfer.transfers)
  const orders = useSelector((state: ViewPortfoliosState) => state.order.orders)
  let filtered_transfers = transfers.filter(({ port_id }) => selectedPort===-1 || port_id === selectedPort)
  let filtered_orders = orders.filter(({ port_id }) => selectedPort===-1 || port_id === selectedPort)
  return (
    <div style={{padding: "32px"}}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={5}>
          <TransfersTable transfers={filtered_transfers}/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={7}>
          <OrdersTable orders={filtered_orders} />
        </Grid>
      </Grid>
      SelectedPort: {selectedPort}
    </div>
  )
}