import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

const SinglePost = () => {
  const [postById, setPostById] = useState();
  const params = useParams();
  const navigate = useNavigate();

  const newPost = () => {
    navigate("/post")
  }

  const editHandler = (item) => {
    navigate(`/CreatePost`, { state: item })
  }


  const findPost = async (id) => {
    const response = await fetch(`http://localhost:4000/api/blog/${id}`);
    setPostById(await response.json())
  }

  useEffect(() => {
    findPost(params.id);
  }, [params.id]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}   ${date.getHours()} : ${date.getMinutes()}`
  }

  return (
    <>
      {postById && (
        <div className='singlePost-wrapper'>
          <div className='singlePost'>
            <div className='singlePage-title'>
              {postById.title}
            </div>
            <div className='singleBlog-body'>
              <span>Description:</span>
              {parse(postById.body)}
            </div>
            <div className='singleBlog-date'>
              <span className='author-name'>
                {postById.author}
              </span>
              <i className="zmdi zmdi-calendar"></i>
              {formatDate(postById.createdAt)}
            </div>
            <div className='singlePost-btn'>
              <button onClick={newPost}><i className="zmdi zmdi-arrow-left"></i>Back</button>
              <button className='edit' onClick={() => editHandler(postById)}><i className="zmdi zmdi-edit"></i>Edit</button>
            </div>
          </div>
        </div>
      )
      }
    </>
  )
}

export default SinglePost;