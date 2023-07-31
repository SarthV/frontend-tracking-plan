import React from "react";
import "./Separator.css";

const Separator = ({height, color}) => {
  return <div className="separator" style ={{height, backgroundColor: color}}></div>;
};

export default Separator;
