import * as React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from 'components/layout';

const BlogPage = ({
  data: {
    allWpPost: { nodes: allPosts },
  },
}) => (
  <Layout>
    {allPosts.map(({ title, excerpt, uri }) => (
      <Link to={uri}>
        <article>
          <h2>{title}</h2>
          <div dangerouslySetInnerHTML={{ __html: excerpt }} />
        </article>
      </Link>
    ))}
  </Layout>
);

export const query = graphql`
  query blogQuery($nodeIds: [Int]) {
    allWpPost(filter: { databaseId: { in: $nodeIds } }) {
      nodes {
        title
        excerpt
        uri
      }
    }
  }
`;

export default BlogPage;
