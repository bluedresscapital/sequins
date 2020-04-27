import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from "./components/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import NotFound from "./components/NotFound";
import Example from "./components/Example";

function App() {
  return (
    <main>
      <Switch>
        <Route path={"/"} component={Landing} exact />
        <Route path={"/dashboard"} component={Dashboard} exact />
        <Route path={"/example"} component={Example} exact />
        <Route component={NotFound} />
      </Switch>
    </main>
  );
}

export default App;
