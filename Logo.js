// Logo.js
import React from "react";
import Svg, { Rect, G, Path } from "react-native-svg";
import PropTypes from "prop-types";

const Logo = ({ width = 50, height = 50 }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 135.46666 135.46667"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Rect width="135.46666" height="135.46666" fill="#213B5E" />
    <G transform="matrix(1.7409278,0,0,1.7409278,9.6660992,-84.834724)">
      <Path
        d="M 11.348178,63.634851 24.969691,87.63606 11.348178,111.63727 H 22.812347 L 36.433866,87.63606 22.812347,63.634851 Z"
        fill="#ffffff"
        stroke="#ffffff"
        strokeWidth="3.07431"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M 33.129142,63.634851 46.750655,87.63606 33.129142,111.63727 H 44.593316 L 58.214833,87.63606 44.593316,63.634851 Z"
        fill="#ffffff"
        stroke="#ffffff"
        strokeWidth="3.07431"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

Logo.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Logo;
