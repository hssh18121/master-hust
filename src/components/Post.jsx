/* eslint-disable react/prop-types */
// import React from 'react'

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { FaRegCommentAlt, FaArrowUp } from "react-icons/fa";

function Post({ post }) {
  const navigate = useNavigate();
  if (!post) return <>No more posts</>;
  return (
    <div
      onClick={() => navigate(`/posts/detail/${post.id}`)}
      className={`flex flex-col gap-4 h-[324px] overflow-hidden p-4 cursor-pointer bg-white rounded-md shadow-md hover:-translate-y-1 duration-100`}
    >
      <div className="flex gap-4">
        <img className="w-12 h-12 rounded-full" src={post.user.avatarUrl} />
        <div>
          <strong>{post.user.name}</strong>
          <p className="text-xs font-thin">
            {moment(post.createdAt.toDate()).fromNow()}
          </p>
        </div>
      </div>
      <strong>{post.title}</strong>
      <div>
        {post.content.length > 300
          ? post.content.substring(0, 250) + "..."
          : post.content}
      </div>
      <div className="flex w-1/3 justify-around text-xs font-thin">
        12 <FaRegCommentAlt />
        23 <FaArrowUp />
      </div>
    </div>
  );
}

export default Post;
