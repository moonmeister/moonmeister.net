import * as React from 'react';

import { graphql } from 'gatsby';
import ArchivePage from '../components/Archive'

export default function BlogPage(
  {
    data: {
      allWpPost: { totalCount, nodes: allPosts },
      wpPage: { title }
    }, location
  }) {
  return (
    <ArchivePage count={totalCount} pageTitle={title} posts={allPosts} location={location} />
  );
};

export const query = graphql`
  query blogArchiveQuery {
    allWpPost(sort: { fields: dateGmt, order: DESC }) {
      totalCount
      nodes {
        ...ArchivePost
      }
    }

    wpPage(uri: { eq: "/blog/" }) {
      title
    }
  }
`;
