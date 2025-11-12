---
title: 'Serverless Web Apps with Gatsby + Dgraph + Tina CMS'
date: 2020-12-29
tags:
  - 'gatsby'
  - 'jamstack'
---

A couple months back I did a talk on using Gatsby with [Tina CMS](https://tina.io/) and Dgraph's [Slash GraphQL](https://dgraph.io/slash-graphql). Here's that:

More and more folks are looking to build highly dynamic web apps that deploy via static assets to a CDN. Gatsby has been a leader in this space and has a great story around sourcing data from a wide variety of CMSes. That same story hasn’t been true when looking to source data from a database. Existing solutions have generally been highly custom and complex or all together sub-par.

The good news is this is changing, Gatsby has recently released to beta its GraphQL source toolkit that uses schema queries to integrate any GraphQL source quickly and easily into Gatsby’s data layer. This is already driving new CMS integrations such as CraftCMS and GraphCMS. With Dgraph now shipping full GraphQL compatibility we have the ability to much more simply integrate our Gatsby frontend with a world-class database.

https://www.youtube.com/watch?v=MS4\_WE9iQnE

You can see more discussion and some questions I answered after the talk on Dgraph's form: [https://discuss.dgraph.io/t/alex-moon-serverless-web-apps-with-gatsby-dgraph-tinacms/9979](https://discuss.dgraph.io/t/alex-moon-serverless-web-apps-with-gatsby-dgraph-tinacms/9979).

### Resources

Demo Code Repo: [https://github.com/moonmeister/gatsby-example-dgraph](https://github.com/moonmeister/gatsby-example-dgraph)
Demo Site: [http://moviedatabase.moonmeister.net/](http://moviedatabase.moonmeister.net/)
Tools Used:

- Back-end: [Slash GraphQL](https://dgraph.io/slash-graphql)
- Front-end: [GatsbyJS](https://gatsbyjs.com/)
- Content Editing: [Tina CMS](https://tinacms.org/)

Further Reading:

- Gatsby File System Routing: [https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/](https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/)
- Gatsby GraphQL Source Toolkit (Beta): [https://github.com/gatsbyjs/gatsby-graphql-toolkit](https://github.com/gatsbyjs/gatsby-graphql-toolkit)
