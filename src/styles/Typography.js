import React from 'react';
import { Global, css } from '@emotion/core';
import Shevy from 'shevyjs';
import { theme } from '../../tailwind.config';

const shevy = new Shevy({
  baseFontSize: '1.2rem',
  baseLineHeight: 2,
  baseFontScale: [2.4414, 1.9531, 1.5625, 1.25, 1, 1],
  addMarginBottom: true,
  proximity: true,
  proximityFactor: 1,
});

const Typography = () => (
  <Global
    styles={css`
      body {
        font-family: 'Helvetica', 'Arial', sans-serif;
        text-rendering: optimizeLegibility;
        color: ${theme.colors.primary['900']};

        ${shevy.body}
      }

      h1 {
        ${shevy.h1}
      }
      h2 {
        ${shevy.h2}
      }
      h3 {
        ${shevy.h3}
      }
      h4 {
        ${shevy.h4}
      }
      h5 {
        ${shevy.h5}
      }
      h6 {
        ${shevy.h6}
      }
      p {
        ${shevy.content}
      }
    `}
  />
);

export default Typography;
