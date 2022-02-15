import React from "react";

function ChartLineIcon({ height = "0.729vw", width = "0.729vw", color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 14 14"
    >
      <path
        fill={color}
        d="M14 13.25a.75.75 0 01-.75.75H1.75A1.75 1.75 0 010 12.25V.75a.75.75 0 111.5 0v11.5c0 .138.112.25.25.25h11.5a.75.75 0 01.75.75z"
      ></path>
      <path
        fill={color}
        d="M9 2.75A.75.75 0 019.75 2h3.5a.75.75 0 01.75.75v3.5a.75.75 0 11-1.5 0V4.56L8.53 8.53a.75.75 0 01-1.06 0L6 7.06 3.78 9.28a.75.75 0 01-1.06-1.06l2.75-2.75a.75.75 0 011.06 0L8 6.94l3.44-3.44H9.75A.75.75 0 019 2.75z"
      ></path>
    </svg>
  );
}

export default ChartLineIcon;
