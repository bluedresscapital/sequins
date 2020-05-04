import React from 'react';
import BdcContainer from "./common/BdcContainer";
import {
  AppBar,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import {useDispatch, useSelector} from "react-redux";
import {tda} from '../redux/actions';

interface BrokeragesState {
  tda: any
}

export default function Brokerages() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(tda.loadAccounts())
    // eslint-disable-next-line
  }, [])
  const td_accounts = useSelector((state: BrokeragesState) => state.tda.accounts)
  return (
    <BdcContainer title={"Brokerages"}>
      <AppBar position="static">
        <Tabs value={0} style={{color: 'black', backgroundColor: 'white'}}>
          <Tab label={"All"} value={0} />
          <Tab label={"TD Ameritrade"} value={1} />
          <Tab label={"Robinhood"} value={2} />
        </Tabs>
      </AppBar>
      {td_accounts.map(({ client_id, id, refresh_token }, i) => (
        <ExpansionPanel key={i}>
          <ExpansionPanelSummary>
            <Typography>TD Account</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {refresh_token}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}

    </BdcContainer>
  )
}