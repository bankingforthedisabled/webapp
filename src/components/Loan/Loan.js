import React from 'react'

const Loan = ({ loan }) => {
  const background = loan.key % 2 === 0 ? 'loan__red' : 'loan__blue'
  return (
    <div className={`loan ${background}`}>
      <h3 className="title">{loan.title}</h3>
      <p>Payment per month: {loan.monthly}</p>
      <p>Total Amount: {loan.total}</p>
    </div>
  )
}


export default Loan