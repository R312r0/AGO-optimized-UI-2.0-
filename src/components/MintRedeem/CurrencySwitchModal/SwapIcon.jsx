import React from "react";

function SwapIcon({
  height = "1.250vw",
  width = "1.250vw",
  color = "#40BA93",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 23l-4-4 4-4"
      ></path>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 13v2a4 4 0 01-4 4H3M17 1l4 4-4 4"
      ></path>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 11V9a4 4 0 014-4h14"
      ></path>
    </svg>
  );
}

export default SwapIcon;
