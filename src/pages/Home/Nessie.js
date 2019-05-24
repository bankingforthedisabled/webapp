import React, { Component } from "react";
import axios from "axios";

const account_number = "5ce3fb8c322fa06b67794db6";
const api_key = process.env.REACT_APP_NESSIE_KEY;
const customer_id = "5ce3fb8b322fa06b67794db1";

class Nessie extends Component {
  //Hardcoded example
  componentDidMount() {
    this.getAccounts();
  }

  //getCustomer
  //Returns an JSON object of key value pairs
  //data.first_name, data.last_name, data.address
  getCustomerData = e => {
    axios
      .get(
        "http://api.reimaginebanking.com/accounts/" +
          account_number +
          "/customer?key=" +
          api_key
      )
      .then(res => {
        console.log(res.data);
      });
  };

  //getLoans
  //Returns an array of loans associated with the account
  getLoans = e => {
    axios
      .get(
        "http://api.reimaginebanking.com/accounts/" +
          account_number +
          "/loans?key=" +
          api_key
      )
      .then(res => {
        console.log(res);
      });
  };

  //getTransfers
  // Returns array of all transfers
  // data.transaction_date, data.type, data.status, data.payer_id, data.payee_id, data.amount
  // for payer and payee id, call getCustomer (only print first name)
  getTransfers = e => {
    axios
      .get(
        "http://api.reimaginebanking.com/accounts/" +
          account_number +
          "/transfers?key=" +
          api_key
      )
      .then(res => {
        console.log(res);
      });
  };

  //getAccounts
  // Returns array of accounts
  /* for(let k in res.data) { data[k].type, data[k].balance }
   */
  getAccounts(event) {
    axios
      .get(
        "http://api.reimaginebanking.com/customers/" +
          customer_id +
          "/accounts?key=" +
          api_key
      )
      .then(res => {
        console.log(res.data);
      });
  }

  render() {
    console.log(process.env.REACT_APP_NESSIE_KEY);
    return <h> Hello! </h>;
  }
}

export default Nessie;