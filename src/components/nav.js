import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { css } from '@emotion/core';
import tw from 'tailwind.macro';

const Nav = () => {
  const {
    wpMenu: {
      menuItems: { nodes: menuItems },
    },
  } = useStaticQuery(graphql`
    {
      wpMenu(name: { eq: "Main" }) {
        menuItems {
          nodes {
            menuItemId
            title
            url
            label
          }
        }
      }
    }
  `);
  return (
    <nav
      css={css`
        position: sticky;
        top: 0;
      `}
    >
      <ul
        css={css`
          ${tw`m-0 flex flex-row justify-end pr-2 pl-20`}
        `}
      >
        {menuItems.map(({ label, title, url, menuItemId }) => (
          <li
            key={menuItemId}
            css={css`
              ${tw`list-none m-1`}
            `}
          >
            <Link
              css={css`
                ${tw`mx-2 p-1 `}
              `}
              title={title}
              to={url}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
