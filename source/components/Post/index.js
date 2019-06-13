// Core
import React, { Component } from 'react';
import moment from 'moment';
import { func, string, number, array } from 'prop-types';

//Components
import Like from 'components/Like';
import { Consumer } from 'components/HOC/withProfile';

//Instruments
import Styles from './styles.m.css';
export default class Post extends Component {
    static propTypes = {
        comment:        string.isRequired,
        created:        number.isRequired,
        _removePost:    func.isRequired,
        _likePost:      func.isRequired,
        likes:          array.isRequired,
        id:             string.isRequired,
    };

    constructor () {
        super();
        this._removePost = this._removePost.bind(this);
    }

    _removePost () {
        const { _removePost, id } = this.props;

        _removePost(id);
    }
    
    render () {
        const { comment, created, _likePost, id, likes, } = this.props;

        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.post }>
                        <span className = { Styles.cross } onClick = { this._removePost } ></span>
                        <img src = { context.avatar } />
                        <a>{`${context.currentUserFirstName} ${context.currentUserLastName}`}</a>
                        &nbsp;
                        <time>
                            {moment.unix(created).format('MMMM DD hh:mm:ss')}
                        </time>
                        <p>{comment}</p>
                        <Like 
                            id = { id } 
                            likes ={ likes } 
                            _likePost = { _likePost } 
                            { ...context } /> 
                    </section>
                )}
            </Consumer>
        );
    }
}

