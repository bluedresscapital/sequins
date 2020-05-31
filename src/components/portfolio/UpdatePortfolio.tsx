import React from "react";
import {FormControl, TextField} from "@material-ui/core";
import BdcPrimaryButton from "../common/BdcPrimaryButton";
import {useDispatch, useSelector} from "react-redux";
import {portfolio} from "../../redux/actions";

interface UpdatePortfoliosState {
  portfolio: any,
  transfer: any,
  order: any,
  position: any,
}

export default function UpdatePortfolio() {
  const dispatch = useDispatch()
  const selectedPort = useSelector((state: UpdatePortfoliosState) => state.portfolio.selected_port)

  const [name, setName] = React.useState("")
  // TD Stuff
  const [tdCode, setTDCode] = React.useState("")
  const [tdAccNum, setTDAccNum] = React.useState("")

  const updatePortfolio = (e) => {
    e.preventDefault()
    console.log(selectedPort, name, tdCode, tdAccNum,)
    dispatch(portfolio.updateTDPortfolio(selectedPort, name, tdCode, tdAccNum))
  }

  return (
    <form noValidate autoComplete="off" onSubmit={updatePortfolio}>
      <FormControl error={false}>
        <TextField
          label="Port name"
          margin={"normal"}
          variant={"outlined"}
          onChange={e => setName(e.target.value)}
          value={name}
        />
        <TextField
          label="TD Account Number"
          margin={"normal"}
          variant={"outlined"}
          onChange={e => setTDAccNum(e.target.value)}
          value={tdAccNum}
        />
        <TextField
          label="TD Auth Code"
          margin={"normal"}
          variant={"outlined"}
          onChange={e => setTDCode(e.target.value)}
          value={tdCode}
        />
        <BdcPrimaryButton
          type={"submit"}
          disabled={false}
        >Update Portfolio</BdcPrimaryButton>
      </FormControl>
    </form>
  )
}