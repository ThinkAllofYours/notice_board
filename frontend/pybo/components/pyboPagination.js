import React from "react";
import { Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";

const PyboPagination = ({ currentPage, totalPages, onPageChange }) => {
  const [active, setActive] = useState(currentPage || 1);
  useEffect(() => {
    setActive(currentPage);
  }, [currentPage]);

  const items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} className="mx-1" active={number === active} onClick={() => {
        setActive(number);
        onPageChange(number);
      }}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <div className="d-flex justify-content-center">
      <Pagination>
        <Pagination.Prev className="mx-1" />
        {items}
        <Pagination.Next className="mx-1" />
      </Pagination>
    </div>
  );
};

export default PyboPagination;
