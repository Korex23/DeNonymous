import React, { useState } from "react";
import FileUpload from "./FileUpload";
import AudioRecorder from "./AudioRecorder";

const CreatePost = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const postId = Date.now(); // Generate a unique ID for the post
    const post = {
      id: postId,
      content: newPost,
      replies: [],
    };
    setPosts([...posts, post]);
    setNewPost("");
  };

  const handleReplySubmit = (e, postId) => {
    e.preventDefault();
    const replyContent = e.target.reply.value;
    const reply = {
      id: Date.now(), // Generate a unique ID for the reply
      content: replyContent,
    };
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          replies: [...post.replies, reply],
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    e.target.reset();
  };

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handlePostSubmit}>
        <textarea value={newPost} onChange={handlePostChange} />
        <button type="submit">Create Post</button>
      </form>
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.content}</p>
          <form onSubmit={(e) => handleReplySubmit(e, post.id)}>
            <input type="text" name="reply" />
            <button type="submit">Reply</button>
          </form>
          <ul>
            {post.replies.map((reply) => (
              <li key={reply.id}>{reply.content}</li>
            ))}
          </ul>
          <FileUpload postId={post.id} />
          <AudioRecorder postId={post.id} />
        </div>
      ))}
    </div>
  );
};

export default CreatePost;
