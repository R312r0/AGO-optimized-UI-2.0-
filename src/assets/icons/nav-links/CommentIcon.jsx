import React from "react";

function CommentIcon({ height = "0.938vw", width = " 1.042vw", color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 20 18"
    >
      <path d="M20 2.571v9c0 1.415-1.125 2.572-2.5 2.572h-5V18l-5-3.857h-5c-1.376 0-2.5-1.157-2.5-2.572v-9C0 1.157 1.124 0 2.5 0h15C18.875 0 20 1.157 20 2.571z"></path>
    </svg>
  );
}

export default CommentIcon;
