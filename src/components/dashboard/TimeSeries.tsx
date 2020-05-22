import React from 'react';
// import {DARKER_BLUE, DARKEST_BLUE, LIGHTER_BLUE, LIGHTEST_BLUE, PRIMARY_BLUE} from "../../Theme";
import ReactApexChart from "react-apexcharts";
import {DARKER_BLUE, DARKEST_BLUE, LIGHTER_BLUE, LIGHTEST_BLUE, PRIMARY_BLUE} from "../../Theme";
import {CircularProgress} from '@material-ui/core';


interface TimeSeriesProps {
  loading: boolean
  title: string
  data: any
  yAxisFormatter: any
  tooltipFormat: any
}

export default function TimeSeries(props: TimeSeriesProps) {
  let state = {
    series: props.data,
    options: {
      chart: {
        id: 'area-datetime',
        type: 'area',
        height: 350,
        zoom: {
          autoScaleYaxis: true
        },
      },
      colors: [DARKEST_BLUE, LIGHTEST_BLUE, DARKER_BLUE, LIGHTER_BLUE, PRIMARY_BLUE],
      title: {
        text: props.title,
        align: "left",
        style: {
          fontSize: "25px",
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
        style: 'hollow',
      },
      xaxis: {
        type: 'datetime',
        tickAmount: 6,
      },
      yaxis: {
        labels: {
          formatter: props.yAxisFormatter
        }
      },
      tooltip: {
        x: {
          format: props.tooltipFormat
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.5,
          stops: [0, 100]
        }
      },
    },
    selection: 'one_year',
  };

  return (
    <div>
      <div>
        {props.loading && <div style={{position: "absolute", top: "45%", left: "50%", zIndex: 99}}>
          <CircularProgress />
        </div>}
        <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
      </div>
    </div>

  )
}