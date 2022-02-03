import React from "react";

function ArrowRightIcon({
  height = "0.417vw",
  width = "0.677vw",
  color = "#40BA93",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 13 8"
    >
      <path
        fill={color}
        d="M12.354 4.354a.5.5 0 000-.708L9.172.464a.5.5 0 10-.708.708L11.293 4 8.464 6.828a.5.5 0 10.708.708l3.182-3.182zM0 4.5h12v-1H0v1z"
      ></path>
    </svg>
  );
}

export default ArrowRightIcon;
