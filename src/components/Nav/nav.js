import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import './nav.css';

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
      <ul className="m-0 flex flex-wrap flex-row justify-center items-center md:justify-end px-10 pt-4">
        {menuItems.map(({ label, title, url, menuItemId }) => (
          <li key={menuItemId} className="group list-none m-1">
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
