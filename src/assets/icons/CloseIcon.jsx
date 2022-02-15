import React from "react";

function CloseIcon({ height = "0.677vw", width = "0.677vw", color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 13 13"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6.243 6.243l5.243 5.243M1 11.486l5.243-5.243L1 11.486zM11.486 1L6.242 6.243 11.486 1zM6.242 6.243L1 1l5.242 5.243z"
      ></path>
    </svg>
  );
}

export default CloseIcon;
