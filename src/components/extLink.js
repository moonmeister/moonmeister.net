import React from 'react';
import PropTypes from 'prop-types';

const ExtLink = ({ children, ...attrb }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <a rel="noopener noreferrer" target="_blank" {...attrb}>
    {children}
  </a>
);

ExtLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

ExtLink.defaultProps = {
  children: '',
};

export default ExtLink;
