import React from 'react'

const RightSidebar = ({ topName, bottomName }) => (
  <div className="right-sidebar">
    <div className="deposit center-box">
      <h3 className="center-box-title">{topName}</h3>
    </div>
    <div className="transfer center-box">
      <h3 className="center-box-title">{bottomName}</h3>
    </div>
  </div>
)

export default RightSidebar