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
    navigateTo(`/posts?page=${Number(pageValue)}`);
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

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
    <div className="max-w-6xl mx-auto my-5">
      <div className="grid grid-cols-3 p-4 gap-6">
        {posts
          ? posts.map((post) => <Post post={post} key={post.id} />)
          : "Loading"}
      </div>
      <div className="flex flex-wrap p-4 items-center justify-end">
        <Pagination
          count={2}
          color="primary"
          page={currentPage}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Posts;
