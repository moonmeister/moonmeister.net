import * as React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from 'components/layout';
import SEO from 'components/seo';

function getLocale() {
  return window?.navigator?.language ?? 'en-US';
}

function formatDateString(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString(getLocale(), {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  });
}

const BlogPage = ({
  data: {
    allWpPost: { nodes: allPosts },
    wpPage: { title: pageTitle },
  },
}) => (
  <Layout>
    <SEO title={pageTitle} />
    {/* <h1 className="mx-auto" style={{ width: 'max-content' }}>
      {pageTitle}
    </h1> */}
    {allPosts.map(({ id, title, excerpt, uri, author, dateGmt }) => (
      <div key={id}>
        <article className=" bg-gray-100 mb-6 p-6 rounded-lg shadow-md hover:shadow-lg hover:translate-y-8">
          <Link to={`/${uri}`}>
            <header className="mb-6">
              <h2>{title}</h2>
            </header>

            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />

            <footer className="mt-6 text-sm text-gray-600">
              {author.name} on{' '}
              <time dateTime={dateGmt}>{formatDateString(dateGmt)}</time>
            </footer>
          </Link>
        </article>
      </div>
    ))}
  </Layout>
);

BlogPage.propTypes = {
  data: PropTypes.shape({
    allWpPost: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          excerpt: PropTypes.string.isRequired,
          uri: PropTypes.string.isRequired,
          dateGmt: PropTypes.string.isRequired,
          author: PropTypes.shape({
            name: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired,
    wpPage: PropTypes.shape({ title: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export const query = graphql`
  query blogQuery($nodeIds: [Int]) {
    allWpPost(filter: { databaseId: { in: $nodeIds } }) {
      nodes {
        id
        title
        excerpt
        uri
        dateGmt
        author {
          name
        }
      }
    }

    wpPage(uri: { eq: "blog/" }) {
      title
    }
  }
`;

export default BlogPage;
