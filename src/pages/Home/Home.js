import React from 'react'

const Home = () => (
  <div className="home">
    <div className="container">
      <div className="left-sidebar">
        <div className="voice-actions"></div>
      </div>
      <div className="main">
        <h1 className="title">Welcome, Dylan!</h1>
        <h2 className="instructions">Gaze to navigate</h2>
        <div className="payments"></div>
      </div>
      <div className="right-sidebar">
        <div className="deposit"></div>
        <div className="transfer"></div>
      </div>
    </div>
  </div>
)

export default Home