import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    // Setup web gazer

    const script = document.createElement("script");

    script.src = "https://webgazer.cs.brown.edu/webgazer.js?";
    script.async = false;

    document.body.appendChild(script);

    setTimeout(() =>
        {
          this.webgazer = window.webgazer;
          this.webgazer.begin();
          this.setupWebpack(this.webgazer);
        },  2000
    )
  }

  setupWebpack(webpack) {
    // Setup webpack configuration
    if (webpack.detectCompatibility()) {
      console.log("WEBPACK IS COMPATIBLE!!!");
    }
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              HI!
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
    );
  }
}

export default App;
