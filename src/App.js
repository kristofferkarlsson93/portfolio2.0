import React, { Component } from 'react';
import './App.css';
import Car from './components/Car.js';
import Sun from './components/Sun.js'
import config from './helpers/config.js'
import background from './img/background.jpg'

class App extends Component {
  render() {
    return (
      <div className="App" style={styles.container}>
        <Sun></Sun>
        <Car config={config}></Car>
      </div>
    );
  }
}
export default App;

const styles = {
  container: {
    backgroundImage: `url(${background})`
  }
}