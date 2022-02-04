import React from "react";

function DashboardIcon({ height = "0.938vw", width = " 1.146vw", color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 22 18"
    >
      <path
        fill={color}
        d="M15.4 0l2.519 3.265-5.368 6.959-4.4-5.704L0 15.1l1.551 2.01 6.6-8.555 4.4 5.704 6.93-8.969L22 8.555V0h-6.6z"
      ></path>
    </svg>
  );
}

export default DashboardIcon;
