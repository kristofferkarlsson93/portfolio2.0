import React, { Component } from 'react';
import car from '../img/car.jpg';
import classNames from 'classnames';
import { CSSTransitionGroup } from 'react-transition-group' // ES6

//https://elrumordelaluz.github.io/csshake/

export default class Car extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isJuggling: false,    
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
                this.juggle(true);
            }
        });
        document.body.addEventListener('keyup', e => {
            this.juggle(false);
        })
      }
    
    juggle(shouldJuggle) {
        this.setState({
            isJuggling: shouldJuggle
        });
    }

    render() {
        return (

            <CSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}>
            <img src={car} className={this.getClassNames()} alt='car' style={styles.carImg}/>
            
          </CSSTransitionGroup>
        );
    }

    
    getClassNames() {
        return classNames({
            'shake-slow': this.state.isJuggling,
            'shake-constant': this.state.isJuggling,
        });
    }
}

const styles = {
    carImg: {
        maxWidth: 300,
        bottom: 0,
        position: 'fixed',
        left: 100,
    },
};
