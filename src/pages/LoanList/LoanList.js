import React, { Component } from "react";
import RightSidebar from "../../components/RightSidebar";
import LeftSidebar from "../../components/LeftSidebar";
import { Redirect } from "react-router-dom";
import { getCustomers, getCustomerLoans, updateLoan } from "../../lib/nessie";
import Loan from "../../components/Loan/Loan";
import axios from "axios";
import annyang from "annyang";

class LoanList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loans: [],
      paymentAmount: -1,
      redirectToHome: false
    };

    this.userSaid = this.userSaid.bind(this);
    this.setupAnnyang = this.setupAnnyang.bind(this);
    this.didSayClick = this.didSayClick.bind(this);
    this.submit = this.submit.bind(this);
  }

  setupAnnyang() {
    // Setup Annyang

    if (annyang) {
      let commands = {
        hello: () => {
          console.log("Said hello!");
          this.setState({ didSayHello: true });
        },
        select: this.didSayClick,
        celect: this.didSayClick,
        selection: this.didSayClick,
        click: this.didSayClick,
        clique: this.didSayClick,
        slack: this.didSayClick,
        submit: this.submit
      };

      annyang.addCommands(commands);

      annyang.addCallback("result", this.userSaid);

      annyang.start();
    }
  }

  submit() {
    console.log('Submit heard!');
    console.log(this.state.loans[0].amount - this.state.paymentAmount);
    this.updateLoan(this.state.loans[0].amount - this.state.paymentAmount);
    this.setState({'paymentAmount': 0});
  }

  didSayClick() {
    console.log("Detected click word!");

    if (window.cursorClickListener) {
      window.cursorClickListener();
    }

    if (this.cursorX >= 880 && this.cursorY <= 399) {
      // Navigation to home
      this.setState({'redirectToHome': true});
      console.log("Navigated to loans");
    }
  }

  userSaid(words) {
    let first = words[0];
    console.log('Loan page user said word: ' + first);

    let possible_double = parseInt(first);
    if (possible_double) {
      this.setState({'paymentAmount': possible_double});
    }
  }

  updateLoan = (amount) => {
      axios.put(
        "http://api.reimaginebanking.com/loans/5ce792f16759394351beecde?key=7e9e0606ab9d8df00f3622753349bc63",
        {
          amount: parseInt(amount)
        }
      ).then(data => {
        let loans = this.state.loans.slice();
        loans[0].amount = amount;
        this.setState({'loans': loans});
      })
      .catch(error => {
        console.log("");
      });
  };

  handleChange = e => {
    this.setState({ 'paymentAmount': e.target.value });
  };

  componentDidMount() {
    this.setupAnnyang();

    window.cursorListener = (x,y) => {
      this.cursorX = x;
      this.cursorY = y;
    };

    getCustomerLoans("5ce3fb8c322fa06b67794db6").then(data => {
      this.setState({
        loans: data
      });
    });

    // Click when loading
    //window.document.getElementById('payment_form').click();
  }

  render() {
    return (
      <div className="loanlist">
        {this.state.redirectToHome && <Redirect to={'/home'}/>}
        <div className="container">
          <LeftSidebar />
          <div className="main">
            <h1 className="title">Loans</h1>
            {this.state.loans.map((loan, index) => (
              <Loan loan={loan} key={loan.id} />
            ))}
            <h1 className="title2">Pay Loan</h1>
            <form className='form'>
              <label className="ammount">
                Payment Amount:
              </label>
              <input
                  id='payment_form'
                  className='field'
                  id="loanAmount"
                  type="text"
                  name="name"
                  value={this.state.paymentAmount === -1 ? 'Speak value' : "$" + String(this.state.paymentAmount)}
                  onChange={this.handleChange}
              />
              <input
                  className="submit"
                type="submit"
                value="Submit"
                onClick={() => this.updateLoan(this.state.loans[0].amount - this.state.paymentAmount)}
              />
            </form>
          </div>
          <RightSidebar topName="Back" bottomName="Transfer"/>
        </div>
      </div>
    );
  }
}

export default LoanList;
