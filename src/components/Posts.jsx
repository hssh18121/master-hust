// Posts.js
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { getPostsWithInfo } from "../services/PostService";
import Post from "./Post";

const Posts = () => {
  const location = useLocation();
  const navigateTo = useNavigate();

  const currentPageParam =
    new URLSearchParams(location.search).get("page") || 1;
  const currentPage = parseInt(currentPageParam);

  const handleChange = (event, pageValue) => {
    navigateTo(`/posts?page=${pageValue}`);
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const postList = await getPostsWithInfo(currentPage);
    postList.sort((a, b) => {
      if (b.createdAt.seconds !== a.createdAt.seconds)
        return b.createdAt.seconds - a.createdAt.seconds;
      else return b.createdAt.nanoseconds - a.createdAt.nanoseconds;
    });
    setPosts(postList);
  }

  return (
    <div>
      <div className="flex flex-wrap p-4">
        {posts
          ? posts.map((post) => <Post post={post} key={post.id} />)
          : "Loading"}
      </div>
      <Pagination
        count={posts.length / 6 + 1}
        color="primary"
        page={currentPage}
        onChange={handleChange}
      />
    </div>
  );
};

export default Posts;
