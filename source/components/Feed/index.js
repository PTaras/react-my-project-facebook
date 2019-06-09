// Core
import React, { Component } from 'react';
import moment from 'moment';

//Components
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';

//Instruments
import Styles from './styles.m.css';
import { getUniqueID } from 'instruments';

export default class Feed extends Component {
    constructor () {
        super();

        this._creatPost = this._creatPost.bind(this);
    }
  
    state = {
        posts: [
            { id: '123', comment: 'Hi there!', created: 1526825076849 },
            { id: '456', comment: 'Privet', created: 1526825076855 }
        ],
        isPostGetting: false,
    };

    _creatPost (comment) {
        const post = {
            id:      getUniqueID(),
            created: moment().utc(),
            comment,
        };

        this.setState(({ posts }) => ({
            posts: [post, ...posts],
        }));
    }

    render () {
        const { posts, isPostGetting } = this.state;

        const postsJSX = posts.map((post) => {
            return <Post key = { post.id } { ...post } />;
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPostGetting } />
                <StatusBar />
                <Composer _creatPost = { this._creatPost } />
                {postsJSX}
            </section>
        );
    }
}
