import * as React from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'gatsby';

import './Tag.css';

const Tag = ({ data: { name }, className = '', ...props }) => (
  <div className="gradient-border">
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <p className="tag capitalize" {...props}>
      {name}
    </p>
  </div>
);

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
