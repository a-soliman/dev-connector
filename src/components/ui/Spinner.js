import React from "react";

const Spinner = () => {
  return (
    <div>
      <img
        src="/images/loader.gif"
        alt="Loading..."
        style={{
          width: "200px",
          margin: "auto",
          display: "block"
        }}
      />
    </div>
  );
};

export default Spinner;
