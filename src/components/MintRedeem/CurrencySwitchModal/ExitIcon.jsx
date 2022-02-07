import React from "react";

function ExitIcon({
  height = "0.729vw",
  width = "0.729vw",
  color = "#828282",
  onClick,
  style,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 14 14"
      style={style}
      onClick={onClick}
    >
      <path
        fill={color}
        d="M0 1l1-1 6 6 6-6 1 1-6 6 6 6-1 1-6-6-6 6-1-1 6-6-6-6z"
      ></path>
    </svg>
  );
}

export default ExitIcon;
