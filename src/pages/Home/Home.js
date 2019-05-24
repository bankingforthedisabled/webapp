import React, { Component } from "react";
import LeftSidebar from "../../components/LeftSidebar/";
import RightSidebar from "../../components/RightSidebar/";
import Account from "../../components/Loan/Account";
import { Redirect } from "react-router-dom";
import {
  getCustomerData,
  getCustomerAccounts
} from "../../lib/nessie.js";
import annyang from "annyang";

class Home extends Component {

  constructor(props) {
    super(props);
    this.didSayClick = this.didSayClick.bind(this);
    this.setupAnnyang = this.setupAnnyang.bind(this);
    this.userSaid = this.userSaid.bind(this);
    this.handleCursorLoc = this.handleCursorLoc.bind(this);

    this.state = {
      customer_name: "",
      accounts: [],
      redirectToLoans: false
    };
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
        clique: this.didSayClick
      };

      annyang.addCommands(commands);

      annyang.addCallback("result", this.userSaid);

      annyang.start();
    }
  }

  didSayClick() {
    console.log("Detected click word!");

    if (window.cursorClickListener) {
      window.cursorClickListener();
    }

    if (this.cursorX >= 880 && this.cursorY <= 399) {
      // Navigation to make a payment
      this.setState({'redirectToLoans': true});
      console.log("Navigated to loans");
    }
  }

  userSaid(words) {
    //console.log("User Said: " + words.toString());
  }

  handleCursorLoc(x, y) {
    this.cursorX = x;
    this.cursorY = y;
  }

  componentDidMount() {
    window.cursorListener = this.handleCursorLoc;
    this.setupAnnyang();
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
    return (
      <div className="home">
        {this.state.redirectToLoans && <Redirect to={'/loanlist'}/>}
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
