import * as React from 'react';

import { graphql } from 'gatsby';
import ArchivePage from 'components/Archive';

export default function BlogPage({
  data: {
    wpTag: {
      name: title,
      count: totalCount,
      posts: { nodes: allPosts },
    },
  },
  location,
}) {
  return (
    <>
      <header>
        <h1>{title}</h1>
      </header>
      <ArchivePage
        count={totalCount}
        location={location}
        pageTitle={title}
        posts={allPosts}
      />
    </>
  );
}

export const query = graphql`
  query tagArchiveQuery($id: String!) {
    wpTag(id: { eq: $id }) {
      name
      count
      posts {
        nodes {
          ...ArchivePost
        }
      }
    }
  }
`;
