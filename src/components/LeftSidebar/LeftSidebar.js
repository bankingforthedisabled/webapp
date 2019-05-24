import React from 'react'

const LeftSidebar = (props) => (
  <div className="left-sidebar">
    <h3>Loading...</h3>
    <p>Hold still to calibrate!</p>
    <div className="payments">
        <p>Last Word:</p>
        <p>{props.lastWord}</p>
    </div>
  </div>
)

export default LeftSidebar