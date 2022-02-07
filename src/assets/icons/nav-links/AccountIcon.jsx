import React from "react";

function AccountIcon({ height = "0.938vw", width = "0.885vw", color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 17 18"
    >
      <path
        fill={color}
        d="M8.5 0c1.127 0 2.208.45 3.005 1.253a4.292 4.292 0 011.245 3.025 4.292 4.292 0 01-1.245 3.025A4.236 4.236 0 018.5 8.555a4.236 4.236 0 01-3.005-1.252A4.292 4.292 0 014.25 4.278c0-1.135.448-2.223 1.245-3.025A4.236 4.236 0 018.5 0zm0 10.694c4.696 0 8.5 1.915 8.5 4.278v2.139H0v-2.139c0-2.363 3.804-4.278 8.5-4.278z"
      ></path>
    </svg>
  );
}

export default AccountIcon;
