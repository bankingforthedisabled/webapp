import React, { Component } from "react";
import LeftSidebar from "../../components/LeftSidebar/";
import RightSidebar from "../../components/RightSidebar/";
import Account from "../../components/Loan/Account";
import { Redirect, Link } from "react-router-dom";

import {
  getCustomerData,
  getCustomerLoans,
  getCustomerTransfers,
  getCustomerAccounts
} from "../../lib/nessie.js";

class Home extends Component {
  state = {
    customer_name: "",
    accounts: [],
    redirect: false
  };

  //Router
  redirect = e => {
    console.log("redirect");
    this.setState({
      redirect: true
    });
  };

  componentDidMount() {
    const customerData = getCustomerData().then(data => {
      this.setState({
        customer_name: data.first_name
      });
    });
    const accounts = getCustomerAccounts().then(data => {
      this.setState({
        accounts: data
      });
    });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/LoanList" />;
    }
    return (
      <div className="home">
        <div className="container">
          <LeftSidebar {...this.props} />
          <div className="main">
            <h1 className="title">Welcome, {this.state.customer_name}!</h1>
            <h2 className="instructions">Gaze to navigate</h2>
            <div className="account-details">
              <h2 className="account-details-header">Accounts</h2>
              {this.state.accounts.map((account, index) => (
                <Account account={account} key={index} />
              ))}
            </div>
            <div className="account-details">
              <h2 className="account-details-header">Loan Status</h2>
              <div className="account-entry">
                <h3 className="account-name">Balance Remaining</h3>
                <h3 className="account-amount">$200</h3>
                <div className="clearfix" />
              </div>
              <div className="account-entry">
                <h3 className="account-name">Next Payment Due</h3>
                <h3 className="account-amount">11/15/2019</h3>
                <div className="clearfix" />
              </div>
            </div>
          </div>
          <RightSidebar topName="Make a Payment" bottomName="Transfer"/>
        </div>
      </div>
    );
  }
}

export default Home;
