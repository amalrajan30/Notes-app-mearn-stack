import React, { Component } from 'react';
import './App.css';
import Main from './components/Main'
import Header from './elements/Header';
import { Provider } from 'react-redux';
import store from './Store'
import LoginContextProvider from './context/LoginContext';
import NotesContextProvider from './context/NotesContex';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <LoginContextProvider>
            <Header />
            <NotesContextProvider>
              <Main />
            </NotesContextProvider>
          </LoginContextProvider>
        </div>
      </Provider>
    );
  }
}

export default App;
