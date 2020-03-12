import * as React from 'react';
import { useState, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import scrollTo from 'scroll-to';

import Layout from 'components/layout';
import SEO from 'components/seo';

import Pagination from 'rc-pagination';
import Locale from 'rc-pagination/es/locale/en_US';
import { LocaleContext } from 'hooks/useLocale';
import { formatDateString } from 'lib/utils';
import 'rc-pagination/assets/index.css';

const BlogPage = ({
  data: {
    allWpPost: { totalCount, nodes: allPosts },
    wpPage: { title: pageTitle },
    wp: {
      readingSettings: { postsPerPage },
    },
  },
}) => {
  const header = useRef();
  const locale = useContext(LocaleContext);
  const [currentPage, setCurrentPage] = useState(1);

  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const currentPagePosts = allPosts.slice(start, end);

  return (
    <Layout>
      <SEO title={pageTitle} />
      <header ref={header} className="visually-hidden">
        <h1>{pageTitle}</h1>
      </header>
      {currentPagePosts.map(
        ({ id, title, excerpt, uri, author, dateGmt }, i) => (
          <article
            key={id}
            className="bg-gray-100 mb-6 p-6 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:translate-x-1 hover:shadow-lg reduceMotion:translate-x-0 reduceMotion:translate-y-0"
          >
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
        )
      )}
      <Pagination
        className="flex items-center justify-center my-6"
        defaultCurrent={1}
        defaultPageSize={postsPerPage}
        locale={Locale}
        onChange={current => {
          setCurrentPage(current);
          scrollTo(0, 0);
        }}
        showQuickJumper
        total={totalCount}
      />
    </Layout>
  );
};

BlogPage.propTypes = {
  data: PropTypes.shape({
    allWpPost: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
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
  query blogQuery {
    allWpPost {
      totalCount
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
