import React from 'react';
import Button from '@mui/material/Button';
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination mt-3' >
        {pageNumbers.map(number => (
          <li key={number} style={{"marginRight":"10px"}}>
           
            <Button onClick={() => paginate(number)}  variant="outlined" >
            {number}
      </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;