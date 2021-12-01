import * as React from 'react';

const ExtLink = ({ children, ...attrb }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <a rel="noopener noreferrer" target="_blank" {...attrb}>
    {children}
  </a>
);

ExtLink.defaultProps = {
  children: '',
};

export default ExtLink;
