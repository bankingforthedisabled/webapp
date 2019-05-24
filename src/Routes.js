import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Home from "./pages/Home";
import LoanList from "./pages/LoanList";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/Home" component={props => <Home {...props} />} />
            <Route path="/LoanList" component={LoanList} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Routes;
