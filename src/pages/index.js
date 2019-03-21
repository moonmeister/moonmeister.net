import React from 'react';

import Headshot from 'components/headshot';
import Layout from 'components/layout';
import SEO from 'components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <section
      css={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <div css={{ maxWidth: `60%` }}>
        <p>
          <b>Hi, I&#8217;m Alex Moon</b> – a multi-disciplinary technology
          expert. I cut my teeth in technology working help desk and being a
          systems administrator. I then expanded into to DevOps practices and
          software development. I&#8217;ve worked for I.T. shops, for design
          (UI/UX) and development agencies, and in opens source software.
        </p>
        <p>
          These experiences have taught me that as creators we need to stop
          building for ourselves and start build for our users. Too often we
          sacrifice performance and usability for Wiz-Bang Widgets, which
          ultimately diminish the user’s experience.
        </p>
        <p>
          To solve this problem I am constantly evaluating what I&#8217;m
          building and how I&#8217;m building it. This ensures my creations
          serve their users and guards against them becoming into
          Frankenstein&#8217;s monster. My convenience and ego as a creator and
          engineer are second to the project&#8217;s success.
        </p>
      </div>
      <figure
        css={{
          width: '40%',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        <Headshot />
      </figure>
    </section>
  </Layout>
);

export default IndexPage;
