import React from 'react';
import 'popper.js'
import 'jquery'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom'
import './index.css';
import history from './history'
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
<Router history={history}>
<App /> 
</Router>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
