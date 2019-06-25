// Core
import React, { Component } from 'react';
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import { fromTo } from 'gsap';

//Components
import { withProfile } from 'components/HOC/withProfile';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';
import Catcher from 'components/Catcher';
import Postman from 'components/Postman';

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
                this.setState(({ posts }) => ({
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
                this.setState(({ posts }) => ({
                    posts: posts.filter((post) => post.id !== removedPost.id),
                }));
            }
        });

        socket.on('like', (postJSON) => {
            const { data: likePost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.map(
                        (post) => post.id === likePost.id ? likePost : post,
                    ),
                }));
            }
        });
    }

    componentWillUnmount () {
       socket.removeListener('create');
       socket.removeListener('remove');
       socket.removeListener('like');
       socket.removeListener('unlike');
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

    _likePost = async ( GROUP_ID ) => {
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

     _removePost = async ( GROUP_ID ) => {
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

    _animateComposerEnter = (composer) => {
        fromTo(
            composer, 
            1, 
            { opacity: 0, rotationX: 50 }, 
            { opacity: 1, rotationX: 0 },
            );
    };

    _animatePostmanEnter = (Postman) => {
        fromTo(Postman, 2, { opacity: 0, x: 500 }, { opacity: 1, x: 0 })
    };
    
    _animatePostmanExit = (Postman) => {
        fromTo(Postman, 2, { opacity: 1, x: 0 }, { opacity: 0, x: 500 })
    };

    render () {
        const { posts, isPostSpinning } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <CSSTransition
                    classNames = { {
                        enter:       Styles.postInStart,
                        enterActive: Styles.postInEnd,
                        exit:        Styles.postOutStart,
                        exitActive:  Styles.postOutEnd,
                    } }
                    key = { post.id } 
                    timeout = { {
                        enter: 500,
                        exit:  600,
                    } }>
                    <Catcher>
                        <Post 
                            { ...post } 
                            _likePost = { this._likePost } 
                            _removePost = { this._removePost } 
                        />
                    </Catcher>
                </CSSTransition>
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPostSpinning } />
                <StatusBar />
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this._animateComposerEnter }>
                    <Composer _createPost = { this._createPost } />
                </Transition>
                <Transition
                    appear 
                    in 
                    timeout = { 5000 }
                    onEnter = { this._animatePostmanEnter }
                    onEntered = { this._animatePostmanExit }>
                    <Postman />
                </Transition>
                <TransitionGroup>{postsJSX}</TransitionGroup>
            </section>
        );
    }
}
