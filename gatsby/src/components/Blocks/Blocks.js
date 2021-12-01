/* eslint-disable react/no-array-index-key */

import * as React from 'react';
import classNames from 'classnames';

import './blocks.css';

const Blocks = ({ content, className }) => (
  <div
    className={classNames('wp-blocks flow-root', className)}
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

export default Blocks;
