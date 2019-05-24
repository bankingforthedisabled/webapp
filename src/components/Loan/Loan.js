import React from 'react'

const Loan = ({ loan }) => {
  const background = loan.key % 2 === 0 ? 'loan__red' : 'loan__blue'
  return (
    <div className={`loan ${background}`}>
      <h3 className="header">{loan.type}</h3>
      <p>Payment per month: {loan.monthly_payment}</p>
      <p>Total Amount: {loan.amount}</p>
      <p>Status: {loan.status}</p>
    </div>
  )
}


export default Loan