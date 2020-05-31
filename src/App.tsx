import React, {useCallback, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Brokerages from "./components/Brokerages";
import Dashboard from "./components/dashboard/Dashboard";
import Example from "./components/Example";
import Login from "./components/auth/Login";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import Register from "./components/auth/Register";
import Explore from "./components/explore/Explore";

import {auth} from "./redux/actions";
import { useDispatch } from "react-redux";
import AddPortfolios from "./components/portfolio/AddPortfolios";
import ViewPortfoliosContainer from "./components/portfolio/ViewPortfoliosContainer";
import ExplorePortfolio from "./components/explore/ExplorePortfolio";

export default function App() {
  const dispatch = useDispatch();
  const loadUser = useCallback(
    () => dispatch(auth.loadUser()),
    [dispatch])
  useEffect(() => {
    loadUser()
    // eslint-disable-next-line
  }, [])
  return (
    <main>
      <Switch>
        <Route path={"/"} component={Dashboard} exact />
        <Route path={"/account"} component={Brokerages} exact />
        <Route path={"/explore"} component={Explore} exact />
        <Route path={"/explore/portfolio/:id(\\d+)"} component={ExplorePortfolio} exact />
        <Route path={"/portfolios/view"} component={ViewPortfoliosContainer} exact />
        <Route path={"/portfolios/add"} component={AddPortfolios} exact />
        <Route path={"/login"} component={Login} exact />
        <Route path={"/register"} component={Register} exact />
        <Route path={"/welcome"} component={Login} exact />
        <Route path={"/profile"} component={Profile} exact />
        <Route path={"/example"} component={Example} exact />
        <Route component={NotFound} />
      </Switch>
    </main>
  );
}

