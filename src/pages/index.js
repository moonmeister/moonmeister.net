import React from 'react';

import Headshot from 'components/headshot';
import SEO from 'components/seo';
import Layout from 'components/layout';

import styles from 'styles/index.module.scss';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <section className={styles.intro}>
      <figure className={styles.headshot}>
        <Headshot />
      </figure>
      <section className={styles.content}>
        <p>
          Hi, I&#8217;m <b>Alex Moon</b> – a multi-disciplinary technology
          expert. My career has spanned a help desk, systems administration, and
          software development. These roles have been in open source, a UX
          research firm, a university, and two agencies.
        </p>
        <p>
          These experiences have taught me that, as creators, we need to stop
          building for ourselves and start build for our users. Regularly
          evaluating our processes ensures our creations serve the user and
          guards against the creation becoming Frankenstein&#8217;s monster.
        </p>
      </section>
    </section>
  </Layout>
);

export default IndexPage;
