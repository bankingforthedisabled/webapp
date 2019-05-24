import React, { Component } from "react";
import annyang from "annyang";
import Home from "./pages/Home";
import LoanList from "./pages/LoanList";
import Routes from "./Routes";
import Redirect from "./Routes";
import Cursor from "./components/Cursor/Cursor"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {'didSayHello': true,
                  'showCursor': false,
                  'cursorClicked': false,
                  'cursorLocation': {'x': 0, 'y': 0},
                  'page': 'home'};

    this.counter = 0;
    this.xPredTempAvg = 0;
    this.yPredTempAvg = 0;

    this.handleGaze = this.handleGaze.bind(this);
    this.didSayClick = this.didSayClick.bind(this);
  }

  didSayClick() {
    console.log("Said Click!");
    this.setState({ cursorClicked: true });
    setTimeout(() => {
      this.setState({ cursorClicked: false });
    }, 650);

    // Navigate on click code

    let location = this.state.cursorLocation;

    if (location.x >= 880 && location.y <= 399 && this.state.page === 'home') {
      // Navigation to make a payment
      this.setState({'page': 'loans'})
    }

    if (location.x >= 880 && location.y <= 399 && this.state.page === 'loans') {
      // Navigation to make a payment
      this.setState({'page': 'home'})
    }




  }

  setupAnnyang() {
    // Setup Annyang

    if (annyang) {
      let commands = {
        hello: () => {
          console.log("Said hello!");
          this.setState({ didSayHello: true });
        },
        select: this.didSayClick,
        celect: this.didSayClick,
        selection: this.didSayClick,
        click: this.didSayClick,
        clique: this.didSayClick
      };

      annyang.addCommands(commands);

      annyang.addCallback("result", this.userSaid);

      annyang.start();
    }
  }

  userSaid(words) {
    console.log("User Said: " + words.toString());
    this.setState({'lastWord': words[0]});
  }

  handleGaze(data, elapsedTime) {
    if (data == null) {
      return;
    }

    this.xPredTempAvg += data.x;
    this.yPredTempAvg += data.y;
    this.counter += 1;

    if (this.counter === 15) {
      this.xPredTempAvg = this.xPredTempAvg / 15;
      this.yPredTempAvg = this.yPredTempAvg / 15;
      this.counter = 0;

      this.setState({
        showCursor: true,
        cursorLocation: { x: this.xPredTempAvg, y: this.yPredTempAvg }
      });
      this.xPredTempAvg = 0;
      this.yPredTempAvg = 0;
    }
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

    this.setupAnnyang();
  }

  componentWillUnmount() {
      if (this.webgazer) {
        console.log('Webgazer closed!');
        this.webgazer.end();
      }
  }

  setupWebpack(webgazer) {
    // Setup webpack configuration
    console.log("Setting up webgazer");

    webgazer.setRegression('ridge').setTracker('clmtrackr').begin().showPredictionPoints(true);
    this.webgazer.setGazeListener(this.handleGaze);
    console.log("Set webgaze listener");
  }

  render() {
    return (
        <div>
          <Cursor visibility={this.state.showCursor}
                  clicked={this.state.cursorClicked}
                  x={this.state.cursorLocation.x}
                  y={this.state.cursorLocation.y} />
          <Routes page={this.state.page} lastWord={this.state.lastWord} />
        </div>
        );
  }
}

export default App;
