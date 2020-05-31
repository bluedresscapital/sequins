import React from "react";
import {Card, CardContent, Paper, Tab, Tabs, Typography} from "@material-ui/core";
import TimeSeries from "./TimeSeries";
import {useSelector, useDispatch} from "react-redux";
import {portfolio} from "../../redux/actions";
import AnimatedNumber from 'react-animated-number';
import {GREEN, RED} from "../../Theme";

const maxPoints = 365

interface PortfolioPerformanceState {
  portfolio: any
}

function getStartDate(range, minDate, endDate) {
  let d = new Date(endDate)
  if (range === "5d") {
    d.setDate(d.getDate() - 5)
  } else if (range === "1m") {
    d.setMonth(d.getMonth() - 1)
  } else if (range === "3m") {
    d.setMonth(d.getMonth() - 3)
  } else if (range === "6m") {
    d.setMonth(d.getMonth() - 6)
  } else if (range === "YTD") {
    d = new Date(d.getFullYear(), 0, 1, 0, 0, 0, 0)
  } else if (range === "1y") {
    d.setFullYear(d.getFullYear() - 1)
  } else {
    d = minDate
  }
  return d
}

function clipHistory(range, hist) {
  if (hist.length === 0) {
    return []
  }
  // Assume hist is sorted!
  const endDate = new Date(hist[hist.length - 1].x)
  const minDate = new Date(hist[0].x)
  const startDate = getStartDate(range, minDate, endDate)
  let filteredHist: any[] = []
  hist.forEach(({x, y}) => {
    let currD = new Date(x)
    if (currD >= startDate && currD <= endDate) {
      filteredHist.push({x, y})
    }
  })
  const skipDays = Math.floor(filteredHist.length / maxPoints) || 1
  let res: any[] = []
  let i = filteredHist.length - 1
  while (i > 0) {
    res.push(filteredHist[i])
    i = i - skipDays
  }
  return res
}

// Given a dictionary of port_id => port_history,
// returns a consolidated array of all port history performances weighted
// by each day's performance
function consolidateMoneyWeightedPortHistories(portHistories) {
  // simple mapping of date to performance
  let datePerfs = {}
  let portInitVals = {}
  let portEndpointVals = {}
  Object.keys(portHistories).forEach(port_id=> {
    // Assume portHist is chronologically sorted!!
    const portHist = portHistories[port_id] || []
    portEndpointVals[port_id] = {}

    portHist.forEach(({ date, normalized_cash, stock_value }) => {
      let dateVal = datePerfs[date] ? datePerfs[date] : 0
      let portVal = parseFloat(normalized_cash) + parseFloat(stock_value)
      datePerfs[date] = dateVal + portVal
      const portInitval = portInitVals[port_id]
      if (!portInitval) {
        portInitVals[port_id] = portVal
        portEndpointVals[port_id] = {}
        portEndpointVals[port_id]["start"] = { date, portVal }
      }
      portEndpointVals[port_id]["end"] = { date, portVal }
    })
  })

  let normDatePerfs = {...datePerfs}
  Object.keys(datePerfs).forEach(d => {
    Object.keys(portEndpointVals).forEach(port_id => {
      const {start, end} = portEndpointVals[port_id]
      if (start.date > d) {
        normDatePerfs[d] += start.portVal
      }
      if (end.date < d) {
        normDatePerfs[d] += end.portVal
      }
    })
  })

  let hist = Object.keys(normDatePerfs).sort().map(d => {
    return {
      "y": normDatePerfs[d],
      "x": d,
    }
  })
  return hist
}

export default function PortfolioPerformance() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(portfolio.loadPortHistories())
    // eslint-disable-next-line
  }, [])
  const tabs = [
    "5d",
    "1m",
    "3m",
    "6m",
    "YTD",
    "1y",
    "ALL"
  ]
  const [selectedTab, setSelectedTab] = React.useState(4)
  const range = tabs[selectedTab]
  const portHistories = useSelector((state: PortfolioPerformanceState) => state.portfolio.port_histories)
  const hist = clipHistory(range, consolidateMoneyWeightedPortHistories(portHistories)).reverse()
  const data: any[] = [
    {
      "name": "Account Performance",
      "data": hist
    }
  ];
  const currVal = hist.length === 0 ? 0 : hist[hist.length - 1].y
  const startVal = hist.length === 0 ? 0 : hist[0].y
  const profit = currVal - startVal
  let percChange = ((currVal / startVal) - 1) * 100
  percChange = isNaN(percChange) ? 0.0 : percChange
  console.log(startVal, currVal, profit, percChange)

  return (
    <Card>
      <CardContent>
        <Typography variant={"h5"}>Account Performance</Typography>
        <Typography variant={"h4"} style={{display: "inline", marginRight: "12px"}}>
          <AnimatedNumber
            value={currVal} formatValue={v => "$" + v.toFixed(2)}
            duration={500}
          />
        </Typography>
        <Typography variant={"h6"} style={{display: "inline", marginRight: "5px", color: profit >= 0 ? GREEN : RED }}>
          (
          <AnimatedNumber
            value={profit} formatValue={v => "$" + v.toFixed(2)}
            duration={500}
          />,
        </Typography>
        <Typography variant={"h6"} style={{display: "inline", color: profit >= 0 ? GREEN : RED}}>
          <AnimatedNumber
            value={percChange} formatValue={v => v.toFixed(2) + "%"}
            duration={500}
          />
          )
        </Typography>
        <Paper square elevation={0}>
          <Tabs
            value={selectedTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={(n, i) => setSelectedTab(i)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabs.map((v, i) => (
              <Tab label={v} key={i} style={{minWidth: "50px"}}></Tab>
            ))}
          </Tabs>
        </Paper>
        <TimeSeries
          loading={portHistories === {}}
          title={""}
          data={data}
          yAxisFormatter={value => "$" + (value || 0.00).toFixed(2)}
          tooltipFormat={'dd MMM yyyy'}
        />
      </CardContent>
    </Card>
  )
}