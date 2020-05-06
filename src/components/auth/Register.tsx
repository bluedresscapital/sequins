import React, {useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Redirect } from 'react-router';
import {
  FormControl,
  FormHelperText,
  Grid,
  TextField
} from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';

import { auth } from '../../redux/actions';
import BdcPrimaryButton from "../common/BdcPrimaryButton";
import LoginContainer from "./LoginContainer";
import {Link} from "react-router-dom";

interface LoginState {
  auth: any
}

export default function Login(props: WithWidth) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const dispatch = useDispatch();
  const user = useSelector((state: LoginState) => state.auth.username);
  const loginError = useSelector((state: LoginState) => state.auth.err_login_msg);

  if (user) {
    return (<Redirect to={"/"} />)
  }
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(auth.register(username, password))
  }

  return (
    <LoginContainer>
      <Grid item xs={12} sm={7} style={{paddingLeft: "100px"}}>
        <h1>Register</h1>
        <form noValidate autoComplete="off" onSubmit={handleRegister}>
          <FormControl error={loginError !== ""}>
            <TextField value={username} label="Username" variant="outlined" onChange={e => setUsername(e.target.value)}/>
            <br />
            <TextField value={password} label="Password" type={"password"} variant={"outlined"} onChange={e => setPassword(e.target.value)}/>
            <br />
            <TextField value={confirmPassword} label="Confirm password" type={"password"} variant={"outlined"} onChange={e => setConfirmPassword(e.target.value)}/>
            <br />
            <BdcPrimaryButton
              type={"submit"} style={{marginTop: "15px"}}
              disabled={username==="" || password==="" || password!==confirmPassword}
            >Register</BdcPrimaryButton>
            <FormHelperText>{loginError}</FormHelperText>
            <FormHelperText>
              Have an account? <Link to={"/login"}>Sign in</Link>
            </FormHelperText>
          </FormControl>
        </form>
      </Grid>
    </LoginContainer>
  )
}
