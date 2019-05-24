import React, { Component } from "react";
import annyang from "annyang";
import Home from "./pages/Home";
import LoanList from "./pages/LoanList";
import Routes from "./Routes";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { didSayHello: true };
    this.counter = 0;
    this.xPredictionAvg = 0;
    this.yPredictionAvg = 0;
  }

  didSayClick() {}

  handleGaze(data, elapsedTime) {
    if (data == null) {
      return;
    }

    this.xPredictionAvg += data.x;
    this.yPredictionAvg += data.y;

    if (this.counter == 4) {
      this.xPredictionAvg /= 4;
      this.yPredictionAvg /= 4;
      this.counter = 0;
    }

    let xprediction = String(data.x); //these x coordinates are relative to the viewport
    let yprediction = String(data.y); //these y coordinates are relative to the viewport
    console.log("Prediction: " + xprediction + "," + yprediction);
  }

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

    // Setup Annyang

    if (annyang) {
      let commands = {
        hello: () => {
          console.log("Said hello!");
          this.setState({ didSayHello: true });
        },
        click: this.didSayClick
      };

      annyang.addCommands(commands);

      annyang.start();
    }
  }

  setupWebpack(webgazer) {
    // Setup webpack configuration
    console.log("Setting up webgazer");

    var localstorageLabel = "webgazerGlobalData";
    window.localStorage.setItem(localstorageLabel, null);

    webgazer
      .setRegression("ridge")
      .setTracker("clmtrackr")
      .begin()
      .showPredictionPoints(true);
    this.checkIfReady();
  }

  checkIfReady() {
    if (this.webgazer.isReady()) {
      console.log("Webgazer is ready");
      this.webgazer.setGazeListener(this.handleGaze);
      console.log("Set webgaze listener");
    } else {
      // Recall ready
      setTimeout(this.checkIfReady, 100);
    }
  }

  render() {
    return <Routes />;
  }
}

export default App;
