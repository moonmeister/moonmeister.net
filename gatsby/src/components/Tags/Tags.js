import * as React from 'react';
import { Tag } from 'react-feather';
import WpTag from './Tag';

export function Tags({ data: tags }) {
  return (
    <>
      <Tag aria-hidden className="inline-block text-xl" />
      <div className="inline-flex items-center box-border">
        {tags?.length > 0 ? (
          tags.map((tag) => (
            <span className="ml-2">
              <WpTag key={tag.id} aria-label="Post Tags" data={tag} />
            </span>
          ))
        ) : (
          <WpTag data={{ name: 'none' }} />
        )}
      </div>
    </>
  );
}
