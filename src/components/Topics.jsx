import { useState, useEffect } from 'react';
import { getPosts } from '../services/PostService';
const Topics = () => {
  const [posts, setPosts] = useState([]);
  const currentPage = 2

  useEffect(() => {
    const fetchData = async () => {
      try {
          const postsData = await getPosts(currentPage);
          const postsWithTopics = await Promise.all(postsData.map(async (post) => {
              if (post.topicRef !== undefined) {
                  const topicSnapshot = await post.topicRef.get();
                  const topicData = topicSnapshot.data();
                  return { ...post, topic: topicData };
              }
              return post;
          }));

          setPosts(postsWithTopics);
      } catch (error) {
          console.error('Error fetching posts: ', error);
      }
  };

  fetchData();
  }, []);
  return (
    <div className="">
      <div className="h-44">Topics page</div>
      <div>
      <h2>Post List</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>: {post.content}
            <strong>Topic: {post.topic.name}</strong>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default Topics;
