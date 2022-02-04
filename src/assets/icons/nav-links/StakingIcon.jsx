import React from "react";

function StakingIcon({ height = "1.094vw", width = "0.990vw", color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 19 21"
    >
      <path
        fill={color}
        d="M9.5 0C4.251 0 0 2.088 0 4.667c0 2.578 4.251 4.666 9.5 4.666S19 7.245 19 4.667C19 2.088 14.749 0 9.5 0zM0 7v3.5c0 2.578 4.251 4.667 9.5 4.667S19 13.078 19 10.5V7c0 2.578-4.251 4.667-9.5 4.667S0 9.578 0 7zm0 5.833v3.5C0 18.912 4.251 21 9.5 21s9.5-2.088 9.5-4.667v-3.5c0 2.579-4.251 4.667-9.5 4.667S0 15.412 0 12.833z"
      ></path>
    </svg>
  );
}

export default StakingIcon;
