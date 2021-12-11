import React from "react";

const Qualitie = ({ color, name }) => {
  return <td className={"badge rounded-pill m-1 bg-" + color}>{name}</td>;
};

export default Qualitie;
