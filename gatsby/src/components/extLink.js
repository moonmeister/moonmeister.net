import * as React from 'react';

function ExtLink({ children, ...attrb }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <a rel="noopener noreferrer" target="_blank" {...attrb}>
      {children}
    </a>
  );
}

ExtLink.defaultProps = {
  children: '',
};

export default ExtLink;
