// Posts.js
import { useLocation, useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';

const Posts = () => {
  const location = useLocation();
  const navigateTo = useNavigate();

  const currentPageParam = new URLSearchParams(location.search).get('page') || 1;
  const currentPage = parseInt(currentPageParam)

  const handleChange = (event, pageValue) => {
    navigateTo(`/posts?page=${pageValue}`)
  };

  return (
    <div>
      <h1>Posts Page</h1>
      <p>Current Page: {currentPage}</p>
      <Pagination count={5} color="primary" page={currentPage} onChange={handleChange}/>
    </div>
  );
};

export default Posts;
