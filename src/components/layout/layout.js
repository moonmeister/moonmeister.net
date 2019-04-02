import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import icons from 'constants/icons';

import 'styles/style.scss';

import styles from './layout.module.scss';

const Layout = ({ children }) => (
  <>
    <main className={styles.container} role="main">
      <div className={styles.children}>{children}</div>
    </main>
    <footer className={styles.footer}>
      <Icon icon={icons.TWITTER} />
      <Icon icon={icons.GITHUB} />
    </footer>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
