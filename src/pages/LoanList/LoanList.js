import React, { Component } from 'react'
import RightSidebar from '../../components/RightSidebar'
import LeftSidebar from '../../components/LeftSidebar'

import { getCustomerLoans } from '../../lib/nessie'

class LoanList extends Component {
  state = {
    loans: []
  }

  componentDidMount() {
    const loans = getCustomerLoans();
    console.log(loans);
  }

  render() {
    return (
      <div className="loans">
        <div className="container">
          <LeftSidebar />
          <div className="main">
            <h1 className="title">Pay Your Loans</h1>

          </div>
          <RightSidebar />
        </div>
      </div >
    )
  }
}

export default LoanList