import * as React from 'react';

import { graphql } from 'gatsby';
import ArchivePage from '../components/Archive';

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
    <ArchivePage
      count={totalCount}
      location={location}
      pageTitle={title}
      posts={allPosts}
    />
  );
}

export const query = graphql`
  query tagArchiveQuery($uri: String!) {
    wpTag(uri: { eq: $uri }) {
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
