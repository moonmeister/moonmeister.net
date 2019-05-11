import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/icon';
import ExtLink from 'components/extLink';
import FormContact from 'components/formContact';
import PageCurl from 'components/pageCurl';

import icons from 'constants/icons';

import 'styles/style.scss';
import styles from './layout.module.scss';

const Layout = ({ children }) => (
  <>
    <header>
      <PageCurl />
    </header>
    <main className={styles.container} role="main">
      <div className={styles.children}>{children}</div>
    </main>
    <footer className={styles.footer}>
      <div id={styles.form} className={styles.half}>
        <FormContact />
      </div>

      <div className={styles.half}>
        <div id={styles.social}>
          <ExtLink
            className={styles.icon}
            href="https://github.com/moonmeister"
            ariaLabel="GitHub"
          >
            <Icon tooltip="GitHub" icon={icons.GITHUB} />
          </ExtLink>
          <ExtLink
            className={styles.icon}
            href="/alex-moon-resume.pdf"
            ariaLabel="Resume (PDF)"
          >
            <Icon tooltip="Resume/CV" icon={icons.DOCUMENT} />
          </ExtLink>
          <ExtLink
            className={styles.icon}
            href="https://twitter.com/moon_meister"
            ariaLabel="Twitter"
          >
            <Icon tooltip="Twitter" icon={icons.TWITTER} />
          </ExtLink>
          <ExtLink
            className={styles.icon}
            href="https://www.instagram.com/moon_meister/"
            ariaLabel="Instagram"
          >
            <Icon tooltip="Instagram" icon={icons.INSTAGRAM} />
          </ExtLink>
        </div>

        <p id={styles.copyright}>
          &copy;{new Date().getFullYear()} Alex Moon. Built with&nbsp;
          <ExtLink href="https://gatsbyjs.org" ariaLabel="Gatsby">
            Gatsby
          </ExtLink>
          .
        </p>
      </div>
    </footer>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
