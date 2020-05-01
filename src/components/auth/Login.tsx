import React, {useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Redirect } from 'react-router';
import {
  Card,
  FormControl,
  FormHelperText,
  Grid,
  Hidden,
  TextField
} from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';

import { auth } from '../../actions';
import BdcUnauthorizedContainer from "../common/BdcUnauthorizedContainer";
import BdcPrimaryButton from "../common/BdcPrimaryButton";

interface LoginState {
  auth: any
}

export default function Login(props: WithWidth) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const user = useSelector((state: LoginState) => state.auth.username);
  const loginError = useSelector((state: LoginState) => state.auth.err_login_msg);

  if (user) {
    return (<Redirect to={"/"} />)
  }
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(auth.login(username, password))
  }

  return (
    <BdcUnauthorizedContainer>
      <Card>
          <Grid container alignItems={"center"} style={{height: "100vh"}}>
            <Hidden xsDown>
              <Grid item sm={5} style={{width: "100%", height: "100%"}}>
                <div style={{
                  backgroundImage: "url('https://i.ibb.co/R4B6jy9/999-62-1.jpg')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "50% 50%",
                  backgroundSize: "cover",
                  width: "100%",
                  height: "100%",
                  color: "white",
                  position: "relative"
                }}>
                  <h1 style={{
                    position: "absolute",
                    top: "40%",
                    left: "0px",
                    right: "0px",
                    textAlign: "center",
                    fontSize: "3em"
                  }}>Unparalled Asset Management. <br /> Established 2017</h1>
                </div>
              </Grid>
            </Hidden>

            <Grid item xs={12} sm={7} style={{paddingLeft: "100px"}}>
              <h1>Login</h1>
              <form noValidate autoComplete="off" onSubmit={handleLogin}>
                <FormControl error={loginError !== ""}>
                  <TextField value={username} label="Username" variant="outlined" onChange={e => setUsername(e.target.value)}/>
                  <br />
                  <TextField value={password} label="Password" type={"password"} variant={"outlined"} onChange={e => setPassword(e.target.value)}/>
                  <br />
                  <BdcPrimaryButton type={"submit"} style={{marginTop: "15px"}}>Login</BdcPrimaryButton>
                  <FormHelperText>{loginError}</FormHelperText>
                </FormControl>
              </form>
            </Grid>
          </Grid>
      </Card>
    </BdcUnauthorizedContainer>
  )
}
