import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Navbar from './components/Navbar';
import logo from './assets/mplogo.png'


ReactDOM.render(
  <React.StrictMode>
    <Navbar/>
    <br></br><br></br><br></br>
    <App />
    <div align='center'>
      <img src={logo} width="150"></img>
    </div>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
