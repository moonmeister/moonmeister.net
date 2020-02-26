import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from 'components/layout';

const BlogPost = ({
  data: {
    wpPost: { title, content, dateGmt },
  },
}) => {
  return (
    <Layout>
      <article>
        <header>
          <h1>{title}</h1>
          <p>Published: {dateGmt}</p>
        </header>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <footer>About the author</footer>
      </article>
    </Layout>
  );
};

export const query = graphql`
  query blogPostQuery($databaseId: Int!) {
    wpPost(databaseId: { eq: $databaseId }) {
      title
      content
      dateGmt
    }
  }
`;

export default BlogPost;
