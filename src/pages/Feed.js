import React, { Component } from 'react';
import api from '../services/api'; 
import io from 'socket.io-client';

import './Feed.css';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import send from '../assets/send.svg';
import comment from '../assets/comment.svg';


// Criando um componente como classe
class Feed extends Component {

    state = {
        feed: [],
    };

    async componentDidMount() {
        this.registerToSocket();

        const response = await api.get('posts');

        this.setState({ feed: response.data });
    }

    registerToSocket = () => {
        const socket = io('http://localhost:3333');

        // post, like 

        socket.on('post', newPost => {
            this.setState({feed: [newPost, ...this.state.feed]})

        });

        socket.on('like', likedPost => {
            this.setState({
                feed: this.state.feed.map(post =>
                    post._id === likedPost._id ? likedPost : post
                
                )
            })

        });

    }

    handleLike = id => {
        api.post(`/posts/${id}/like`);
    }

    // Metodo render é obrigatório para importar o html para dentro do root
    render() {
        return (
            <section id="post-list">
                { this.state.feed.map(post =>(
                    <article key={post._id}>
                    <header>
                        <div className="user-info">
                            <span>{post.author}</span>
                            <span className="place">{post.place}</span>
                        </div>

                        <img src={more} alt="mais"/>
                    </header>
                    <img src={`http://localhost:3333/files/${post.image}`} alt=""/>
                    <footer>
                        <div className="actions">
                            <button type="button" onClick={() => this.handleLike(post._id)}>
                                <img src={like} alt="Curtir"/>
                            </button>
                            <img src={comment} alt="Comentar"/>
                            <img src={send} alt="Compartilhar"/>
                        </div>

                        <strong>{post.likes} curtidas</strong>
                        <p>{post.description} 
                            <span>{post.hashtags}</span>
                        </p>
                    </footer>
                </article>
                ))}
            </section>
        );
    }
}

export default Feed;