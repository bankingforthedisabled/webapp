import React, { Component } from "react";
import LeftSidebar from "../../components/LeftSidebar/";
import RightSidebar from "../../components/RightSidebar/";
import {
  getCustomerData,
  getCustomerLoans,
  getCustomerTransfers,
  getCustomerAccounts
} from "../../lib/nessie.js";

class Home extends Component {
  state = {
    customer_name: "",
    accounts: []
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
    console.log(this.state);
    return (
      <div className="home">
        <div className="container">
          <LeftSidebar />
          <div className="main">
            <h1 className="title">Welcome, {this.state.customer_name}!</h1>
            <h2 className="instructions">Gaze to navigate</h2>
            <div className="account-details">
              <h2 className="account-details-header">Accounts</h2>
              <div className="account-entry">
                <h3 className="account-name">Savings</h3>
                <h3 className="account-amount">$19.99</h3>
                <div className="clearfix" />
              </div>
              <div className="account-entry">
                <h3 className="account-name">Checking</h3>
                <h3 className="account-amount">$25.00</h3>
                <div className="clearfix" />
              </div>
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
          <RightSidebar />
        </div>
      </div>
    );
  }
}

export default Home;
