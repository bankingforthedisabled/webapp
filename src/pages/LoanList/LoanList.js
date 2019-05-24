import React, { Component } from "react";
import RightSidebar from "../../components/RightSidebar";
import LeftSidebar from "../../components/LeftSidebar";

import { getCustomers, getCustomerLoans } from "../../lib/nessie";
import Loan from "../../components/Loan/Loan";

class LoanList extends Component {
  state = {
    loans: []
  };

  componentDidMount() {
    getCustomerLoans("5ce3fb73322fa06b67794d41").then(data => {
      this.setState({
        loans: data
      });
    });
  }

  render() {
    console.log(this.state.loans);
    return (
      <div className="loanlist">
        <div className="container">
          <LeftSidebar />
          <div className="main">
            <h1 className="title">Loans</h1>
            {this.state.loans.map((loan, index) => (
              <Loan loan={loan} key={index} />
            ))}
          </div>
          <RightSidebar topName="Back" bottomName="Transfer"/>
        </div>
      </div>
    );
  }
}

export default LoanList;
