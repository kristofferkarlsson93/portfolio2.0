import React, { Component } from 'react';
import './App.css';
import Car from './components/Car.js';
import Sun from './components/Sun.js'
import config from './helpers/config.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sun></Sun>
        <Car config={config}></Car>
      </div>
    );
  }
}
export default App;

