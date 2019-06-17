// Core
import React, { Component } from 'react';
import moment from 'moment';

//Components
import { withProfile } from 'components/HOC/withProfile';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';
import Catcher from 'components/Catcher';

//Instruments
import Styles from './styles.m.css';
import { getUniqueID, delay } from 'instruments';
import { api } from 'config/api';
import { async } from 'q';

@withProfile
export default class Feed extends Component {
    state = {
        posts: [],
        isPostSpinning: false,
    };

    componentDidMount () {
        this._fetchPosts();
    }

    _setPostSpinningState = (state) => {
        this.setState({
            isPostSpinning: state,
        });
    }

    _fetchPosts = async () => {
        this._setPostSpinningState(true);

        const reponse = await fetch(api, {
            method: 'GET',
        });

        const { data: posts } = await reponse.json();

        this.setState({
            posts,
            isPostSpinning: false,
        });
    };

    _createPost = async (comment) => {
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

    _likePost = async (id) => {
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

     _removePost = async (id) => {

        this._setPostSpinningState(true); 

        await delay(1000);

        this.setState({
            posts: this.state.posts.filter((post) => post.id !== id), 
                isPostSpinning: false, 
        });
    }


    render () {
        const { posts, isPostSpinning } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Catcher key = { post.id }>
                     <Post 
                        { ...post } 
                        _likePost = { this._likePost } 
                        _removePost = { this._removePost } 
                    />
                </Catcher>
            );
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
