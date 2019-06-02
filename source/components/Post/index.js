// Core
import React, { Component } from 'react';
import moment from 'moment';

//Insruments
import Styles from './styles.m.css';
export default class Post extends Component {
    render () {
        const {
            currentUserFirstName,
            currentUserLastName,
            avatar,
        } = this.props;

        return (
            <section className = { Styles.post }>
                <img src = {  avatar } />
                <a>{'${currentUserFirstName} ${currentUserLastName}'}</a>
                <time>{moment().format('MMMM DD hh:mm:ss')}</time>
                <p>Hello!</p>
            </section>
        )
    }
}

