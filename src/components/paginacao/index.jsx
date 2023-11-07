import React from 'react';
import { Pagination } from 'react-bootstrap';

export default function Paginacao({ numberPage, setNumberPage, totalPages }) {
  return (
    <Pagination>
      <Pagination.First
        onClick={() => setNumberPage(0)}
        disabled={numberPage === 0}
      />
      <Pagination.Prev
        onClick={() => setNumberPage(numberPage - 1)}
        disabled={numberPage === 0}
      />

      {Array.from({ length: totalPages }, (_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index === numberPage}
          onClick={() => setNumberPage(index)}
        >
          {index + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next
        onClick={() => setNumberPage(numberPage + 1)}
        disabled={numberPage === totalPages - 1}
      />
      <Pagination.Last
        onClick={() => setNumberPage(totalPages - 1)}
        disabled={numberPage === totalPages - 1}
      />
    </Pagination>
  );
}
