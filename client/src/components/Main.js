import React from "react";
import { Switch, Route } from "react-router-dom";
import socketIOClient from 'socket.io-client';

import { API_BASE } from '../config'
import List from "./List";
import Create from "./Create";
import Home from "./Home";
import Login from "./Login";
import SignUp from './SignUp';
import LoginHooks from './LoginHook';

const Main = () => {
  const uri = `${API_BASE}/`
  const socket = socketIOClient(uri);
  socket.on('Testing socket', data => {
    window.alert(data);
  })
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
          path="/loginHook"
          component={LoginHooks}
        />
        <Route
          exact
          path="/signup"
          component={SignUp}
        />
      </Switch>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Testing</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Test
              </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main;