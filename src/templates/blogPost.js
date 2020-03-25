import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'gatsby';
import Layout from 'components/Layout';
import Blocks from 'components/Blocks';
import { formatDateString } from 'lib/utils';
import { Edit3, Clock } from 'react-feather';
import Tags from 'components/Tags';
import SEO from 'components/seo';

import highlightShare from 'highlight-share';
import * as twitterSharer from 'highlight-share/dist/sharers/twitter';
import * as emailSharer from 'highlight-share/dist/sharers/email';
import * as copySharer from 'highlight-share/dist/sharers/copy';
// import * as linkedInSharer from 'highlight-share/dist/sharers/linked-in';

import 'highlight-share/dist/highlight-share.css';

const BlogPost = ({
  data: {
    wpPost: {
      title,
      blocks,
      content,
      dateGmt,
      author,
      readingTime: { text: readingText },
      tags: { nodes: allTags },
    },
  },
}) => {
  const { avatar } = author;

  useEffect(() => {
    const selectionShare = highlightShare({
      selector: '#blog-content',
      sharers: [twitterSharer, emailSharer, copySharer],
    });

    selectionShare.init();

    return selectionShare.destroy;
  });
  return (
    <Layout>
      <SEO title={title} />
      <article
        // aria-label="Test"
        className="max-w-reading m-auto floating max-w-64 px-6"
      >
        <header className="border-b flex flex-col items-center text-center py-3 ">
          <h1 className="text-4xl font-bold z-0">{title}</h1>

          <div className="flex m-4">
            {avatar.foundAvatar && avatar.rating === 'g' && (
              <img
                alt={`${author.name} headshot`}
                className="rounded-full w-16 col-span-1 row-start-1 row-end-3 bg-gray-200 text-transparent"
                height={avatar.height}
                loading="lazy"
                src={avatar.url}
                width={avatar.width}
              />
            )}
            <div className="flex flex-col justify-center">
              <div className="text-left text-gray-600 row-auto">
                <Edit3 aria-hidden className="inline-svg text-gray-700 mr-2" />

                <span aria-label="author">{author.name}</span>
              </div>
              <p className="text-gray-600 row-auto">
                <Clock aria-hidden className="inline-svg text-gray-700 mr-2" />
                {readingText} · {formatDateString(dateGmt)}
              </p>
            </div>
          </div>
        </header>
        <div id="blog-content">
          {blocks.length > 0 ? (
            <Blocks blocks={blocks} className="p-6" />
          ) : (
            <div
              className="wp-blocks clearfix"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
        <footer className="border-t py-6 text-sm text-gray-600">
          <Tags data={allTags} />
        </footer>
      </article>
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    wpPost: PropTypes.shape({
      title: PropTypes.string.isRequired,
      blocks: PropTypes.array.isRequired,
      dateGmt: PropTypes.string.isRequired,
      author: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      tags: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      }),
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  query blogPostQuery($databaseId: Int!) {
    wpPost(databaseId: { eq: $databaseId }) {
      title
      author {
        name
        avatar {
          foundAvatar
          rating
          height
          width
          url
        }
      }
      readingTime {
        text
      }
      content
      blocks {
        saveContent
      }
      dateGmt
      tags {
        nodes {
          ...WpTag
        }
      }
    }
  }
`;

export default BlogPost;
