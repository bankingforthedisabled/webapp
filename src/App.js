import React, { Component } from "react";
import Routes from "./Routes";
import Cursor from "./components/Cursor/Cursor"

class App extends Component {
  render() {
    return (
        <div>
          <Cursor/>
          <Routes/>
        </div>
    );
  }
}

export default App;
