import React from 'react'

const Loan = ({ loan }) => {
  return (
    <div className={`loan`}>
      <h3 className="header">{loan.type}</h3>
      <p>Payment per month: ${loan.monthly_payment}</p>
      <p>Total Amount: ${loan.amount}</p>
      <p>Status: {loan.status}</p>
    </div>
  )
}


export default Loan