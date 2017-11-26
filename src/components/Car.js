import React, { Component } from 'react';
import car from '../img/car.jpg';
import classNames from 'classnames';
import MaterialIcon from 'react-google-material-icons'
//import { CSSTransitionGroup } from 'react-transition-group' // ES6

//https://elrumordelaluz.github.io/csshake/

export default class Car extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shouldJuggle: false,
      scrollPos: 0
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
          this.drive(true);
      }
    });
    document.body.addEventListener('keyup', e => {
        this.juggle(false);
    });
  }

  scrollWindow(i) {
    window.scrollTo(this.state.scrollPos + 10, 0);
    this.setState({scrollPos: this.state.scrollPos + 10});
    i ++
    if(i > 100) {return;}
  }

  drive(usingKeyboard, right) {
    this.juggle(true);
    if (!usingKeyboard) {
        console.log("prupp");
        this.scrollWindow();
    }
  }


  stop() {
    this.juggle(false);
  }
  
  juggle(shouldJuggle) {
    this.setState({
        shouldJuggle: shouldJuggle
    });
  }

  render() {
    return (
      <div style={styles.container}>
        <div>
          <span onMouseDown={ () => this.drive(false, false)} onMouseUp={this.stop.bind(this)} style={styles.arrows}><MaterialIcon icon="keyboard_arrow_left" size={42} /></span>
          <span onMouseDown={ () => this.drive(false, true)} onMouseUp={this.stop.bind(this)} style={styles.arrows}><MaterialIcon icon="keyboard_arrow_right" size={42}/></span>
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
    
  },
  carImg: {
    maxWidth: 300,
  },
};
