// Core
import React, { Component } from 'react';
import moment from 'moment';

//Insruments
import avatar from 'theme/assets/homer';
import Styles from './styles.m.css';

export default class Post extends Component {
    render () {
        return (
            <section className = { Styles.post }>
                <img src = { avatar } />
                <a>Name: </a>
                <time>{moment().format('MMMM DD hh:mm:ss')}</time>
                <p>Hello!</p>
            </section>
        )
    }
}