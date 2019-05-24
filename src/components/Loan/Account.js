import React from "react";

const Account = ({ account }) => {
  const background = account.key % 2 === 0 ? "loan__red" : "loan__blue";
  return (
    <div className="account-entry">
      <h3 className="account-name">{account.type}</h3>
      <h3 className="account-amount">${account.balance}</h3>
      <div className="clearfix" />
    </div>
  );
};

export default Account;
