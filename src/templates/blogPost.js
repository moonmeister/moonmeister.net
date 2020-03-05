import * as React from 'react';
import { graphql } from 'gatsby';
import tw from 'tailwind.macro';
import Layout from 'components/layout';

const BlogPost = ({
  data: {
    wpPost: { title, blocks, dateGmt },
  },
}) => {
  return (
    <Layout>
      <article css={tw`max-w-64`}>
        <header>
          <h1>{title}</h1>
          <p>Published: {dateGmt}</p>
        </header>
        <div css={tw`clearfix`}>
          {blocks.length > 0 &&
            blocks.map(({ saveContent }) => (
              <div
                className="wp-block"
                dangerouslySetInnerHTML={{ __html: saveContent }}
              />
            ))}
        </div>
        <footer>About the author</footer>
      </article>
    </Layout>
  );
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
