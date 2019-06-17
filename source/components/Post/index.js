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

    _removePost = () => {
        const { _removePost, id } = this.props;

        _removePost(id);
    }
    
    render () {
        const { comment, created, _likePost, id, likes, firstName, lastName } = this.props;
        
        return (
            <section className = { Styles.post }>
                <span className = { Styles.cross } onClick = { this._removePost } ></span>
                <img src = { avatar } />
                <a>{`${firstName} ${lastName}`}</a>
                &nbsp;
                <time>
                    {moment.unix(created).format('MMMM DD hh:mm:ss')}
                </time>
                <p>{comment}</p>
                <Like 
                    id = { id } 
                    likes ={ likes } 
                    _likePost = { _likePost } 
                />
            </section>
        );
    }
}

