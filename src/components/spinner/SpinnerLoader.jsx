import React from "react";
import { HashLoader } from "react-spinners";

const SpinnerLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <HashLoader color="#4851b0" />
    </div>
  );
};

export default SpinnerLoader;
