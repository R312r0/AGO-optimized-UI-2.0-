import React from "react";

function TradingIcon({ height = "1.406vw", width = "1.042vw", color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 20 27"
    >
      <path
        fill={color}
        d="M4.672.219L.241 4.505c-.509.476-.16 1.306.556 1.306H3.64v9.233c0 .845.715 1.536 1.588 1.536.874 0 1.589-.691 1.589-1.536V5.811H9.66c.715 0 1.064-.83.556-1.306L5.784.22A.81.81 0 005.228 0a.81.81 0 00-.556.219zm11.675 20.985v-9.233c0-.845-.714-1.536-1.588-1.536-.874 0-1.588.691-1.588 1.536v9.233h-2.844c-.714 0-1.064.83-.556 1.306l4.432 4.271a.836.836 0 001.128 0l4.432-4.27c.508-.477.143-1.307-.556-1.307h-2.86z"
      ></path>
    </svg>
  );
}

export default TradingIcon;
