import React from "react";
import {useSelector} from "react-redux";
import {Grid} from '@material-ui/core';
import TransfersTable from "./TransfersTable";
import OrdersTable from "./OrdersTable";
import PositionsTable from "./PositionsTable";
import UpdatePortfolio from "./UpdatePortfolio";

interface ViewPortfoliosState {
  portfolio: any,
  transfer: any,
  order: any,
  position: any,
}

export default function ViewPortfolio() {
  const portfolios = useSelector((state: ViewPortfoliosState) => state.portfolio.portfolios)
  const selectedPort = useSelector((state: ViewPortfoliosState) => state.portfolio.selected_port)
  const transfers = useSelector((state: ViewPortfoliosState) => state.transfer.transfers)
  const orders = useSelector((state: ViewPortfoliosState) => state.order.orders)
  const positions = useSelector((state: ViewPortfoliosState) => state.position.positions)
  let filtered_transfers = transfers.filter(({ port_id }) => selectedPort===-1 || port_id === selectedPort)
  let filtered_orders = orders.filter(({ port_id }) => selectedPort===-1 || port_id === selectedPort)
  let filtered_positions = positions.filter(({ port_id }) => selectedPort===-1 || port_id===selectedPort)
  let port = portfolios.find(({id}) => id===selectedPort) || { type: "web", name: "n/a" }

  return (
    <div style={{padding: "32px"}}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <PositionsTable positions={filtered_positions} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <TransfersTable transfers={filtered_transfers}/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <OrdersTable orders={filtered_orders} />
        </Grid>
      </Grid>
      {selectedPort !== -1 && port.type === "tda" && <div>
          SelectedPort: {selectedPort}
          <UpdatePortfolio />
      </div>}

    </div>
  )
}