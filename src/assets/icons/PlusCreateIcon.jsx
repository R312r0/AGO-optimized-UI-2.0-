import React from "react";

function Icon({ height = "1.094vw", width = "1.094vw", color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 21 21"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M10.5 0a.875.875 0 01.875.875v8.75h8.75a.875.875 0 110 1.75h-8.75v8.75a.875.875 0 11-1.75 0v-8.75H.875a.875.875 0 010-1.75h8.75V.875A.875.875 0 0110.5 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;
