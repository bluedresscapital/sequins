import React, {memo} from 'react'
import {Card, CardContent, TextField, FormControlLabel, FormHelperText, FormControl} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from '@material-ui/core/colors';

import BdcContainer from "../common/BdcContainer";
import BdcPrimaryButton from "../common/BdcPrimaryButton";
import {useDispatch, useSelector} from "react-redux";
import {portfolio} from "../../redux/actions";
import {Redirect} from 'react-router-dom';

interface AddPortfoliosState {
  portfolio: any
}
function AddPortfolios() {
  const [saveAs, setSaveAs] = React.useState("paper")
  const [portName, setPortName] = React.useState("")
  const savingPort = useSelector((state: AddPortfoliosState) => state.portfolio.adding_port)
  const errAddingPort = useSelector((state: AddPortfoliosState) => state.portfolio.err_adding_port)
  const redirect = useSelector((state: AddPortfoliosState) => state.portfolio.redirect)

  const dispatch = useDispatch();
  const savePortfolio = e => {
    e.preventDefault();
    dispatch(portfolio.addPortfolio(portName, saveAs))
  }

  if (redirect) {
    return (<Redirect to={"/portfolios/view"} />)
  }
  return (
    <BdcContainer title={"Add Portfolio"}>
      <Card style={{margin: "25px"}}>
        <CardContent>
        <h1>Add New Portfolio</h1>
        <form noValidate autoComplete="off" onSubmit={savePortfolio}>
          <FormControl error={errAddingPort}>
          <TextField
            id="standard-basic"
            label="Portfolio Name"
            margin={"normal"}
            variant={"outlined"}
            onChange={e => setPortName(e.target.value)}
            value={portName}
          />
            {errAddingPort && <FormHelperText>Please use a unique portfolio name</FormHelperText>}
          <div>
            <FormControlLabel
              control={
                <Checkbox color={"primary"}
                          checked={saveAs=== "paper"}
                          onChange={() => {setSaveAs("paper")}}
                />
              }
              label={"Save as Paper Trading Portfolio (default if nothing else selected)"}
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox color={"primary"}
                          checked={saveAs=== "rh"}
                          onChange={() => {setSaveAs(saveAs === "rh" ? "paper" : "rh")}}
                />
              }
              label={"Save as RH Portfolio"}
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox color={"primary"}
                          checked={saveAs=== "tda"}
                          onChange={() => {setSaveAs(saveAs === "tda" ? "paper" : "tda")}}
                />
              }
              label={"Save as TD Portfolio"}
            />
          </div>
          <div style={{position: 'relative', display: 'inline-block'}}>
            <BdcPrimaryButton
              type={"submit"}
              disabled={false}
            >Save Portfolio</BdcPrimaryButton>

            {savingPort && <CircularProgress size={24} style={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: -12,
              marginLeft: -12,
            }}/> }
          </div>
          </FormControl>
        </form>
        </CardContent>
      </Card>
    </BdcContainer>
  )
}

export default memo(AddPortfolios)