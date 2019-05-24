import React from "react";
import { Redirect, Link } from "react-router-dom";

const RightSidebar = () => (
  <div className="right-sidebar">
    <div className="deposit center-box">
      <Link to="/LoanList">
        <h3 className="center-box-title">Loans</h3>
      </Link>
    </div>
    <div className="transfer center-box">
      <h3 className="center-box-title">Transfer</h3>
    </div>
  </div>
);

export default RightSidebar;
