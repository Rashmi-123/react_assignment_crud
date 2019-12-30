import React, { Component } from "react";
import "./App.css";
import RouteComponent from "../Router/router";
import Header from "../../Component/Hedaer/Header";
import { BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }

  authenticate =() => {
    if (sessionStorage.getItem("token")) {
      !this.state.isAuthenticated && this.setState({ isAuthenticated: true });
      return true;
    }
  }

  render() {
    let childProps = {
      authenticate: this.authenticate
    };

    return (
      <div className="App">
       
        <Router>
        {this.state.isAuthenticated && <Header />}
          <RouteComponent childProps={childProps} />
        </Router>
      </div>
    );
  }
}

export default App;
