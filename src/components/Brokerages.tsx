import React from 'react';
import BdcContainer from "./common/BdcContainer";
import { Divider, Grid, List, ListItem, ListItemText, Paper } from '@material-ui/core';

export default function Brokerages() {
  return (
    <BdcContainer>
      <h1>Brokerages</h1>
      <Grid container spacing={3} >
        <Grid item xs={12} sm={12} md={3}>
          <Paper elevation={2}>
            <List>
              <ListItem button>
                <ListItemText>
                  Blue Dress Capital
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText>
                  TD Ameritrade
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText>
                  Robinhood
                </ListItemText>
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <Paper elevation={2} style={{padding: "1px 16px"}}>
            <h1>Test</h1>
          </Paper>
        </Grid>
      </Grid>
    </BdcContainer>
  )
}