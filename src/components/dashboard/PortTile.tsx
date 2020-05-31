import React from "react";
import {Card, CardContent, Typography} from "@material-ui/core";
import {Link} from 'react-router-dom'
import {PRIMARY_BLUE} from "../../Theme";

interface PortTileProps {
  portfolio: any
}

export default function PortTile(props: PortTileProps) {
  const { id, name, tags, growth } = props.portfolio;
  const percent_growth = 100 * (growth - 1)
  return (
    <Card>
      <CardContent>
        <Link to={"/explore/portfolio/" + id } style={{textDecoration: "none", color: PRIMARY_BLUE}}>
          <Typography variant={"h6"} style={{display: "inline"}}>
            {name} |
          </Typography>
        </Link>
        <Typography variant={"h6"} style={{
          display: "inline",
          marginLeft: "5px",
          color: percent_growth >= 0 ? "green" : "red",
        }}>
          ({percent_growth >= 0 ? "+" : ""}{percent_growth.toFixed(2)}%)
        </Typography>
        <div>
          {tags.map((t, i) => (
            <Typography style={{display: "inline"}} variant={"subtitle1"} key={i}>#{t} </Typography>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}