import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
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
    <nav>
      <ul css={tw`m-0 flex flex-row justify-end px-10 py-4`}>
        {menuItems.map(({ label, title, url, menuItemId }) => (
          <li key={menuItemId} css={tw`list-none m-1`}>
            <Link
              activeStyle={tw`font-bold`}
              css={tw`mx-2 p-1 text-2xl hover:underline`}
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
