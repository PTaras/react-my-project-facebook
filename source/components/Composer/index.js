// Core
import React, { Component } from 'react';

//Insruments
import Styles from './styles.m.css';

export default class Composer extends Component {
    render () {
        const { avatar, currentUserFirstName } = this.props;

        return (
            <section className = { Styles.composer } >
                    <img src = { avatar } />
                    <form>
                        <textarea placeholder = { 'hnh, {currentUserFirstName} ' } />
                        <input type = 'submit' value = 'Sent' />
                    </form> 
            </section>
        )
    }
}
