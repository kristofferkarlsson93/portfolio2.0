import React, { Component } from 'react';
import car from '../img/car.jpg';
import classNames from 'classnames';
import MaterialIcon from 'react-google-material-icons'
//import { CSSTransitionGroup } from 'react-transition-group' // ES6

//https://elrumordelaluz.github.io/csshake/
// window.onscroll = e => {}

export default class Car extends Component {

  constructor(props) {
    super(props);
    this.state = {
      staticSpeed: props.config.carSpeed,
      shouldJuggle: false,
      scrollPos: 0,
      currentDirection: 'right'
    }
  }
  
  componentDidMount() {
    this.initEvents();
  }

  initEvents() {
    document.body.addEventListener('keydown', e => {
      const left = e.keyCode === 37 || e.which === 37 || e.code === 'ArrowLeft' || e.key === 'ArrowLeft'; 
      const right = e.keyCode === 39 ||e.which === 39 || e.code === 'ArrowRight' || e.key === 'ArrowRight';
      const isOkKey = left || right;
      if(isOkKey) {
          this.drive(false);
      }
    });
    document.body.addEventListener('keyup', e => this.stop());
    this.preventDefaultScrolling();
  }

  scrollWindowManually() {
    if (!this.state.shouldJuggle || this.state.scrollPos >= window.width) {
      return false;
    } else {
      setTimeout( () => {
        window.scrollTo(this.state.scrollPos, 0);
        this.setState({
          scrollPos: this.state.currentDirection === 'right' ? this.state.scrollPos + this.state.staticSpeed : this.state.scrollPos - this.state.staticSpeed 
        });
        this.scrollWindowManually();
      }, 100);
    }
  }

  async drive(shouldScrollManually) {
    await this.juggle(true);
    if (shouldScrollManually) {
      await this.setState({scrollPos: this.getCurrentHorizontalScrollPosition()});
      this.scrollWindowManually();
    }
  }

  async stop() {
    console.log('Här ska jag inte vara');    
    await this.juggle(false);
  }
  
  async juggle(shouldJuggle) {
    console.log('shouldJuggle', shouldJuggle);
    await this.setState({
        shouldJuggle: shouldJuggle
    });
  }

  getCurrentHorizontalScrollPosition() {
    return Math.abs(document.body.getBoundingClientRect().x);
  }

  render() {
    return (
      <div style={styles.container}>
        <div>
          <span onMouseDown={ () => {this.drive(true); this.setState({currentDirection: 'left'})} } onMouseUp={ () => this.stop() } style={styles.arrows}><MaterialIcon icon="keyboard_arrow_left" size={42} /></span>
          <span onMouseDown={ () => {this.drive(true); this.setState({currentDirection: 'right'}) }} onMouseUp={ () => this.stop()} style={styles.arrows}><MaterialIcon icon="keyboard_arrow_right" size={42}/></span>
        </div>
        <img src={car} className={this.getClassNames()} alt='car' style={styles.carImg}/>
      </div>
    );
  }

  
  getClassNames() {
    return classNames({
      'shake-slow': this.state.shouldJuggle,
      'shake-constant': this.state.shouldJuggle,
    });
  }

  preventDefaultScrolling() {
     window.addEventListener('wheel', e => {
      window.scrollTo(this.state.scrollPos, 0);
      e.stopPropagation()
      e.preventDefault();
    });
  }
}

const styles = {
  container: {
    bottom: 0,
    position: 'fixed',
    left: 100,
    display: 'grid',
    gridColumnGap: '100px',
    gridRowGap: '10px',
  },
  arrows: {
    backgroundColor: 'transparent'
  },
  carImg: {
    maxWidth: 300,
  },
};

