import React from "react";
import BdcContainer from "../common/BdcContainer";
import {Card, CardContent, Typography} from "@material-ui/core";
import VerticalSpacer from "../common/VerticalSpacer";
import PositionsTable from "../portfolio/PositionsTable";
import TimeSeries from "../dashboard/TimeSeries";
import {Link} from "react-router-dom";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

interface ExplorePortfolioProps {
  match: any
}

export default function ExplorePortfolio(props: ExplorePortfolioProps) {
  const {id} = props.match.params
  console.log(id)
  return (
    <BdcContainer title={"Explore"}>
      <div style={{padding: "36px"}}>
        <Link to={"/explore"}>
          <div>
            <KeyboardBackspaceIcon /> Explore
          </div>
        </Link>
        <Typography variant={"h3"}>
          Portfolio {id}
        </Typography>
        <Typography variant={"subtitle1"}>
          #Retail #Industry #Tech
        </Typography>
        <VerticalSpacer />
        <Card>
          <CardContent>
            <TimeSeries
              loading={false}
              title={"Time Weighted Returns"}
              data={[]}
              yAxisFormatter={value => (value || 0.00).toFixed(2) + "%"}
              tooltipFormat={'dd MMM yyyy'}
            />
          </CardContent>
        </Card>
        <VerticalSpacer />
        <PositionsTable positions={[]} />

      </div>
    </BdcContainer>
  )
}