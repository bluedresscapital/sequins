import React, {useCallback, useEffect} from "react";
import BdcContainer from "../common/BdcContainer";
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useDispatch, useSelector} from "react-redux";
import ViewPortfolio from "./ViewPortfolio";
import {portfolio} from "../../redux/actions";
import BdcLoadingBackdrop from "../common/BdcLoadingBackdrop";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    color: 'black',
    backgroundColor: "white",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

interface ViewPortfoliosState {
  portfolio: any
}

export default function ViewPortfoliosContainer() {
  const classes = useStyles();
  const portfolios = useSelector((state: ViewPortfoliosState) => state.portfolio.portfolios)
  const loadingPorts = useSelector((state: ViewPortfoliosState) => state.portfolio.loading)
  const selectedPort = useSelector((state: ViewPortfoliosState) => state.portfolio.selected_port)
  const dispatch = useDispatch();
  const selectPort = useCallback(
    (id) => dispatch(portfolio.selectPort(id)),
    [dispatch]
  )
  useEffect(() => {
    dispatch(portfolio.resetRedirect())
    // eslint-disable-next-line
  }, [])
  return (
    <BdcContainer title={"View Portfolios"}>
      <BdcLoadingBackdrop open={loadingPorts} />

      <AppBar position="static" className={classes.appBar}>
        <Tabs value={selectedPort}>
          <Tab label={"All"} value={-1} onClick={() => selectPort(-1)}/>
          {portfolios.map(({id, name, type}, i) => (
            <Tab label={name} value={id} key={i} onClick={() => selectPort(id)}/>
          ))}
        </Tabs>
      </AppBar>
      <ViewPortfolio />
    </BdcContainer>
  )
}