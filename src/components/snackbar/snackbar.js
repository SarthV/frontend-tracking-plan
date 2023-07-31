import React, { useState, useEffect } from "react";
import "./Snackbar.css";

const Snackbar = ({ label, visible, setVisible, backgroundColor }) => {

  useEffect(() => {
    if (visible) {
      const timeoutId = setTimeout(() => {
        setVisible(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [visible]);

  const showSnackbar = () => {
    setVisible(true);
  };

  return (
    <div>
      {visible && <div className="snackbar"
      style={{
        backgroundColor
      }}
      >{label}</div>}
    </div>
  );
};

export default Snackbar;
