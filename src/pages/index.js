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
      <div className={styles.content}>
        <p>
          Hi, I&#8217;m <b>Alex Moon</b> – a multi-disciplinary technology
          expert. My career has spanned a help desk, systems administration, and
          software development. These roles have been in open source, a UX
          research firm, a university, and two agencies.
        </p>
        <p>
          These experiences have taught me that, as creators, we need to stop
          building for ourselves and start build for our users. Too often we
          sacrifice performance and usability for widgets and workflows.
          Ultimately this diminishes the user experience.
        </p>
        <p>
          To help solve this problem, I am regularly evaluating what and how
          I&#8217;m building. This ensures my creations serve the user and
          guards against them becoming Frankenstein&#8217;s monster. Convenience
          and ego as a engineer are second to the project&#8217;s success.
        </p>
      </div>
    </section>
  </Layout>
);

export default IndexPage;
