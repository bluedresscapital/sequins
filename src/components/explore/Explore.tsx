import React from "react";
import {
  Card,
  CardContent,
  Checkbox, FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import BdcContainer from "../common/BdcContainer";
import {useDispatch, useSelector} from "react-redux";
import {portfolio} from "../../redux/actions";
import PortTile from "../dashboard/PortTile";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: "100%",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

interface ExploreState {
  portfolio: any
}

function parseFilters(featured_ports) {
  let indus = {}
  Object.keys(featured_ports).forEach(port_id => {
    featured_ports[port_id].tags.forEach(t => indus[t] = true)
  })
  return Object.keys(indus).sort()
}

export default function Explore() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const featured_ports = useSelector((state: ExploreState) => state.portfolio.featured_ports)
  React.useEffect(() => {
    dispatch(portfolio.loadFeaturedPortfolios())
    // eslint-disable-next-line
  }, [])
  console.log(featured_ports)
  let filters = parseFilters(featured_ports)

  return (
    <BdcContainer title={"Explore"}>
      <div style={{padding: "32px"}}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <Paper component="form" className={classes.root}>
              <InputBase
                className={classes.input}
                placeholder="Search Portfolios"
              />
              <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <br/>
            <Card>
              <CardContent>
                <Typography variant={"h5"}>
                  Filters
                </Typography>
                <Divider style={{margin: "12px 0px"}}/>
                <FormControl component="fieldset">
                  {filters.map((f, i) => (
                    <div key={i}>
                      <FormControlLabel
                        value="end"
                        control={<Checkbox color="primary" />}
                        label={f}
                        labelPlacement="end"
                      />
                    </div>
                  ))}
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={9}>
            <Typography variant={"h4"}>
              Featured
            </Typography>
            <Divider style={{margin: "12px 0px"}}/>
            <Grid container spacing={1}>
              {featured_ports.map((p, i) => (
                <Grid item xs={6} sm={6} md={6} lg={4} key={i}>
                  <PortTile portfolio={p} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </BdcContainer>
  )
}