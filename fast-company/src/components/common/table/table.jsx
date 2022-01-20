import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ onSort, selectedSort, colums, data, children }) => {
  return (
    <table className="table table-dark table-hover ">
      {children || (
        <>
          <TableHeader {...{ onSort, selectedSort, colums }} />
          <TableBody {...{ colums, data }} />
        </>
      )}
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  colums: PropTypes.object,
  children: PropTypes.array
};

export default Table;
