/* eslint-disable react/no-array-index-key */

import * as React from 'react';
import classNames from 'classnames';

import '@wordpress/block-library/build-style/style.css';

export function Blocks({ content, className }) {
  return (
    <div
      className={classNames('prose wp-blocks flow-root', className)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
