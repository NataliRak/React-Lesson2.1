import React from "react";
import Qualitie from "./quality";
import PropTypes from "prop-types";

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((quality) => (
        <Qualitie key={quality._id} name={quality.name} color={quality.color} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array
};
export default QualitiesList;
