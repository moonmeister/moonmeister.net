import * as React from 'react';

function ExtLink({ children, ...attrb }) {
  return (
    <a rel="noopener noreferrer" target="_blank" {...attrb}>
      {children}
    </a>
  );
}

ExtLink.defaultProps = {
  children: '',
};

export default ExtLink;
