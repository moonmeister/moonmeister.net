import * as React from 'react';
import { useContext } from 'react';
import PropTypes from 'prop-types';

import { graphql, Link, navigate } from 'gatsby';

import Layout from 'components/Layout';
import Tags from 'components/Tags';
import SEO from 'components/seo';

import Pagination from 'rc-pagination';
import Locale from 'rc-pagination/es/locale/en_US';
import { LocaleContext } from 'hooks/useLocale';
import { formatDateString, getUrlQuery } from 'lib/utils';
import 'rc-pagination/assets/index.css';

const BlogPage = ({
  data: {
    allWpPost: { totalCount, nodes: allPosts },
    wpPage: { title: pageTitle },
    wp: {
      readingSettings: { postsPerPage },
    },
  },
  location,
}) => {
  const locale = useContext(LocaleContext);
  const currentPage = getUrlQuery('page', location.search) || 1;

  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const currentPagePosts = allPosts.slice(start, end);

  return (
    <Layout>
      <SEO title={pageTitle} />
      <header className="sr-only">
        <h1>{pageTitle}</h1>
      </header>
      <div aria-live="polite" id="blog-list" role="region">
        {currentPagePosts.map(
          ({ id, title, excerpt, uri, author, dateGmt, tags }) => (
            <article
              key={id}
              className="max-w-reading m-auto floating mb-6 p-6 transition-all duration-200 ease-in-out transform canhover:hover:-translate-y-1 canhover:hover:translate-x-1 canhover:hover:shadow-lg reduceMotion:translate-x-0 reduceMotion:translate-y-0"
            >
              <Link to={`/${uri}`}>
                <header className="mb-6">
                  <h1
                    aria-label="Blog Title"
                    className="font-bold text-primary-900 text-2xl md:text-4xl"
                  >
                    {`${title} page 1`}
                  </h1>
                  <div className="text-sm text-gray-600">
                    <span rel="author">{author.name} on </span>
                    <time dateTime={dateGmt}>
                      {formatDateString(dateGmt, locale)}
                    </time>
                  </div>
                </header>

                <div
                  className="text-primary-800"
                  dangerouslySetInnerHTML={{ __html: excerpt }}
                />

                <footer className="mt-6 text-sm text-gray-600">
                  <Tags data={tags.nodes} />
                </footer>
              </Link>
            </article>
          )
        )}
      </div>
      <Pagination
        ariaControls="blog-list"
        className="flex items-center justify-center my-6 text-xl"
        // current={currentPage}
        defaultCurrent={currentPage}
        defaultPageSize={postsPerPage}
        locale={Locale}
        onChange={current => {
          // setCurrentPage(current);
          // scrollTo(0, 0);
          navigate(`/blog/?page=${current}`);
        }}
        showQuickJumper
        total={totalCount}
      />
    </Layout>
  );
};

BlogPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
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
        tags {
          nodes {
            name
          }
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
