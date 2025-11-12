---
title: 'Hello world (Gatsby + WP)!'
date: 2020-03-25
tags:
  - 'gatsby'
  - 'jamstack'
  - 'wordpress'
---

I have a blog. Guess I have to write content now...

I am in fact looking forward to this, I have been wanting to do this for some time. Now that I have one, I am looking forward to sharing more of the things I work on and am thinking about. I will start here with sharing a little about my new blog and how it is built.

My site is a JAMstack setup, using Gatsby on the front end and Wordpress(WP) as the CMS for content management. While this idea is not revolutionary I am running on very alpha versions of Gatsby's new WP integration using [WPGraphQL](https://www.wpgraphql.com/). I choose to use this stack because of my familiarity with Gatsby and the learning potential for use with future clients.

I have already had clients looking to improve site performance and are looking to Gatsby to do so. Gatsby's integration with WP offers this possibility, while allowing content editors keep managing site content through WP. Editors get the familiar experience they know while being abstracted from the optimization and performance improvements of a modern JAMstack.

This setup requires running a very alpha Gatsby source plugin ([gatsby-plugin-wordpress-experimental](https://www.npmjs.com/package/gatsby-source-wordpress-experimental)) to integrate with the alpha releases of [WPGraphQL](https://www.wpgraphql.com/). A new, Gatsby WP plugin must also be used to enable better caching and incremental builds. Getting 3 alpha version plugins to be compatible and working has been tough at times. To read more about this setup and how to play with it ( I wouldn't recommend using this in production checkout Tyler Barnes [example repo](https://github.com/TylerBarnes/using-gatsby-source-wordpress-experimental) and docs. Of course, you are also welcome to checkout the source for this site in the GitHub repository.

If you have any questions feel free to open an issue on the GitHub Issues or hit me up on [Twitter](https://twitter.com/moon_meister).
