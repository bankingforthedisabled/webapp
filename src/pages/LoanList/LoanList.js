import React, { Component } from "react";
import RightSidebar from "../../components/RightSidebar";
import LeftSidebar from "../../components/LeftSidebar";
import { getCustomers, getCustomerLoans, updateLoan } from "../../lib/nessie";
import Loan from "../../components/Loan/Loan";
import axios from "axios";

class LoanList extends Component {
  state = {
    loans: [],
    loanAmount: 0,
    loanBalance: 0,
  };

  updateLoan = () => {
      .put(
        "http://api.reimaginebanking.com/loans/5ce792f16759394351beecde?key=7e9e0606ab9d8df00f3622753349bc63",
        {
          amount: parseInt(this.state.loanAmount)
        }
      )
      .catch(error => {
        console.log("");
      });
  };

  handleChange = e => {
    this.setState({ loanAmount: e.target.value }, () => {
      console.log("here");
      this.updateLoan();
    });
  };

  componentDidMount() {
    getCustomerLoans("5ce3fb8c322fa06b67794db6").then(data => {
      this.setState({
        loans: data
      });
    });
  }

  render() {
    return (
      <div className="loanlist">
        <div className="container">
          <LeftSidebar />
          <div className="main">
            <h1 className="title">Loans</h1>
            {this.state.loans.map((loan, index) => (
              <Loan loan={loan} key={index} />
            ))}
            <h1 className="title">Pay Loan</h1>
            <form>
              <label>
                Payment Amount:
                <input
                  id="loanAmount"
                  type="text"
                  name="name"
                  value={this.state.loanAmount}
                  onChange={this.handleChange}
                />
              </label>
              <input
                type="submit"
                value="Submit"
                onClick={this.updateLoan(24)}
              />
            </form>
          </div>
          <RightSidebar />
        </div>
      </div>
    );
  }
}

export default LoanList;
