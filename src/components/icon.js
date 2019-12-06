import React from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Tooltip from '@reach/tooltip';

import '@reach/tooltip/styles.css';

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

const Icon = ({ icon, tooltip }) => (
  <Tooltip
    label={tooltip}
    css={css`
      border-radius: 4px;
      margin-top: -130px;
    `}
    style={{ position: 'absolute', left: '-10px' }}
  >
    <Svg viewBox={icon.viewBox}>
      {icon.path.map((path, i) => {
        // eslint-disable-next-line react/no-array-index-key
        return <path d={path} key={`path-${i}`} />;
      })}
    </Svg>
  </Tooltip>
);

Icon.propTypes = {
  icon: PropTypes.shape({
    path: PropTypes.arrayOf(PropTypes.string).isRequired,
    viewBox: PropTypes.string.isRequired,
  }).isRequired,
  tooltip: PropTypes.string.isRequired,
};

export default Icon;
