---
title: 'Gatsby Incremental Builds: The Backstory'
date: 2020-12-30
tags:
  - 'builds'
  - 'gatsby'
  - 'web'
---

I spent spent almost 5 months at Gatsby writing documentation and helping Gatsby's partners build better data source plugins. In that time I basically wrote the [documentation](https://support.gatsbyjs.com/hc/en-us/articles/360052503494-Developing-a-first-class-CMS-integration-for-Gatsby-Cloud) on creating first-class integrations (which includes support for incremental builds) for Gatsby Cloud. I've also been involved in the Gatsby OSS community since early 2018 and thus have a wealth of history and context many don't. I thought I'd take the time to share some of that experience to hopefully help others looking to understand and build [Gatsby source plugins](https://www.gatsbyjs.com/docs/creating-a-source-plugin/).

This first post will discuss background and architecture around incremental builds in Gatsby.

## Heads up

Gatsby's incremental builds feature is only available as a paid product in Gatsby Cloud. Incremental Builds was where Gatsby chose to draw the line to create revenue for the company (Gatsby Inc.) that ultimately drives Gatsby as an OSS project.

Here's the thing, incremental builds is the magic behind the Gatsby Cloud curtain but incremental data fetching is what you will actually be implementing in your plugin. Incremental data fetching helps enable incremental builds but only defines how data is incrementally fetched, not how the site it's self is built (code and data is combined). All developers who use Gatsby the framework, whether or not they use Gatsby Cloud, will benefit from you implementing incremental data fetching in your plugin; because, this will also enable huge performance wins in other areas of Gatsby that will make for a better developer experience.

Without further ado...

## Gatsby data-layer design and incremental data fetching

Gatsby's data-layer is it's own GraphQL server that stores data. Source plugins fetch data from files, REST APIs, databases, GraphQL endpoints, etc... That data is then transformed by various Gatsby APIs and helper functions and stored in memory for use later. This happens every time you run `gatsby develop` or `gatsby build`. Or at least it did.

This quickly became a problem for Gatsby build times. With every piece of content you add to your CMS the source plugin pulls increasingly large amounts of data across the wire (internet, or if you're lucky, local network). Build times skyrocket rocket doing high latency work that is not guaranteed to be needed. Think about it, if no changes are made in my Content Management System(CMS) between builds (only code change)...the source plugin could reuse the data it fetched last time if it had just cached said data.

But what if it did get updated? It would need a way to know. If the source plugin could compare something as simple as a timestamp, this would allow it to know if data has changed. Assuming the timestamp from the data source says the data has been updated since the source plugin last fetched data it could dump the cache and re-fetch the data.

But what if only one piece of data has changed? This means most of what the source plugin is fetching hasn't changed and it's doing all this work to only get the small amount of data that has been added/updated/deleted. Ideally, the timestamp would be provided to the server and the server could provide the source plugin with the specific data that has changed (e.g. the specific blog post that has been added/updated/deleted). This is what I refer to as incremental data fetching. This is NOT incremental builds.

Incremental data fetching is not built into the gatsby data-layer. Gatsby provides some tools to help with this but ultimately the implementation is done by the source plugin.

## **Gatsby and data fetching**

When you start up your development environment you are starting a long running process to monitor your source code files. When the Gatsby team was working towards incremental builds this is the first place they decided to work towards incremental data fetching. The reason being once you started `gatsby develop` if you made content changes in your CMS those changes wouldn't be reflected in your development site. This meant regularly stopping and restarting Gatsby due to the lack of incremental data fetching; resulting in a cumbersome and very slow development experience.

The Gatsby Node APIs `[sourceNodes](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#sourceNodes)` and `[createSchemaCustomization](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createSchemaCustomization)` are responsible for handling all data layer integrations. Meaning these are the APIs all source plugins implement for adding raw data to the data layer. There are some others that get triggered when data is added or modified, but we don't need to worry about those. In order for Gatsby to fetch changed data for a given source plugin it simply needs to re-run these APIs for a source plugin and it will fetch new data and any schema changes.

## **Gatsby** **and caching**

Gatsby caches all fetched data and does it’s best to reuse that data on subsequent runs. Gatsby also provides a mechanisms to [manually cache](https://www.gatsbyjs.com/docs/reference/config-files/node-api-helpers/#cache) specific data and store [plugin state](https://www.gatsbyjs.com/docs/reference/config-files/actions/#setPluginStatus). All cached data is persisted to disk so that it may be reused.

Because of this cache Gatsby can start a build in one of 2 states. If there is no preexisting cache (or Gatsby chooses not to use it because of certain configuration changes) Gatsby is said to be doing a “cold” or “uncached” build and must fetch all data and build all resources. If there is a preexisting cache, this is a “warm” or “cached” build and the cache is used to skip unneeded work.

For incremental data fetching to work your plugin will need know what kind of build is happening. Thankfully it’s easy enough to store a boolean or some other value in the cache. If that value is not set when the plugin is run, it is safe to assume the cache is not being used and it is an uncached build.

## Implementation **Details**

To implement incremental data fetching you must solve two distinct problems. Your source plugin needs to know _what_ has changed and _when_ data has changed. However this is not as cut and dry as it may seem. Gatsby as an OSS project that can be built anywhere is unique from the Gatsby Cloud environment. This is because Gatsby Cloud is designed to solve hard problems and make money in doing so...not because they can't necessarily be solved other places. I'm going to talk about Gatsby OSS for in general and will include specific notes about how Gatsby Cloud is unique. Finally, due to differences between `gatsby build` and `gatsby develop` I’ll be having to differentiate between the two as well.

### when

The first step to incrementally fetching data is telling Gatsby _when_ to check for data changes. This is usually done in one of 4 ways: manually, timer, subscription, or webhook.

You may manually trigger a build by running \`gatsby build\` or \`gatsby develop\` in your CLI. This may be cached or uncached but all Gatsby knows is that it’s time to build.

Some source plugins use a timer. When run in development mode they simply check every X amount of seconds (this is often configurable) for new data. `[gatsby-source-graphql](https://github.com/gatsby/gatsby-source-graphql)` and `[gatsby-source-wordpress-experimental](https://github.com/gatsbyjs/gatsby-source-wordpress-experimental)` (at the time of writing) are examples of this method. Because \`gatsby build\` is not a persistent, long running process, starting a timer doesn’t do any good here.

Gatsby's recommended solution is to use some method of subscribing to data changes on the CMS such as WebSockets or GraphQL Subscriptions. `[gatsby-source-sanity](https://github.com/sanity-io/gatsby-source-sanity)` is an example of a source plugin that does this. This is the recommend method because it takes the least time between moment of data change and Gatsby being notified to of the change.

Finally, Gatsby provides the `[/__refresh](https://www.gatsbyjs.com/docs/refreshing-content/)` endpoint to allow CMSes to trigger data refresh. This requires `gatsby develop` to be able to listen to webhooks but without a IP on the internet, this isn't possible to listen for webhooks from cloud services; though, it can be worked around with something like [ngrok](https://ngrok.com/). \`gatsby build\` being non-persistent means it can’t listen for a webhook but most(all?) cloud providers offer this functionality.

### what

Once the source plugin has been told to re-fetch data it needs a way of knowing what has changed. This is most commonly a list of unique IDs and event type (created,updated, deleted). The plugin is then responsible for handling each ID according to the event type (fetching created and updated content and deleting deleted content).

There are 3 ways for Gatsby to receive data for incremental data fetching: request changes from server, subscription, or webhook.

When triggered manually, by timer, or by webhook the source plugin can reach out to the server and request and changed data. This is usually done using some kind of token (timestamp or otherwise) that the server then uses to determine changed data, and provide the list of changed data to the source plugin. The source plugin may then make subsequent requests for changed and updated data. This method works well across all build platforms and relies on cached data.

When triggered by an event coming from the subscription (WebSocket, GraphQL Subscription, etc.) though there is a unique advantage. The server is able to send the actual event with the unique ID of the modified data and the event type. This method doubles as when and what. the server now able to tell the source plugin when to re-fetch data (as apposed to waiting for it to reach out) and the client doesn’t have to establish a new connection and request the changed data. Unlike webhooks, this works in a local development environment and cloud scenarios.

The downside of subscriptions is it really works for \`gatsby develop\` and by extension the Gatsby Cloud “Previews” product. Builds don’t persist and thus can’t listen on a persistent connection. If you use a subscription your source plugin must also rely on a webhook to trigger the build and then establish this connection over-which to fetch changes. This basically means reverting to the server request method. The conversation is just happening over a persistent connection instead of disparate HTTP requests. While not inherently bad we must keep in mind we’re not relying on a single “when”.

Finally, when triggered by webhook there is another option. I have a secret to share. Gatsby has secret, undocumented APIs. One allows you to access the body of the incoming webhook. Meaning the server can provide data to the client. Secret, undocumented APIs always come with caveats, and there are good reasons Gatsby doesn't make these more widely known. But I'll get to that in a second. When \`gatsby develop\` receives a webhook on \`/\_\_refresh\` it will pass the body of the webhook to Gatsby and make it available in the \`sourceNodes\` API.

Remember how Gatsby Cloud is different? Well like Netlify or any other build service you can actually trigger builds with webhooks. This is part of any build pipeline’s proprietary cloud architecture...but Gatsby Cloud is unique in that it will make the body of the incoming webhook available to your client just like using the \`/\_\_refresh\` endpoint with \`gatsby develop\`.

But here’s the caveat. If you rely on that webhook to drive incremental data fetching the only place your source plugin actually has incremental data fetching is Gatsby Cloud. I’m currently unaware of any other cloud providers who are able to pass the webhook body into Gatsby builds. Ultimately this is why this API isn’t documented. Webhooks are an easy way to listen for changes from a server and receive data, but it relies on a very tight integration between Gatsby and your build provider. It’s a non ideal solution that works with most CMSes (cause most support webhooks) but only works in Gatsby Cloud.

## Things get complicated

As you may have gather source-plugins may use multiple ways to determine “what” changed and “when” something has changed. Consider WordPress CMS which is built in PHP.

PHP is a templating language that "builds" content. It's not a long running process. This means any kind of GraphQL Subscription or WebSocket is off the table. There's no server to send updates if there's no request being made. Thus the new source plugin for WordPress relies on both webhooks and a timer. Webhooks work well for triggering builds in Gatsby Cloud, but not in a local development environments. Thus when developing the site locally the plugin sets a timer to regularly check for content changes. The Gatsby source plugin relies on a WordPress plugin that adds server side capabilities so it can request changes based on a token. But it also uses the webhook body to stream data to Gatsby Cloud Preview instantaneously for nearly instant content previews.

## Summary

This all gets really complicated real fast. There’s things that could be done in OSS to resolve some of these pain points but Gatsby, as of yet, hasn’t gone down those roads (maybe I’ll talk about my ideas in another post). But here is a rough list of requirements your plugin needs to be able to meet

1. Receive notification of new data in development scenarios.
2. Be able to fetch potential data changes in build scenarios.
3. Allow gatsby develop to Receive notification of new data both in cloud architecture and local development.
4. Fetch changed data based on list of changed data.
5. Preferably work in all cloud environments not just with Gatsby Cloud.

Finally, based on our discussion here are some key takeaways:

1. Incremental data fetching gives huge performance improvements to all users if implemented in a way that meets all these requirements, not just those using Gatsby Cloud.
2. Webhooks are easy and they’ll get you incremental data fetching for Gatsby Cloud, but you’re not helping the rest of your users in production or development.
3. No matter how you implement incremental data fetching you probably need a way to provide the CMS with a token so the CMS can respond with the changed data (and maybe another token if you’re not just using time stamps).
4. Subscriptions work really well in all scenarios but webhooks will still be important for triggering builds.
5. Building these mechanisms into our CMS APIs means enabling incremental data fetching beyond Gatsby. If these mechanisms are more common it will become easier to build incremental data fetching into other frameworks.

## Conclusion

If your team needs help with Gatsby source plugins or anything else I am a freelance contractor and usually looking for work. Send me a message below or find me on twitter.
