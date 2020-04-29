import React, {useCallback, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from "./components/Landing";
import Login from "./components/Login";
import Dashboard from "./components/dashboard/Dashboard";
import NotFound from "./components/NotFound";
import Example from "./components/Example";

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
        <Route path={"/dashboard"} component={Dashboard} exact />
        <Route path={"/login"} component={Login} exact />
        <Route path={"/example"} component={Example} exact />
        <Route component={NotFound} />
      </Switch>
    </main>
  );
}

