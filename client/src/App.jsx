import React from 'react';
import './App.css';
import CreatePost from './components/CreatePost';
import Post from './components/Post';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import SinglePost from './components/SinglePost';
import Register from './components/Register';
import Login from './components/Login';
import HomePage from './components/HomePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route exact path="/CreatePost" element={<CreatePost />} />
        <Route path="/post" element={<Post />} />
        <Route path="/post/:id" element={<SinglePost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;