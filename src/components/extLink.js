import React from 'react';
import PropTypes from 'prop-types';

const ExtLink = ({ className, href, children, ariaLabel }) => (
  <a
    className={className}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
  >
    {children}
  </a>
);

ExtLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  className: PropTypes.string,
  ariaLabel: PropTypes.string.isRequired,
};

ExtLink.defaultProps = {
  children: '',
  className: '',
};

export default ExtLink;
