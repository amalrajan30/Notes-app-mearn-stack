import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { checkToken } from '../actions'
import List from "./List";
import Create from "./Create";
import Home from "./Home";
import Login from "./Login";
import SignUp from './SignUp'

class Main extends Component {
  componentDidMount() {
    this.props.checkToken()
  }

  render() {
    return (
      <div className="container">
        <Switch>
          <Route
            exact
            path="/"
            component={Home}
          />
          <Route
            exact
            path="/lists"
            component={List}
          />
          <Route
            exact
            path="/create"
            component={Create}
          />
          <Route
            exact
            path="/login"
            component={Login}
          />
          <Route
            exact
            path="/signup"
            component={SignUp}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkToken: () => dispatch(checkToken())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)