import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/icon';
import ExtLink from 'components/extLink';
import FormContact from 'components/formContact';

import icons from 'constants/icons';

import 'styles/style.scss';
import styles from './layout.module.scss';

const Layout = ({ children }) => (
  <>
    <main className={styles.container} role="main">
      <div className={styles.children}>{children}</div>
    </main>
    <footer className={styles.footer}>
      <div id="form-container" className={styles.half}>
        <FormContact />
      </div>
      <div id={styles.social} className={styles.half}>
        <ExtLink href="https://github.com/moonmeister">
          <Icon icon={icons.GITHUB} />
        </ExtLink>
        <ExtLink href="https://twitter.com/moon_meister">
          <Icon icon={icons.TWITTER} />
        </ExtLink>
      </div>
    </footer>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
