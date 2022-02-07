import React from "react";

function LiquidityPoolsIcon({ height = "1.146vw", width = "1.146vw", color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 22 22"
    >
      <path
        fill={color}
        d="M2.2 11.15h8.95V2.2c0-.11.09-.2.2-.2h.652a9.976 9.976 0 017.07 2.928A9.958 9.958 0 0122 12a9.974 9.974 0 01-2.928 7.07 9.948 9.948 0 01-3.179 2.142A9.928 9.928 0 0112 22a9.976 9.976 0 01-7.07-2.928 9.947 9.947 0 01-2.143-3.178A9.925 9.925 0 011.998 12v-.65c.002-.11.093-.2.203-.2zM0 9.76l.066-.705a9.932 9.932 0 012.88-6.114A9.974 9.974 0 019.076.066L9.784 0c.118-.01.218.08.218.197V9.8a.2.2 0 01-.2.2L.2 9.977a.201.201 0 01-.2-.216z"
      ></path>
    </svg>
  );
}

export default LiquidityPoolsIcon;
