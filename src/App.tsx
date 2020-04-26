import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from "./components/Landing";
import NotFound from "./components/NotFound";

function App() {
  return (
    <main>
      <Switch>
          <Route path={"/"} component={Landing} exact />
          <Route component={NotFound} />
      </Switch>
    </main>
  );
}

export default App;
