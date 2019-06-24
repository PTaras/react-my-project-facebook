// Core
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

//Components 
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

@withProfile
export default class Postman extends Component {

    _animatePostmanEnter = (Postman) => {
        fromTo(Postman, 2, { opacity: 0, x: 500 }, { opacity: 1, x: 0 })
    };
    
    _animatePostmanExit = (Postman) => {
        fromTo(Postman, 2, { opacity: 1, x: 0 }, { opacity: 0, x: 500 })
    };
    
    render () {

        const { avatar, currentUserFirstName } = this.props;

        return (
            <Transition
                appear 
                in 
                timeout = { 4000 }
                onEnter = { this._animatePostmanEnter }
                onEntered = { this._animatePostmanExit }>   
                <section className = { Styles.postman }>
                    <img src = { avatar } />
                    <span>Welcome online, {currentUserFirstName}</span>
                </section>
            </Transition>
        );
    }
}