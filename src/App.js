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
                  'showCursor': true,
                  'cursorClicked': false,
                  'page': 'home'};

    this.cursorLocationX = 0;
    this.cursorLocationY = 0;

    this.didSayClick = this.didSayClick.bind(this);
    this.handleCursorUpdate = this.handleCursorUpdate.bind(this);
    this.userSaid = this.userSaid.bind(this);
  }

  didSayClick() {
    console.log("Said Click!");

    // Navigate on click code

    if (this.cursorLocationX >= 880 && this.cursorLocationY <= 399 && this.state.page === 'home') {
      // Navigation to make a payment
      this.setState({'page': 'loans', 'cursorClicked': true})
    }

    if (this.cursorLocationX >= 880 && this.cursorLocationY <= 399 && this.state.page === 'loans') {
      // Navigation to make a payment
      this.setState({'page': 'home', 'cursorClicked': true})
    }

    setTimeout(() => {
      this.setState({ cursorClicked: false });
    }, 650);

  }

  handleCursorUpdate(x,y) {
    this.cursorLocationX = x;
    this.cursorLocationY = y;
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
    //this.setState({'lastWord': words[0]});
  }

  componentDidMount() {
    this.setupAnnyang();
  }

  componentWillUnmount() {
      if (this.webgazer) {
        console.log('Webgazer closed!');
        this.webgazer.end();
      }
  }

  render() {
    return (
        <div>
          <Cursor visibility={this.state.showCursor}
                  clicked={this.state.cursorClicked}
                  updateLocation={this.handleCursorUpdate}/>
          <Routes page={this.state.page} lastWord={this.state.lastWord} />
        </div>
        );
  }
}

export default App;
