import React from 'react'
import {Card, CardContent, TextField, FormControlLabel} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from '@material-ui/core/colors';

import BdcContainer from "../common/BdcContainer";
import BdcPrimaryButton from "../common/BdcPrimaryButton";

export default function AddPortfolios() {
  const [saveAs, setSaveAs] = React.useState("web")
  const [portName, setPortName] = React.useState("")
  return (
    <BdcContainer>
      <Card>
        <CardContent>
        <h1>Add New Portfolio</h1>
        <form noValidate autoComplete="off" onSubmit={e => e.preventDefault()}>
          <TextField
            id="standard-basic"
            label="Portfolio Name"
            margin={"normal"}
            variant={"outlined"}
            onChange={e => setPortName(e.target.value)}
            value={portName}
          />
          <div>
            <FormControlLabel
              control={
                <Checkbox color={"primary"}
                          checked={saveAs=== "web"}
                          onChange={() => {setSaveAs("web")}}
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
                          onChange={() => {setSaveAs(saveAs === "rh" ? "web" : "rh")}}
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
                          onChange={() => {setSaveAs(saveAs === "tda" ? "web" : "tda")}}
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

            {false && <CircularProgress size={24} style={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: -12,
              marginLeft: -12,
            }}/> }
          </div>
        </form>
        {false && <p>Status: {"weija"}</p>}

        </CardContent>
      </Card>
    </BdcContainer>
  )
}