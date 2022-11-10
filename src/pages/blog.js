import * as React from 'react';

import { graphql } from 'gatsby';
import ArchivePage from '../components/Archive';

export default function BlogPage({
  data: {
    allWpPost: { totalCount, nodes: allPosts },
  },
  location,
}) {
  return (
    <ArchivePage
      count={totalCount}
      location={location}
      pageTitle={"Blog"}
      posts={allPosts}
    />
  );
}

export const query = graphql`
  query blogArchiveQuery {
    allWpPost(sort: { fields: dateGmt, order: DESC }) {
      totalCount
      nodes {
        ...ArchivePost
      }
    }
  }
`;
