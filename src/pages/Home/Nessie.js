import React, { Component } from 'react'
import axios from 'axios';

const customer_id = "5ce3fb8b322fa06b67794db1"

class Nessie extends Component {
  componentDidMount() {
   axios.get("http://api.reimaginebanking.com/accounts/5ce3fb8c322fa06b67794db5/customer?key=7e9e0606ab9d8df00f3622753349bc63")
     .then(res => {
       console.log(res);
     })
 }

  render() {
    console.log(process.env.REACT_APP_NESSIE_KEY)
    return (
      <h> Hello! </h>
    );
  }
}

export default Nessie;
