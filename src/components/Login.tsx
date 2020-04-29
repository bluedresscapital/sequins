import React, {useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Redirect } from 'react-router';
import { Card, CardContent, Button, TextField } from '@material-ui/core';

import { auth } from '../actions';
import BdcContainer from "./common/BdcContainer";

interface LoginState {
  auth: any
}

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const user = useSelector((state: LoginState) => state.auth.username);
  if (user) {
    return (<Redirect to={"/"} />)
  }
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(auth.login(username, password))
  }

  return (
    <BdcContainer>
      <Card style={{marginTop: "25px"}}>
        <CardContent>
          <h1>Login</h1>
          <form noValidate autoComplete="off" onSubmit={handleLogin}>
            <TextField value={username} label="Username" onChange={e => setUsername(e.target.value)}/>
            <br />
            <TextField value={password} label="Password" type={"password"} onChange={e => setPassword(e.target.value)}/>
            <br />
            <Button type={"submit"} color={"primary"} variant={"contained"} style={{marginTop: "15px"}}>Login</Button>
          </form>
        </CardContent>
      </Card>
    </BdcContainer>
  )
}
