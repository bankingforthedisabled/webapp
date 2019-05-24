import axios from "axios";

const account_number = "5ce3fb8c322fa06b67794db6";
const api_key = '263c7339677335a1bdd1b087b31d3e0d';
// const customer_id = "5ce3fb8b322fa06b67794db1";

//getCustomer - Returns an JSON object of key value pairs (data.first_name, data.last_name, data.address)
export const getCustomerData = () => {
  return axios.get(`http://api.reimaginebanking.com/accounts/${account_number}/customer?key=${api_key}`)
    .then(res => {
      console.log(res.data);
    });
};

//getLoans - Returns an array of loans associated with the account
export const getCustomerLoans = () => {
  return axios.get(`http://api.reimaginebanking.com/accounts/${account_number}/customer?key=${api_key}`)
    .then(res => {
      console.log(res);
    });
};

//getTransfers
// Returns array of all transfers
// data.transaction_date, data.type, data.status, data.payer_id, data.payee_id, data.amount
// for payer and payee id, call getCustomer (only print first name)
export const getCustomerTransfers = () => {
  return axios.get(`http://api.reimaginebanking.com/accounts/${account_number}/customer?key=${api_key}`)
    .then(res => {
      console.log(res);
    });
};

//getAccounts
// Returns array of accounts
/* for(let k in res.data) { data[k].type, data[k].balance }
  */
export const getCustomerAccounts = () => {
  return axios.get(`http://api.reimaginebanking.com/accounts/${account_number}/customer?key=${api_key}`)
    .then(res => {
      console.log(res.data);
    });
};