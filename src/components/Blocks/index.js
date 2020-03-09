/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import parse from 'html-react-parser';

import './blocks.css';

const Blocks = ({ blocks }) => (
  <div className="wp-blocks clearfix">
    {blocks.length > 0 && blocks.map(({ saveContent }) => parse(saveContent))}
  </div>
);

Blocks.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      saveContent: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export const fragments = graphql`
  fragment BlocksFragment on WpBlock {
    saveContent
  }
`;

export default Blocks;
