import * as React from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'gatsby';
import Layout from 'components/layout';
import Blocks from 'components/Blocks';
import { formatDateString } from 'lib/utils';
import { Edit3, Clock, Tag } from 'react-feather';
import WpTag from 'components/Tag';
import SEO from 'components/seo';

const BlogPost = ({
  data: {
    wpPost: {
      title,
      blocks,
      dateGmt,
      author,
      readingTime: { text: readingText },
      tags: { nodes: allTags },
    },
  },
}) => {
  return (
    <Layout>
      <SEO title={title} />
      <article
        aria-label="Test"
        className="max-w-64 shadow-lg bg-gray-100 rounded-lg px-6"
      >
        <header className="border-b flex flex-col items-center text-center py-3 ">
          <h1 className="font-bold">{title}</h1>

          <div className="grid">
            <p className="text-left text-gray-600">
              <Edit3
                aria-label="Author"
                className="inline-svg text-gray-700 mr-2"
              />
              {author.name}
            </p>
            <p className="text-gray-600">
              <Clock
                aria-label="Publish Date"
                className="inline-svg text-gray-700 mr-2"
              />
              {readingText} · {formatDateString(dateGmt)}
            </p>
          </div>

          {/* TODO Add name */}
        </header>
        <Blocks blocks={blocks} className="p-6" />
        <footer className="border-t py-6 text-gray-600">
          <Tag className="inline-svg text-gray-700 text-xl" />
          <div className="inline-flex items-center box-border">
            {allTags.length > 0 ? (
              allTags.map(tag => (
                <WpTag
                  key={tag.id}
                  aria-label="Post Tags"
                  className="m-0"
                  data={tag}
                />
              ))
            ) : (
              <WpTag data={{ name: 'none' }} />
            )}
          </div>
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
      }
      readingTime {
        text
      }
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
