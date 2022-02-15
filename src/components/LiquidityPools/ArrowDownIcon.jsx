import React from "react";

function ArrowDownIcon({
  height = "1.094vw",
  width = "0.833vw",
  color,
  onClick,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 16 21"
      onClick={onClick}
    >
      <path
        fill={color}
        d="M7.293 20.707a1 1 0 001.414 0l6.364-6.364a1 1 0 00-1.414-1.414L8 18.586l-5.657-5.657A1 1 0 00.93 14.343l6.364 6.364zM7 0v20h2V0H7z"
      ></path>
    </svg>
  );
}

export default ArrowDownIcon;
