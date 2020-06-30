/* eslint-disable react/no-array-index-key */

import * as React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import classNames from 'classnames';

import './blocks.css';

const Blocks = ({ blocks, className }) => (
  <div className={classNames('wp-blocks clearfix', className)}>
    {blocks.length > 0 &&
      blocks.map(({ saveContent }, i) => {
        return (
          <div key={i} dangerouslySetInnerHTML={{ __html: saveContent }} />
        );
      })}
  </div>
);

Blocks.defaultProps = {
  className: '',
};

Blocks.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      saveContent: PropTypes.string.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
};

export const fragments = graphql`
  fragment BlocksFragment on WpBlock {
    saveContent
  }
`;

export default Blocks;
