---
title: 'The When and Where of Rendering'
date: 2021-10-26
tags:
  - 'web'
  - 'builds'
---

I recently had a deep discussion on a GitHub RFC about what to call a rendering pattern and was very confused about the other person's perspective. I have a degree in Ancient Greek, so I tend to be particular about language and how folks define things. I argued that what they were giving this fancy name was actually just server-side rendering(SSR). They were emphatic it was not. I was being pedantic; but also trying to understand. They finally said something that made me realize we were looking at this from two different but equally valid perspectives.

I was looking at the _where_ of rendering. Does it happen on the build server(SSG), on the runtime server(SSR), or the client(CSR)? They looking at it from a perspective of when it was rendered. Did it happen during the build, when the server received a request from a user's browser, etc? Because we were looking at it from a different perspective, how we named it would be different.

This conversation made me realize the traditional rendering methods (SSG, SSR, and CSR) have become an oversimplification of a much more complex issue. Some of what we'll be talking about might seem pedantic at first, maybe it is, but in the end, I believe it will allow us to think about rendering in a much more nuanced way.

# Define "render"...

Technically all sites are "rendered" from CSS, HTML, JS, images, Wasm, JSON, XML, etc. in the browser. While a good definition, it's not helpful for our purposes. The "R" of _SSR_ is why I choose the word "render". "Generate" as in _Static Site Generator_(SSG) might be a better term, but I think the industry settled on "render" a long time ago, so here we are.

A site is "rendered" when the finalized form of the content is generated. But what IS content? HTML, CSS, images, videos, etc? All those different file types are critical, but there's only one kind of content any website **MUST** have.

HTML.

When your browser does that first HTTP GET request, it's not asking for an image, XML, or anything else. It wants that HTML goodness. From the HTML, our fonts, scripts, styles, and images can be loaded by the browser, but the HTML is the basis for all web pages.

Your website is "rendered" when the HTML content is finalized.

## Where?

We'll start with the _where_ of rendering. There are four locations where content may be rendered: the code editor, the build server, the runtime server, or the client (e.g., browser).

Did you type out your HTML? Not just a template, but all the content and data directly? Great! You've rendered your site in your code editor.

Did you create templates and merge the data on a build server (your local computer counts) to generate pages for each of your routes? Then you've rendered on the build server.

Did you write code that allows users to be served unique pages based on permissions, queries, routes, etc.? Then your site is rendered on the server!

Did you write a basic HTML file that all routes share, and you use JavaScript in the browser to render elements of HTML and fetch data based on their permissions, queries, route, etc? Then you've generated the final HTML on the client!

Hopefully, this makes sense, and don't worry; we'll give relevance and talk more in-depth about these soon.

## When?

The _when_ of rendering is more...complicated. But let's start with the examples above.

If you rendered your site in an editor, the _when_ would be called "author time." But you can't not write something when you write something. This distinction is pedantic. For the sake of this discussion, "Author Time Rendering" doesn't matter because it is uniquely tied to its _where_. Let's forget about it and focus on all computer-based rendering methods.

If you render something on a build server(SSG), this could be done when you trigger the task manually, via webhook, via git merge, etc. Any number of _events_ can trigger a build on a server.

If you have code running on a runtime server(SSR) it traditionally renders on receipt of an HTTP request.

Finally, client-side rendering (CSR) is done when the page is loaded or upon a user event such as a button click or page scroll. I hope the client-side is well understood, I'm not going to get much into this here.

# The future of rendering

I won't speak for everyone, but for myself, I've always (incorrectly) thought of rendering as a very black and white thing. I can have SSG, SSR, or CSR (client-side). Traditionally this has been true, but with new technology has come new possibilities. We need to recognize these names only describe the _where_ of rendering.

The future of rendering has to happen in one of these three places. But, by playing with _when_ they happen, or even combining strategies, we can create some really great new patterns to further expand what's possible in web development. Let's talk about how this has already started to happen.

## Hybrid rendering

Hybrid rendering isn't a new space. Gatsby, Next, Nuxt, and others have been doing this for years at this point. But not everyone realizes this, so I'll give a quick overview.

Let's imagine we have a page with some user interface element that allows them to load additional content. The user navigates to the page. How did the initial HTML get to the browser? Was it just shipped from a static file? Generated by a server? Written to the DOM by JS? Well, what did the button do? Was the HTML already in the browser, and the JS modified the CSS classes to show the content? Or did it fetch data from an API and add HTML?

For this exercise, let's presume the site was built with an SSG. Then some JS loads specific data from an API upon the user action. In this case, we have a site mainly generated on the build server, but a small part was rendered on the client. I'd call this hybrid rendering, specifically SSG + CSR. Gatsby and Next can statically build most of your site and fetch the dynamic bits on the client, automatically or by user action. React Hydration helps enable this.

This pattern lets us build more app-like experiences that require heavy client-side code. But solve the SPA problem of not pre-rendering anything. It gives us the performance benefits of SSG, with the flexibility of a SPA.

## Build time

Build server rendering is an exciting space right now. Netlify and the Jamstack have helped drive innovation here over the last ~5 years or so. Two big cases stand out to me. Netlify's own [DPR](https://www.netlify.com/blog/2021/04/14/distributed-persistent-rendering-a-new-jamstack-approach-for-faster-builds/), and Gatsby Cloud's [Incremental Builds](https://www.gatsbyjs.com/blog/2020-04-22-announcing-incremental-builds/). Both of these platforms serve content from static file hosting (s3 bucket). In DPR's case (if I understand it correctly), a route that doesn't exist triggers a build, but cloud magic happens since there is no runtime server, and a build server generates that page. In the case of Gatsby Cloud, the request can't create a build like in the case of DPR, but a webhook event due to a data change or code change triggers a build. Gatsby's internals goes to work, figure out what's needed, and you get a new page.

## It's SSG! It's SSR! No, it's ISR/DSG/DPR, aka "the new hotness"!

5+ years ago, the only _when_ an SSG had access to was "build time." With the advent of the Jamstack, Gatsby, Netlify, and headless CMSes we started connecting the CMS to our build pipelines. Maybe it's been longer, I won't pretend that 5 years isn't a guess. My point is this only somewhat recently became common, and mainstream. The fundamental issue with SSG is the time it takes to build the site. Small sites are fine, but you try to generate 100s or 1000s of pages and your build times shoot through the roof to the dismay of content publishers (silly publishers, only if devs didn't have to deal with them we could have perfect tech 😝). Gatsby and others have pioneered features like [incremental builds](https://www.gatsbyjs.com/blog/2020-04-22-announcing-incremental-builds/) to accelerate the build process, but a lot of cloud magic isn't necessarily available unless you buy their products.

This "build time" issue brought the Jamstack world back to Next and SSR. Yes, static files were fast, and atomic deploys were nice. But we've been scaling server-side apps for 2+ decades now since the advent of PHP and ASPX. It's easy! (spoiler, it's not). But you're fighting physics when you have to process and render HTML on the server vs loading it from a CDN. We're stuck, both methods have benefits and drawbacks. How do we solve these problems?

### Next

Next solved this by shipping Incremental Static Regeneration. Which, despite the word "static" in the title, and some other limitations, it's SSR + a [stale-while-revalidate](https://web.dev/stale-while-revalidate/) (SWR) cache to allow deferring the rendering from build time to later. Next's ISR has its issues, but I think it's the first in a new era of rendering patterns.

The genius of ISR is that it took the SSG technology in Next, shipped it to the server, and put it behind an SWR cache. This means Next is not doing "SSG" on your site. The build step packages up available routes and JS/CSS files but the actual HTML render is on the server. It's actually SSR. But, instead of rendering on every request, it only renders on the first request, and subsequently after the cache has been invalidated by a timeout.

Next has taken the traditional idea of _where_ of SSR and modified it's traditional _when_ from being on every request, to only when the cache is invalidated. Genius.

### Gatsby

Gatsby [just announced](https://www.gatsbyjs.com/gatsby-4/) some very exciting features: Deferred Static Generation(DSG), and Server Side Rendering(SSR). SSR is exactly as it seems. The request comes in, content is fetched, a page is rendered, the response is sent. Nothing unique, but cool that Gatsby is supporting this.

DSG is what we really need to talk about. You may be wondering, is this like Next's ISR? The answer is, kinda, but different. I'd say, better. For context, Gatsby's defining feature is its [GraphQL data layer](https://www.gatsbyjs.com/docs/reference/graphql-data-layer/). This allows Gatsby to know everything about your site and what content is on what page. This enables some cool things.

So, for DSG, just like ISR, a deferred page is not built at build time. Instead, it's, wait for it, deferred. When the first request comes in for a page its data is fetched from the data layer and the HTML is rendered. That is cached and subsequent responses should be from a cache. Sounds a lot like ISR, right? Well, this is where the similarities end.

Because Gatsby knows where every piece of content is on your site, when it receives a notification(usually a webhook) that data has changed, it can invalidate all the routes that use that data. This has a huge win over time-based cache invalidation because while one route might never be updated, another might get updates every 2 minutes. Both will be invalidated only when the rebuild is required.

Gatsby has taken SSR and modified the _when_ to be when the data populating the page is changed.

# Conclusion

It'll be cool to see where we are with rendering patterns and the web in another couple of years and how much more scalable and flexible our frameworks become. Request time SSR is great and has its place. But I'm really looking forward to seeing how we can continue to scale "static" site generators to enable a more performant web.
