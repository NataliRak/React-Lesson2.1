import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, colums }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc"
      });
    } else {
      onSort({ path: item, order: "asc" });
    }
  };
  const selectedArrow = (item) => {
    if (selectedSort.path === item) {
      if (selectedSort.order === "asc") {
        return <i className="bi bi-caret-up-fill"></i>;
      } else {
        return <i className="bi bi-caret-down-fill"></i>;
      }
    }
  };
  return (
    <thead>
      <tr>
        {Object.keys(colums).map((colum) => (
          <th
            key={colum}
            onClick={colums[colum].path ? () => handleSort(colums[colum].path) : undefined}
            {...{ role: colums[colum].path && "button" }}
            scope="col">
            {colums[colum].name}
            {selectedArrow(colums[colum].path)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  colums: PropTypes.object.isRequired
};
export default TableHeader;
