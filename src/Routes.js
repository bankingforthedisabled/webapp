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
            <Route path="/Home" component={(props) => <Home {...props} />}>
              {this.props.page === 'loans' && <Redirect to={'/loanlist'}/>}
            </Route>
            <Route path="/LoanList" component={LoanList}>
              {this.props.page === 'home' && <Redirect to={'/home'}/>}
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Routes;
