import * as React from 'react';
import { css } from 'linaria';
import classnames from 'classnames';

import { graphql } from 'gatsby';

import { getRandomInt } from 'lib/utils';

const Tag = ({ data: { name }, ...props }) => (
  <div className="gradient-border relative rounded z-10">
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <p className="tag capitalize px-1 bg-gray-100 rounded-sm" {...props}>
      {name}
    </p>
    <div
      className={classnames(
        'inset-0 absolute',
        css`
          content: '';
          z-index: -1;
          margin: -1px;
          border-radius: inherit; /* !importanté */
          filter: brightness(0.9);

          background: linear-gradient(
            var(--gradient-orientation),
            orange,
            yellow,
            green,
            cyan,
            indigo,
            violet
          );
        `
      )}
      style={{ '--gradient-orientation': `${getRandomInt(360, 20)}deg` }}
    />
  </div>
);

export const fragments = graphql`
  fragment WpTag on WpTag {
    id
    name
  }
`;

export default Tag;
