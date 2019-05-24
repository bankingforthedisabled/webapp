import React from 'react'
import Nessie from './Nessie.js'

const Home = () => (
    <div className="container">
      <div className="left-sidebar">
        <h3>Loading...</h3>
        <p>Hold still to calibrate!</p>
        <div className="payments"></div>
      </div>
      <div className="main">
        <h1 className="title">Welcome, Dylan!</h1>
        <h2 className="instructions">Gaze to navigate</h2>
        <div className="account-details">
          <h2 className="account-details-header">Accounts</h2>
          <div className="account-entry">
            <h3 className="account-name">Savings</h3>
            <h3 className="account-amount">$19.99</h3>
            <div className="clearfix"></div>
          </div>
          <div className="account-entry">
            <h3 className="account-name">Checking</h3>
            <h3 className="account-amount">$25.00</h3>
            <div className="clearfix"></div>
          </div>
        </div>
        <div className="account-details">
          <h2 className="account-details-header">Loan Status</h2>
          <div className="account-entry">
            <h3 className="account-name">Balance Remaining</h3>
            <h3 className="account-amount">$200</h3>
            <div className="clearfix"></div>
          </div>
          <div className="account-entry">
            <h3 className="account-name">Next Payement Due</h3>
            <h3 className="account-amount">11/15/2019</h3>
            <div className="clearfix"></div>
          </div>
          <div className="voice-actions">
            <h3>Voice Actions</h3>
            <p>Voice instructions here...</p>
          </div>
        </div>
      </div>
      <div className="right-sidebar">
        <div className="deposit center-box">
          <h3 className="center-box-title">Make a Payment</h3>
        </div>
        <div className="transfer center-box">
          <h3 className="center-box-title">Transfer</h3>
        </div>
      </div>
    </div>
  </div >
)

export default Home
