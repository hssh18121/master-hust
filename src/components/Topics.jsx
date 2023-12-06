import { useState, useEffect } from 'react';
import { getAllPosts } from '../services/PostApi';
const Topics = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Use the getAllPosts function to fetch data when the component mounts
    getAllPosts()
      .then((postsData) => {
        setPosts(postsData);
      })
      .catch((error) => {
        console.error('Error fetching posts: ', error);
      });
  }, []); // Empty dependency array ensures that the effect runs only once, similar to componentDidMount
  return (
    <div className="">
      <div className="h-44">Topics page</div>
      <div>
      <h2>Post List</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>: {post.content}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default Topics;
