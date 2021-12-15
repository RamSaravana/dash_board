import React from "react";
import "./Plate.css";

const Plate = ({ children, dimensions, plateTitle }) => {
  return (
    <div
      className="plateStyle"
      style={{
        backgroundColor: "#28293f",
        ...dimensions,
      }}
    >
      <h2 className="plateTitle">{plateTitle}</h2>
      <div>{children}</div>
    </div>
  );
};

export default Plate;
