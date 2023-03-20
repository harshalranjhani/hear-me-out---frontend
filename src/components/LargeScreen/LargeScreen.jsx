/* eslint-disable arrow-body-style */
import React from "react";

import "../../App.css";
// import largeOverlay from "../../assets/images/LargeOverlay.svg";

const LargeScreen = () => {
  return (
    <div className="largescreen">
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: " center",
          margin: 5,
        }}
      >
        Please use a larger screen
      </h1>
    </div>
  );
};

export default LargeScreen;
