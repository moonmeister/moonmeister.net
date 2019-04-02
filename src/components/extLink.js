import React from 'react';
import PropTypes from 'prop-types';

const ExtLink = ({ className, href, children }) => (
  <a
    className={className}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

ExtLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  className: PropTypes.string,
};

ExtLink.defaultProps = {
  children: '',
  className: '',
};

export default ExtLink;
