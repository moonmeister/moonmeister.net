import * as React from 'react';
import { css } from 'linaria';
import { useStaticQuery, graphql, Link } from 'gatsby';

const Nav = () => {
  const {
    wpMenu: {
      menuItems: { nodes: menuItems },
    },
  } = useStaticQuery(graphql`
    {
      wpMenu(locations: { eq: MAIN_MENU }) {
        menuItems {
          nodes {
            databaseId
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
        a.active-links {
          &::after {
            @apply border-b-4 border-blue-500 w-full absolute left-0;
            content: '';
          }

          &::after {
            @apply bottom-0;
          }
        }

        @screen canhover {
          a {
            @apply transform transition-transform duration-100 ease-out;
          }
        }
      `}
    >
      <ul className="m-0 flex flex-wrap flex-row justify-center items-center md:justify-end px-10 pt-4">
        {menuItems.map(({ label, title, url, databaseId }) => (
          <li key={databaseId} className="group list-none m-1">
            <Link
              activeClassName="active-links text-pink-600 relative content-box"
              className="inline-block mx-2 p-1 text-2xl text-blue-600 uppercase text-shadow-sm group-hover:text-pink-600 group-hover:-translate-y-1 group-hover:ease-in"
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
