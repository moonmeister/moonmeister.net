import React from 'react';
import PropTypes from 'prop-types';
import Reset from 'styles/Reset';
import Container from 'components/container';

const Layout = ({ children }) => (
  <>
    <Reset />

    <main
      css={{
        backgroundColor: '#eeeeee',
        minHeight: '65vh',
      }}
      role="main"
    >
      <Container>{children}</Container>
    </main>
    <footer>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
