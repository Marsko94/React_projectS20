import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import User from "./User";
import Home from "./Home";
import Items from "./Items";
import Header from "./Header";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" strict component={Home} />
          <Route exact path="/user" strict component={User} />
          <Route exact path="/items/:id" strict component={Items} />
        </div>
      </Router>

      // <div>
      //   <h1>My React App</h1>
      //   <h3>Made it using Webpack and Babel</h3>
      // </div>
    );
  }
}

export default App;
