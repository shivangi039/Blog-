import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import parse from 'html-react-parser';

const Post = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    const newPost = () => {
        navigate("/CreatePost")
    }

    const getPost = async () => {
        const response = await fetch('http://localhost:4000/api/blogs');
        setUsers(await response.json());
    }

    const viewPost = (id) => {
        navigate(`/post/${id}`)
    }

    useEffect(() => {
        getPost();
    }, []);

    const deletePost = async (id) => {
        const isConfirm = confirm("Do you really want to delete this record?")
        if (isConfirm) {
            await fetch(`http://localhost:4000/api/delete/${id}`).then(() => {
                getPost()
            })
        } else {
            return false
        }
    }


    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}   ${date.getHours()} : ${date.getMinutes()}`
    }


    return (
        <>
            <div className='post-wrapper d-flex justify-content-center flex-column align-items-center'>
                <h2>Blog Lists</h2>
                <header>
                    <button onClick={newPost}><i className="zmdi zmdi-plus-circle"></i>Create New Post</button>
                </header>
                <div className='post-container'>
                    {
                        users.reverse().map((curElem) => {
                            return (
                                <div className='post' key={curElem._id}>
                                    <div className='title'>
                                        {curElem.title}
                                    </div>
                                    <div className='blog-body'>
                                        <span>Description:</span>
                                        {parse(curElem.body)}
                                    </div>
                                    <div className='date'>
                                        <span className='author-name'>{curElem.author}</span>
                                        <i className="zmdi zmdi-calendar"></i>
                                        {formatDate(curElem.createdAt)}
                                    </div>
                                    <div className='view'>
                                        <button className="view-btn" onClick={() => viewPost(curElem._id)}><i className="zmdi zmdi-eye"></i>View</button>
                                        <button className="delete-btn" onClick={() => deletePost(curElem._id)}>Delete</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Post;