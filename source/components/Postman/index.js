// Core
import React, { Component } from 'react';

//Components
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

@withProfile
export default class Postman extends Component {
    render () {

        const { avatar, currentUserFirstName } = this.props;

        return (
            <section className = { Styles.postman }>
                <img src = { avatar } />
                <span>Welcome online, {currentUserFirstName}</span>
            </section>
        );
    }
}
