import React from "react";
import { Pagination } from "@mui/material";

const Page = ({ currentPage, setCurrentPage, totalPages }) => {
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
        paddingBottom: "10px",
      }}
    >
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        size="large"
      />
    </div>
  );
};

export default Page;
