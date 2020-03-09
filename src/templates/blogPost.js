import * as React from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'gatsby';
import Layout from 'components/layout';
import Blocks from 'components/Blocks';

const BlogPost = ({
  data: {
    wpPost: { title, blocks, dateGmt },
  },
}) => {
  return (
    <Layout>
      <article className="max-w-64 shadow-lg bg-gray-100 rounded-lg p-6">
        <header className="border-b flex flex-col items-center">
          <h1 className="">{title}</h1>
          <p>Published: {dateGmt}</p>
        </header>
        <Blocks blocks={blocks} />
        <footer>About the author</footer>
      </article>
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    wpPost: PropTypes.shape({
      title: PropTypes.string.isRequired,
      blocks: PropTypes.array.isRequired,
      dateGmt: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  query blogPostQuery($databaseId: Int!) {
    wpPost(databaseId: { eq: $databaseId }) {
      title
      blocks {
        saveContent
      }
      dateGmt
    }
  }
`;

export default BlogPost;
