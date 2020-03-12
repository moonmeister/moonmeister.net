import * as React from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'gatsby';
import Layout from 'components/layout';
import Blocks from 'components/Blocks';
import { formatDateString } from 'lib/utils';
import { Edit3, Clock } from 'react-feather';
import Tags from 'components/Tags';
import SEO from 'components/seo';

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
  return (
    <Layout>
      <SEO title={title} />
      <article
        aria-label="Test"
        className="max-w-reading m-auto floating max-w-64 px-6"
      >
        <header className="border-b flex flex-col items-center text-center py-3 ">
          <h1 className="text-4xl font-bold">{title}</h1>

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
              <p className="text-left text-gray-600 row-auto">
                <Edit3
                  aria-label="Author"
                  className="inline-svg text-gray-700 mr-2"
                />
                {author.name}
              </p>
              <p className="text-gray-600 row-auto">
                <Clock
                  aria-label="Publish Date"
                  className="inline-svg text-gray-700 mr-2"
                />
                {readingText} · {formatDateString(dateGmt)}
              </p>
            </div>
          </div>
        </header>
        {blocks.length > 0 ? (
          <Blocks blocks={blocks} className="p-6" />
        ) : (
          <div
            className="wp-blocks clearfix"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
        <footer className="border-t py-6 text-gray-600">
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
      }).isRequired,
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
