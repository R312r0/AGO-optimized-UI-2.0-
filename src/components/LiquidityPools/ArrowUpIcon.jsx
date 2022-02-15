import React from "react";

function ArrowUpIcon({
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
        d="M8.707.293a1 1 0 00-1.414 0L.929 6.657A1 1 0 002.343 8.07L8 2.414l5.657 5.657a1 1 0 101.414-1.414L8.707.293zM9 21V1H7v20h2z"
      ></path>
    </svg>
  );
}

export default ArrowUpIcon;
