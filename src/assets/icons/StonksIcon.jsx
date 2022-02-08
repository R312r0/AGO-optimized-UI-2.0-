import React from "react";

function StonksIcon({ width = "3.281vw", height = "3.281vw", color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 63 63"
    >
      <path
        fill={color}
        d="M9.947 44.763L0 54.512V26.526h9.947v18.237zm16.58-6.1l-5.207-4.444-4.741 4.377V13.263h9.947v25.4zm16.578-5.505l-9.947 9.947V0h9.947v33.158zm9.318-.63l-6.002-6.002H63v16.58l-5.935-5.936-23.907 23.708-11.506-10.014L9.118 63H0l21.453-21.022 11.705 9.88"
      ></path>
    </svg>
  );
}

export default StonksIcon;
