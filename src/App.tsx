import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from "./components/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import NotFound from "./components/NotFound";
import Test from "./components/Test";

function App() {
  return (
    <main>
      <Switch>
        <Route path={"/"} component={Landing} exact />
        <Route path={"/dashboard"} component={Dashboard} exact />
        <Route path={"/test"} component={Test} exact />
        <Route component={NotFound} />
      </Switch>
    </main>
  );
}

export default App;
