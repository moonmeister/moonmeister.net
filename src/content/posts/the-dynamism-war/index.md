---
title: 'The Dynamism War'
date: 2021-09-13
tags:
  - 'builds'
  - 'web'
---

In the web development world there are two warring priorities. Speed vs Dynamism. There are lots of things we can do to increase speed; but, static/pre-rendered sites have become synonymous with performance and good SEO, every millisecond you can shave [directly affects](https://www.cloudflare.com/learning/performance/more/website-performance-conversion-rates/) conversion rates. On the other hand any eCommerce marketer will tell you that dynamic content that's tailored to a specific viewer drives conversion rates. 

All this comes to a head in the old argument of "static" vs "dynamic". Static sites are fast, dynamic sites are slow. Static sites are boring, dynamic sites are more interesting. It's an age-old debate that mostly lies in what I see as bad definitions of "static" and "dynamic".

Gatsby is probably a great example of this debate. Don't get me wrong, Gatsby has plenty of issues, but I’ve seen folks pigeon hole it as "just a static site generator" and thought they could not ship dynamic sites on it. Gatsby's own cloud offering is built with Gatsby. If you can run a fully dynamic cloud app on Gatsby, you can do anything.

## **The root issue**

Gatsby does create _static assets_ but because of React's client-side hydration you have all the power of JS and React to dynamically fetch and render any unique data to any user. Gatsby also provides [client-only routes](https://www.gatsbyjs.com/docs/how-to/routing/client-only-routes-and-user-authentication/) which means a route is rendered just like any other SPA and can allow authenticated access to anything you fetch from any API using JavaScript. Despite the _static assets,_ there is absolutely nothing limiting how _dynamic_ a Gatsby page can be.

The reverse is also true. I can build something using SSR. Let's use Next as an example. I can use `getServerProps` to fetch data for a page and ship it to my user on every single request. But if that data isn't changing between users then, despite the _dynamic rendering_ of the page, it’s serving _static content_.

What happens is this (warning: gross generalization ahead): The SSR Bros dis on _static rendering_ because they don't realize that static assets don't necessitate _static content_. The SSG Bros dis on _dynamic rendering_ because they don't know how to cache _static content_. In the end, both are wrong. There's no perfect stack and we all accept tradeoffs for doing things the way we prefer. 

Generally speaking, how you render and where you render should depend on the needs of your content. In the case of Gatsby Cloud, all their marketing material, the docs, and blog are all statically rendered for optimal performance. The app that is Gatsby’s Cloud offering is a client-only route rendered client side. This optimizes every route for whether speed/seo or dynamism is more important.

## **How'd we get here...**

I think this confusion is due to historical reasons surrounding the technical limits of the web platform 10+ years ago.

First, the evolution of JavaScript, ES5+, and modern JS UI frameworks have given us the ability to ship full, highly-dynamic apps that run entirely in the browser. That wasn't possible 15-20 years ago. You had to have a _dynamic rendering_ to get that kind of _dynamic content_. The advent of client-side UI frameworks have been revolutionary in separating the shipped files from the rendered HTML.

Next, traditionally the large monolithic web frameworks we've used to render websites have only given us one method to render our pages. WordPress and any LAMP stack framework is designed to serve dynamic content from the server. There are exceptions but LAMP will never be Gatsby. Traditional static site generators (SSG) were written in languages other than JS and rendered HTML. CSS, and JS could be shipped but that logic was separate from what rendered the core content, HTML. 

What's truly unique about the evolution of JS on the server/build side of things is that the same exact code can be rendered during build, on the run-time server, or in the client. PHP could only ever be rendered on the server. People make fun of JS frameworks for "reinventing" PHP. But because JS code can be rendered in any context they will forever and always be infinitely more powerful than PHP. I'm glad we're bringing the server-side functionality of PHP back into our JS frameworks. This means we aren't stuck with shipping massive amounts of JS into browsers. We now have a single paradigm for coding our apps/routes that based on config can be rendered in 1 or more locations. No language other than JS will ever be able to do that (with the possible exception of a language rendered into Wasm).

In conclusion, because of historical limitations of "static" and "dynamic" sites, we're still applying those paradigms to modern frameworks that no longer have the same limitations.

**Where we're going**

The future of how we render our assets and content is bright. The flexibility that JS frameworks and modern browser APIs bring to the web will mean we don't have to choose where our content is rendered on a per site basis. Gatsby and Next allow us to currently choose how to render on a per route basis. Soon features like React's [server components](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html) will allow us to choose our render method per component. We'll be able to optimize rendering and performance in ways never dreamt of 10 years ago.

Additionally, because of these improvements the gap between build time(SSG) and run-time(SSR) rendering has continued to become smaller and smaller. This and improvements in integrating rendering and caching will show great performance improvements and optimizations being built into frameworks like we've never seen.

It’s an exciting time to be developing on the web. Things are moving fast and slow simultaneously. However you build sites, I hope your users love them.
