/* eslint-disable react/prop-types */
// import React from 'react'

import { useNavigate } from "react-router-dom";



function Post( { post } )
{
    const navigate = useNavigate()
    if ( !post ) return <></>
    return (
      <div onClick={() => navigate(`/posts/detail/${post.id}`)}>
        <strong>{post.title}</strong>: {post.content}
        <strong>Topic: {post.topic.name}</strong>
      </div>
    );
}


export default Post