import React from "react";
import {Card, CardContent} from "@material-ui/core";
import TimeSeries from "./TimeSeries";
import {useSelector, useDispatch} from "react-redux";
import {portfolio} from "../../redux/actions";

const maxPoints = 100

interface PortfolioPerformanceState {
  portfolio: any
}

function clipHistory(hist) {
  const skipDays = Math.floor(hist.length / maxPoints)
  let res: any[] = []
  let i = hist.length - 1
  while (i > 0) {
    res.push(hist[i])
    i = i - skipDays
  }
  return res
}

// Given a dictionary of port_id => port_history,
// returns a consolidated array of all port history performances weighted
// by each day's performance
function consolidatePortHistories(portHistories) {
  // simple mapping of date to performance
  let datePerfs = {}
  Object.keys(portHistories).forEach(port_id=> {
    (portHistories[port_id] || []).forEach(({ date, cash, stock_value, daily_change }) => {
      let datePerf = datePerfs[date] ? datePerfs[date] : { change: 1, value: 0 }
      const { change, value } = datePerf
      let currVal = parseFloat(cash) + parseFloat(stock_value)
      let totalVal = currVal + value
      let currWeight = currVal / totalVal
      let prevWeight = value / totalVal
      let newChange = currWeight * daily_change + prevWeight * change
      datePerfs[date] = { change: newChange, value: totalVal }
    })
  })
  let cum_change = 1
  let hist = Object.keys(datePerfs).sort().map(d => {
    cum_change = cum_change * datePerfs[d].change
    return {
      "y": (cum_change - 1) * 100,
      "x": d,
    }
  })
  return clipHistory(hist)
}

export default function PortfolioPerformance() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(portfolio.loadPortHistories())
    // eslint-disable-next-line
  }, [])

  const portHistories = useSelector((state: PortfolioPerformanceState) => state.portfolio.port_histories)
  const comparison = useSelector((state: PortfolioPerformanceState) => state.portfolio.comparison)

  consolidatePortHistories(portHistories)

  let comparisonData = [];
  if (comparison.length > 0) {
    const initPrice = parseFloat(comparison[0].Price)
    comparisonData = comparison.map((o) => ({
      "x": new Date(o.Date),
      "y": ((parseFloat(o.Price) / initPrice) - 1) * 100,
    }))
  }
  const comparisonSeries = {
    "name": "SPY",
    "data": clipHistory(comparisonData)
  }
  const data: any[] = [
    comparisonSeries,
    {
      "name": "Total Account",
      "data": consolidatePortHistories(portHistories)
    }
  ];

  return (
    <Card>
      <CardContent>
        <TimeSeries
          loading={comparison.length === 0}
          title={"Portfolio Performance"}
          data={data}
          yAxisFormatter={value => (value || 0.00).toFixed(2) + "%"}
          tooltipFormat={'dd MMM yyyy'}
        />
      </CardContent>
    </Card>
  )
}