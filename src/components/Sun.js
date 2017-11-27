import React, { Component } from 'react';
import sun from '../img/sun.jpg'

export default class Sun extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.initEvents();
  }

  initEvents() {
    window.addEventListener('scroll', e => {
      console.log('scrollll');
    });
  }

  render() {
    console.log(window.innerWidth);
    return (
      <div style={styles.container}>
        <img src={sun} alt='sun'/>
      </div>
    )
  }
}

const styles = {
  container: {
    top: 0,
    position: 'fixed',
    left: `75%`,
  }
}