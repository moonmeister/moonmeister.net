import * as React from 'react';
import { Tag } from 'react-feather';
import WpTag from './Tag';

const Tags = ({ data: tags }) => {
  return (
    <>
      <Tag aria-hidden className="inline-block text-xl" />
      <div className="inline-flex items-center box-border">
        {tags.length > 0 ? (
          tags.map(tag => (
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
    </>
  );
};

export default Tags;
