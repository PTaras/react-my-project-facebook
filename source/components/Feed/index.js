// Core
import React, { Component } from 'react';

//Components
import { withProfile } from 'components/HOC/withProfile';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';
import Catcher from 'components/Catcher';

//Instruments
import Styles from './styles.m.css';
import { api, TOKEN } from 'config/api';
import { socket, GROUP_ID, POST_ID } from 'socket/init';

@withProfile
export default class Feed extends Component {
    state = {
        posts: [],
        isPostSpinning: false,
    };

    componentDidMount () {

        const { currentUserFirstName, currentUserLastName } = this.props;

        this._fetchPosts();

        socket.emit('join', GROUP_ID, POST_ID);

        socket.on('create', (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) =>({
                    posts: [createdPost, ...posts],
                }));
            }
        });

        socket.on('remove', (postJSON) => {
            const { data: removedPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) =>({
                    posts: posts.filter((post) => post.id !== removedPost.id),
                }));
            }
        });

        socket.on('like', (postJSON) => {
            const { data: likedPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ likes }) =>({
                    posts: [likedPost, ...likes],
                }));
            }
        });
    }

    componentWillUnmount () {
       socket.removeListener('create');
       socket.removeListener('remove');
       socket.removeListener('like');
    }
    
    _setPostSpinningState = (state) => {
        this.setState({
            isPostSpinning: state,
        });
    }

    _fetchPosts = async () => {
        this._setPostSpinningState(true);

        const response = await fetch(api, {
            method: 'GET',
        });

        const { data: posts } = await response.json();

        this.setState({
            posts,
            isPostSpinning: false,
        });
    };

    _createPost = async (comment) => {
        this._setPostSpinningState(true);

        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: TOKEN,
            },
            body: JSON.stringify({ comment }),
        });

        const { data: post } = await response.json();

        this.setState(({ posts }) => ({
            posts:          [post, ...posts],
            isPostSpinning: false,
        }));
    }

    _likePost = async ( GROUP_ID) => {
        this._setPostSpinningState(true);
        
        const response = await fetch(`${api}/${GROUP_ID}`, {
            method: 'PUT',
            headers: {
                Authorization: TOKEN,
            },
        });

        const { data: likePost } = await response.json();

        this.setState(({ posts }) => ({
            posts: posts.map(
                (post) => post.id === likePost.id ? likePost : post,
            ),
            isPostSpinning: false,
        }));
    };

     _removePost = async (GROUP_ID) => {
        this._setPostSpinningState(true); 

        await fetch(`${api}/${GROUP_ID}`, {
                method: 'DELETE',
                headers: {
                    Authorization: TOKEN,
                },
            });

        this.setState(({ posts }) => ({
            posts:          posts.filter((post) => post.id !== GROUP_ID),
            isPostSpinning: false,
        }));
    };


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
