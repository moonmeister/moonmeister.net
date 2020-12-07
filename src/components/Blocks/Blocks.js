/* eslint-disable react/no-array-index-key */

import * as React from 'react';
import { graphql } from 'gatsby';
import classNames from 'classnames';

import './blocks.css';

const Blocks = ({ blocks, className }) => (
  <div className={classNames('wp-blocks flow-root', className)}>
    {blocks.length > 0 &&
      blocks.map(({ saveContent }, i) => (
        <div key={i} dangerouslySetInnerHTML={{ __html: saveContent }} />
      ))}
  </div>
);

Blocks.defaultProps = {
  className: '',
};

export const fragments = graphql`
  fragment BlocksFragment on WpBlock {
    saveContent
  }
`;

export default Blocks;
