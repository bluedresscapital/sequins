import React, {useCallback, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Brokerages from "./components/Brokerages";
import Dashboard from "./components/dashboard/Dashboard";
import Example from "./components/Example";
import Landing from "./components/Landing";
import Login from "./components/auth/Login";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";

import {auth} from "./actions";
import { useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
  const loadUser = useCallback(
    () => dispatch(auth.loadUser()),
    [dispatch]
  )
  useEffect(() => {
    loadUser()
    // eslint-disable-next-line
  }, [])
  return (
    <main>
      <Switch>
        <Route path={"/"} component={Landing} exact />
        <Route path={"/account"} component={Brokerages} exact />
        <Route path={"/dashboard"} component={Dashboard} exact />
        <Route path={"/login"} component={Login} exact />
        <Route path={"/welcome"} component={Login} exact />
        <Route path={"/profile"} component={Profile} exact />
        <Route path={"/example"} component={Example} exact />
        <Route component={NotFound} />
      </Switch>
    </main>
  );
}

