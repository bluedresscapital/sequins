import React from "react";
import {Card, CardContent} from "@material-ui/core";
import TimeSeries from "./TimeSeries";
import {useSelector, useDispatch} from "react-redux";
import {portfolio} from "../../redux/actions";

interface DailyPortfolioPerformanceState {
  portfolio: any
}

function consolidateDailyPortValues(daily_port_values) {
  let dateMap = {}
  let tzOffset = new Date().getTimezoneOffset();
  Object.keys(daily_port_values).forEach(port_id => {
    daily_port_values[port_id].forEach(({ date, value }) => {
      let currVal = dateMap[date] ? dateMap[date] : 0
      currVal = currVal + parseFloat(value)
      dateMap[date] = currVal
    })
  })
  return Object.keys(dateMap).sort().map(d => {
    let utcDate = new Date(d)
    return {x: utcDate.setMinutes(utcDate.getMinutes() - tzOffset), y: dateMap[d] }
  })
}

export default function DailyPortfolioPerformance() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(portfolio.loadDailyPortValues())
    // eslint-disable-next-line
  }, [])
  const daily_port_values = useSelector((state: DailyPortfolioPerformanceState) => state.portfolio.daily_port_values)
  let data = consolidateDailyPortValues(daily_port_values)
  return (
    <Card>
      <CardContent>
        <TimeSeries
          loading={data.length === 0}
          title={"Daily Account Performance"}
          data={[{
            "name": "Account Value",
            "data": data
          }]}
          yAxisFormatter={value => "$" + (value || 0.00).toFixed(2)}
          tooltipFormat={'HH:mm'}
        />
      </CardContent>
    </Card>
  )
}