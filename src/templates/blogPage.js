import * as React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from 'components/layout';
import SEO from 'components/seo';

const BlogPage = ({
  data: {
    allWpPost: { nodes: allPosts },
    wpPage: { title },
  },
}) => (
  <Layout>
    <SEO title={title} />
    <h1>{title}</h1>
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

    wpPage(uri: { eq: "blog/" }) {
      title
    }
  }
`;

export default BlogPage;
