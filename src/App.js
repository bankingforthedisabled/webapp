import React, { Component } from "react";
import Home from "./pages/Home";

class App extends Component {
  componentDidMount() {
    // Setup web gazer
    const script = document.createElement("script");

    script.src = "/webgazer.js";
    script.async = false;

    document.body.appendChild(script);

    setTimeout(() => {
      this.webgazer = window.webgazer;
      this.webgazer.begin();
      this.setupWebpack(this.webgazer);
    }, 2000);
  }

  setupWebpack(webgazer) {
    // Setup webpack configuration
    console.log("Setting up webgazer");

    var localstorageLabel = 'webgazerGlobalData';
    window.localStorage.setItem(localstorageLabel, null);

    webgazer.setRegression('ridge').setTracker('clmtrackr').begin().showPredictionPoints(true);
    this.checkIfReady();
  }

  checkIfReady() {
    if (this.webgazer.isReady()) {
      console.log("Webgazer is ready");
      this.webgazer.setGazeListener(function(data, elapsedTime) {
        if (data == null) {
          return;
        }
        let xprediction = String(data.x); //these x coordinates are relative to the viewport
        let yprediction = String(data.y); //these y coordinates are relative to the viewport
        console.log("Prediction: " + xprediction + "," + yprediction);
      });
      console.log("Set webgaze listener");


    } else {
      // Recall ready
      setTimeout(this.checkIfReady, 100);
    }
  }

  render() {
    return <Home />;
  }
}

export default App;
