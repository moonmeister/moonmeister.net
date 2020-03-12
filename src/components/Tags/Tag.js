import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'gatsby';

import { getRandomInt } from 'lib/utils';

import './Tag.css';

const Tag = ({ data: { name }, className = '', ...props }) => {
  // useEffect(() => {
  //   document.documentElement.style.setProperty(
  //     '--tag-gradient',
  //     `linear-gradient(
  //     ${getRandomInt(360)}deg,
  //     orange,
  //     yellow,
  //     green,
  //     cyan,
  //     blue,
  //     violet
  //   )`
  //   );
  // });
  return (
    <div className="gradient-border mx-1">
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <p className="tag capitalize px-1" {...props}>
        {name}
      </p>
      <div
        className="gradient-background"
        style={{
          background: `linear-gradient(
      ${getRandomInt(360, 10)}deg,
      orange,
      yellow,
      green,
      cyan,
      blue,
      violet
    )`,
        }}
      />
    </div>
  );
};

Tag.propTypes = {
  data: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  className: PropTypes.string,
};

export const fragments = graphql`
  fragment WpTag on WpTag {
    id
    name
  }
`;

export default Tag;
