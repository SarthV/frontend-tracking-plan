import React from "react";

const Input = ({ type, id, name, value, onChange, height }) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="decent-input"
      style = {{
        height,
      }}
    />
  );
};

export default Input;
