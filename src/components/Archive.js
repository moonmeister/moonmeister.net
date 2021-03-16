import * as React from 'react';
import { useContext } from 'react';

import { graphql, Link, navigate, useStaticQuery } from 'gatsby';

import Layout from 'components/Layout';
import Tags from 'components/Tags';
import SEO from 'components/seo';

import Pagination from 'rc-pagination';
import Locale from 'rc-pagination/es/locale/en_US';

import { LocaleContext } from 'hooks/useLocale';
import { formatDateString, getUrlQuery } from 'lib/utils';
import 'rc-pagination/assets/index.css';

export default function ArchivePage({
  count,
  posts,
  title,
  location,
}) {
  const locale = useContext(LocaleContext);
  const currentPage = getUrlQuery('page', location.search) || 1;


  const {
    wp: {
      readingSettings: { postsPerPage },
    }
  } = useStaticQuery(graphql`
  { 
    wp {
      readingSettings {
        postsPerPage
      }
    }
  }
  `)

  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const currentPagePosts = posts.slice(start, end);

  return (
    <Layout>
      <SEO title={title} />
      <header className="sr-only">
        <h1>{title}</h1>
      </header>
      <div aria-live="polite" id="blog-list" role="region">
        {currentPagePosts.map(
          ({
            id,
            title,
            excerpt,
            uri,
            author: { node: author },
            dateGmt,
            tags,
          }) => (
            <article
              key={id}
              className="max-w-reading m-auto floating mb-6 p-6 transition-all duration-200 ease-in-out transform canhover:hover:-translate-y-1 canhover:hover:translate-x-1 canhover:hover:shadow-lg reduceMotion:translate-x-0 reduceMotion:translate-y-0"
            >
              <Link to={`${uri}`}>
                <header className="mb-6">
                  <h1
                    aria-label="Blog Title"
                    className="font-bold text-primary-900 text-2xl md:text-4xl leading-relaxed"
                  >
                    {`${title}`}
                  </h1>
                  <div className="text-sm text-gray-600">
                    <span rel="author">{author.name} on </span>
                    <time dateTime={dateGmt}>
                      {formatDateString(dateGmt, locale)}
                    </time>
                  </div>
                </header>

                <div
                  className="text-primary-800 text-medium"
                  dangerouslySetInnerHTML={{ __html: excerpt }}
                />
              </Link>

              <footer className="mt-6 text-sm text-gray-600">
                <Tags data={tags.nodes} />
              </footer>
            </article>
          )
        )}
      </div>
      <Pagination
        ariaControls="blog-list"
        className="flex items-center justify-center my-6 text-xl"
        defaultCurrent={currentPage}
        defaultPageSize={postsPerPage}
        locale={Locale}
        onChange={(current) => {
          navigate(`/blog/?page=${current}`);
        }}
        showQuickJumper={count / postsPerPage > 3}
        total={count}
      />
    </Layout>
  );
};

export const fragments = graphql`

  fragment ArchivePost on WpPost {
    id
    title
    excerpt
    uri
    dateGmt
    author {
      node {
        name
      }
    }
    tags {
      nodes {
        ...WpTagLink
      }
    }
  }

`