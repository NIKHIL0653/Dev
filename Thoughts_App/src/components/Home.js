import React, { useState } from 'react';
import PostList from './PostList';
import Post from './Post';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <div className="home">
      <h1>Share Your Thoughts</h1>
      <Post addPost={addPost} />
      <PostList posts={posts} />
    </div>
  );
};

export default Home;
