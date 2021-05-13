import * as React from 'react';
import classnames from 'classnames';

import { graphql, Link } from 'gatsby';

import { getRandomInt } from 'lib/utils';

const Tag = ({ data: { name, uri }, ...props }) => (
  <Link to={uri}>
    <div className="gradient-border relative rounded z-10">
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <p className="tag capitalize px-1 bg-gray-100 rounded-sm" {...props}>
        {name}
      </p>
      <div
        className={classnames('inset-0 absolute')}
        style={{
          content: '',
          zIndex: '-1',
          margin: '-1px',
          borderRadius: 'inherit',
          filter: 'brightness(0.9)',
          background: `linear-gradient(
            ${getRandomInt(360, 20)}deg,
            orange,
            yellow,
            green,
            cyan,
            indigo,
            violet`,
        }}
      />
    </div>
  </Link>
);

export const fragments = graphql`
  fragment WpTagLink on WpTag {
    id
    name
    uri
  }
`;

export default Tag;
