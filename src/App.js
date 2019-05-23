import React, { Component } from 'react'
import Home from './pages/Home'

class App extends Component {
  componentDidMount() {
    // Setup web gazer
    const script = document.createElement("script");

    script.src = "https://webgazer.cs.brown.edu/webgazer.js?";
    script.async = false;

    document.body.appendChild(script);

    setTimeout(() => {
      this.webgazer = window.webgazer;
      this.webgazer.begin();
      this.setupWebpack(this.webgazer);
    }, 2000)
  }

  setupWebpack(webpack) {
    // Setup webpack configuration
    if (webpack.detectCompatibility()) {
      console.log("WEBPACK IS COMPATIBLE!!!");
    }
  }

  render() {
    return (
      <Home />
    );
  }
}

export default App;
