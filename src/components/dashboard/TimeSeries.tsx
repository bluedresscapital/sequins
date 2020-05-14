import React from 'react';
// import {DARKER_BLUE, DARKEST_BLUE, LIGHTER_BLUE, LIGHTEST_BLUE, PRIMARY_BLUE} from "../../Theme";
import ReactApexChart from "react-apexcharts";


interface TimeSeriesProps {
  title: string
  data: any
}

export default function TimeSeries(props: TimeSeriesProps) {
  let state = {
    series: [{
      name: "wei",
      data: [
        { x: "2020-05-03", y: 420 },
        { x: "2020-05-04", y: 425 },
        { x: "2020-05-05", y: 423 },
        { x: "2020-05-06", y: 430 },
      ]
    }, {
      name: "SPY",
      data: [
        { x: "2020-05-03", y: 450 },
        { x: "2020-05-04", y: 410 },
        { x: "2020-05-05", y: 439 },
        { x: "2020-05-06", y: 440 },
      ]
    }],
    options: {
      chart: {
        id: 'area-datetime',
        type: 'area',
        height: 350,
        zoom: {
          autoScaleYaxis: true
        }
      },
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
      tooltip: {
        x: {
          format: 'dd MMM yyyy'
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
      <div >
        <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
      </div>
    </div>

  )
}