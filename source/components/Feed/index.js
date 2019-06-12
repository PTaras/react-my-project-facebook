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
import { getUniqueID, delay } from 'instruments';

export default class Feed extends Component {
    constructor () {
        super();

        this._createPost = this._createPost.bind(this);
        this._setPostSpinningState = this._setPostSpinningState.bind(this);
        this._likePost = this._likePost.bind(this);
        this._deletePost = this._deletePost.bind(this);
    }
  
    state = {
        posts: [
            { id: '123', comment: 'Hi there!', created: 1526825076849, likes: [], },
            { id: '456', comment: 'Privet', created: 1526825076855, likes: [], }
        ],
        isPostSpinning: false,
    };

    _setPostSpinningState (state) {
        this.setState({
            isPostSpinning: state,
        });
    }

    async _createPost (comment) {
        this._setPostSpinningState(true)

        const post = {
            id:         getUniqueID(),
            created:    moment().utc(),
            comment,
            likes:       [],
        }; 

        await delay(1200);

        this.setState(({ posts }) => ({
            posts: [post, ...posts],
            isPostSpinning: false,
        }));
    }

    async _likePost (id) {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._setPostSpinningState(true);

        await delay(1200);

        const newPosts = this.state.posts.map((post) => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id: getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName: currentUserLastName,
                        }
                    ],
                };
            }

                return post;
        });

        this.setState({
            posts:          newPosts,
            isPostSpinning: false, 
        });
    }

    async _deletePost (id) {

        this._setPostSpinningState(true);

        const newPosts = this.state.posts.filter(post => 
            post.id !== id);

        await delay(1200);

        this.setState({
             posts:          newPosts,
            isPostSpinning: false, 
        });
    }

    render () {
        const { posts, isPostSpinning } = this.state;

        const postsJSX = posts.map((post) => {
            return <Post key = { post.id } { ...post } _likePost = { this._likePost } _deletePost = { this._deletePost } />;
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPostSpinning } />
                <StatusBar />
                <Composer _createPost = { this._createPost } />
                {postsJSX}
            </section>
        );
    }
}
