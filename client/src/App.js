import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import ProducerPage from "./pages/ProducerPage";
import ConsumerPage from "./pages/ConsumerPage";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/producer" component={ProducerPage} />
            <Route exact path="/consumer" component={ConsumerPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
