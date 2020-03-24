import React from "react";
import "./App.css";
import About from "./pages/About";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Disclaimer from "./pages/Disclaimer";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/disclaimer">
          <Disclaimer />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
