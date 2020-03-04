import React from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';

const Svg = styled.svg`
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  font-style: normal;
  font-weight: normal;
  speak: none;
  margin-right: 0.2em;
  text-align: center;
  font-variant: normal;
  text-transform: none;
  line-height: 1em;
  margin-left: 0.2em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const Icon = ({ icon }) => (
  <Svg viewBox={icon.viewBox}>
    {icon.path.map((path, i) => {
      // eslint-disable-next-line react/no-array-index-key
      return <path key={`path-${i}`} d={path} />;
    })}
  </Svg>
);

Icon.propTypes = {
  icon: PropTypes.shape({
    path: PropTypes.arrayOf(PropTypes.string).isRequired,
    viewBox: PropTypes.string.isRequired,
  }).isRequired,
};

export default Icon;
