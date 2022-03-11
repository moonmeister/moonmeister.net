/* eslint-disable react/no-array-index-key */

import * as React from 'react';
import classNames from 'classnames';

import './blocks.css';

function Blocks({ content, className }) {
  return (
    <div
      className={classNames('prose wp-blocks flow-root', className)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export default Blocks;
