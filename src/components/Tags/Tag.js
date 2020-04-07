import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { graphql } from 'gatsby';

import { getRandomInt } from 'lib/utils';

const Tag = ({ data: { name }, ...props }) => {
  return (
    <div className="gradient-border relative rounded z-10">
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <p className="tag capitalize px-1 bg-gray-100 rounded-sm" {...props}>
        {name}
      </p>
      <div
        className="inset-0 absolute"
        css={css`
          content: '';
          z-index: -1;
          margin: -1px;
          border-radius: inherit; /* !importanté */
          filter: brightness(0.9);

          background: linear-gradient(
            ${getRandomInt(360, 20)}deg,
            orange,
            yellow,
            green,
            cyan,
            indigo,
            violet
          );
        `}
      />
    </div>
  );
};

Tag.propTypes = {
  data: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
};

export const fragments = graphql`
  fragment WpTag on WpTag {
    id
    name
  }
`;

export default Tag;
