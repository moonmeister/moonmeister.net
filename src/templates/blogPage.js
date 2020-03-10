import * as React from 'react';
import { useState, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from 'components/layout';
import SEO from 'components/seo';
import Pagination from 'rc-pagination';

import Locale from 'rc-pagination/es/locale/en_US';
import { LocaleContext } from 'hooks/useLocale';

import 'rc-pagination/assets/index.css';

function formatDateString(dateString, locale) {
  const date = new Date(dateString);

  return date.toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  });
}

const BlogPage = ({
  data: {
    allWpPost: { nodes: allPosts },
    wpPage: { title: pageTitle },
    wp: {
      readingSettings: { postsPerPage },
    },
  },
}) => {
  const locale = useContext(LocaleContext);
  const [currentPage, setCurrentPage] = useState(1);

  const currentPagePosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    return allPosts.slice(start, end);
  }, [currentPage, postsPerPage, allPosts]);
  return (
    <Layout>
      <SEO title={pageTitle} />
      {/* <h1 className="mx-auto" style={{ width: 'max-content' }}>
      {pageTitle}
    </h1> */}
      {currentPagePosts.map(({ id, title, excerpt, uri, author, dateGmt }) => (
        <div key={id}>
          <article className="bg-gray-100 mb-6 p-6 rounded-lg shadow-md hover:shadow-lg hover:translate-y-8">
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
                <time dateTime={dateGmt}>
                  {formatDateString(dateGmt, locale)}
                </time>
              </footer>
            </Link>
          </article>
        </div>
      ))}
      <Pagination
        className="flex items-center justify-center"
        defaultCurrent={1}
        defaultPageSize={postsPerPage}
        // hideOnSinglePage
        locale={Locale}
        onChange={current => setCurrentPage(current)}
        pageSizeOptions={[2, 10, 25, 50]}
        showQuickJumper
        total={allPosts.length}
      />
    </Layout>
  );
};

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
    wp: PropTypes.shape({
      readingSettings: PropTypes.shape({
        postsPerPage: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
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

    wp {
      readingSettings {
        postsPerPage
      }
    }
  }
`;

export default BlogPage;
