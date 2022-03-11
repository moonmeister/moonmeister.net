import * as React from 'react';
import { useContext } from 'react';

import { graphql, Link } from 'gatsby';

import Layout from 'components/Layout';
import Tags from 'components/Tags';
import SEO from 'components/seo';

import { LocaleContext } from 'hooks/useLocale';
import { formatDateString } from 'lib/utils';

export default function ArchivePage({ posts, title: pageTitle }) {
  const locale = useContext(LocaleContext);

  return (
    <Layout>
      <SEO title={pageTitle} />
      <header className="sr-only">
        <h1>{pageTitle}</h1>
      </header>
      <div aria-live="polite" id="blog-list" role="region">
        {posts.map(
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
              className="m-auto floating mb-6 p-6 transition-all duration-200 ease-in-out canhover:hover:-translate-y-1 canhover:hover:translate-x-1 canhover:hover:shadow-lg reduceMotion:translate-x-0 reduceMotion:translate-y-0"
            >
              <Link rel="author" to={`${uri}`}>
                <header className="max-w-prose mb-6">
                  <h1
                    aria-label="Blog Title"
                    className="font-bold text-primary-900 text-2xl md:text-4xl leading-relaxed"
                  >
                    {`${title}`}
                  </h1>
                  <div className="text-sm text-gray-600">
                    <span>{author.name} on </span>
                    <time dateTime={dateGmt}>
                      {formatDateString(dateGmt, locale)}
                    </time>
                  </div>
                </header>

                <div
                  className="prose text-primary-800"
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
    </Layout>
  );
}

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
`;
