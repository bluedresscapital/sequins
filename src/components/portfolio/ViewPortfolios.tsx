import React from "react";
import BdcContainer from "../common/BdcContainer";
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {LIGHTER_BLUE} from "../../Theme";
import {useSelector} from "react-redux";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    color: 'black',
    backgroundColor: "white",
  },
}));

const BdcTabs = withStyles({
  indicator: {
    backgroundColor: LIGHTER_BLUE,
  },
})(Tabs);

interface ViewPortfoliosState {
  portfolio: any
}

export default function ViewPortfolios() {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const portfolios = useSelector((state: ViewPortfoliosState) => state.portfolio.portfolios)
  const loadingPorts = useSelector((state: ViewPortfoliosState) => state.portfolio.loading)
  console.log(portfolios, loadingPorts)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <BdcContainer title={"View Portfolios"}>
      <AppBar position="static" className={classes.appBar}>
        <BdcTabs value={value} onChange={handleChange} aria-label="simple tabs example" >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </BdcTabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </BdcContainer>

  )
}