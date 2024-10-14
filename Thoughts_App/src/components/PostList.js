import React from 'react';

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.map((post, index) => (
        <div key={index} className="post">
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
