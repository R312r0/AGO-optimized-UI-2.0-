import React from "react";

function LineIcon({ width = "0.052vw", height = "2.604vw", color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 1 50"
    >
      <path stroke={color} d="M0.5 0L0.5 50"></path>
    </svg>
  );
}

export default LineIcon;
