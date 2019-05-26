// Core
import React, { Component } from 'react';

//Insruments
import avatar from 'theme/assets/homer';
import Styles from './styles.m.css';

export default class Composer extends Component {
    render () {
        return (
            <section className = { Styles.composer } >
                    <img src = { avatar } />
                    <form>
                        <textarea placeholder = { 'Text' } />
                        <input type = 'submit' value = 'Sent' />
                    </form> 
            </section>
        )
    }
}