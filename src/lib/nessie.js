import axios from "axios";

const base = "http://api.reimaginebanking.com";
const account_number = "5ce3fb8c322fa06b67794db6";
const api_key = "7e9e0606ab9d8df00f3622753349bc63";
const customer_id = "5ce3fb8b322fa06b67794db1";
const loan_id = "5ce792f16759394351beecde";

//getCustomers
export const getCustomers = () => {
  return axios
    .get(`${base}/customers?key=${api_key}`)
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
};
//getCustomer - Returns an JSON object of key value pairs (data.first_name, data.last_name, data.address)
export const getCustomerData = () => {
  return axios
    .get(
      `http://api.reimaginebanking.com/accounts/${account_number}/customer?key=${api_key}`
    )
    .then(res => {
      return res.data;
    });
};

//getLoans - Returns an array of loans associated with the account
export const getCustomerLoans = customerId => {
  return axios
    .get(`${base}/accounts/${customerId}/loans?key=${api_key}`)
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
};

//getTransfers
// Returns array of all transfers
// data.transaction_date, data.type, data.status, data.payer_id, data.payee_id, data.amount
// for payer and payee id, call getCustomer (only print first name)
export const getCustomerTransfers = () => {
  return axios
    .get(`${base}/accounts/${account_number}/customer?key=${api_key}`)
    .then(res => {
      console.log(res);
    });
};

//getAccounts
// Returns array of accounts
/* for(let k in res.data) { data[k].type, data[k].balance }
 */
export const getCustomerAccounts = () => {
  return axios
    .get(
      `http://api.reimaginebanking.com/customers/${customer_id}/accounts?key=${api_key}`
    )
    .then(res => {
      console.log(res.data);
      return res.data;
    });
};

//Update a loan by id
export const updateLoan = () => {
  return axios
    .post(
      `http://api.reimaginebanking.com/customers/${loan_id}/accounts?key=${api_key}`,
      {
        amount: 50
      }
    )
    .then(res => {
      console.log(res.data);
      return res.data;
    });
};
