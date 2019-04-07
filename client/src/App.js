import React, { Component } from 'react';
import './App.css';
import Main from './components/Main'
import Header from './elements/Header';
import { Provider } from 'react-redux';
import store from './Store'

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />
          <Main />
        </div>
      </Provider>
    );
  }
}

export default App;
