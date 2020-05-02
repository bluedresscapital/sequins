import React from "react";
import {useSelector} from "react-redux";

interface ViewPortfoliosState {
  portfolio: any
}

export default function ViewPortfolio() {
  const portfolios = useSelector((state: ViewPortfoliosState) => state.portfolio.portfolios)
  const selectedPort = useSelector((state: ViewPortfoliosState) => state.portfolio.selected_port)

  return (
    <div>
      SelectedPort: {selectedPort}
    </div>
  )
}