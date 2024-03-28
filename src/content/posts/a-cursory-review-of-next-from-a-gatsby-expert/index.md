---
title: "A Cursory Review of Next from a Gatsby Expert"
date: 2021-03-09
tags:
  - "gatsby"
  - "next-js"
  - "react"
  - "web"
---

I started in Gatsby open source in late 2017. It was a welcoming project and I was there to learn through building OSS. Since then, every React site I've built has been in Gatsby. I've built site's in Vue and Svelte but that's not important for this post.

I recently have been thinking I should really take some time to learn Next.js to see what folks have been talking about. I finally did. Initial thoughts? I like it. I'll try to keep away from harping on my gripes about Gatsby in this post and focus on what I liked about Next.js. Also, I literally just went through the [Next.js getting started guide](https://nextjs.org/learn/basics/create-nextjs-app) before writing this...I can't speak to how it scales.

## Things I like

### SSR & API capabilities

because Next is an actual server that can do static pages, it can also do a SSR and serve an API of your design. These are nice. Gatsby solves, or will solve some of these problems differently, but there is something a lot simpler about just building shit. Sometimes Gatsby's attempt at being purely static/client side feels laborious.

### Data handling

I'm a fan of Gatsby's data layer. It's one of the few things about Gatsby, IMO, that make it a truly unique and interesting technology. It comes with its problems though. Next's simple exports from page components felt really simple to get started with and easy to understand. No complex API's spread across multiple files. One file to create routes, fetch data, and render the web page. This felt simple and much more inline with Component based frameworks like React.

### Clear boundaries

Gatsby has a problem. I've seen it over and over from new users. Does it render on the server (at build time) or on the client? Next.js doesn't have this problem as much. Depending on whether you use `getStaticProps` or `getServerProps` defines how/where you run code (with exceptions for fallbacks). The actual React components are a little more nuanced based on other things but that's okay. Some of this goes back to the data handling comment, because Gatsby's data layer must be used you must know how to hook into that, but it's way too complicated to understand for most beginners.

## Things I don't like

Honestly not much. but like I said, I only went through the getting started tutorial. A lot of my frustrations with Gatsby exist because I have been working with it for 3 years and know it's faults. I'm sure this section would be much longer if I had been working with Next for 3 years.

## No data layer or plugins

I'm sucker for the Gatsby data layer, not because it's perfect (it's not) but because of the plugin ecosystem. The fact that everyone who wants to fetch data from WordPress or Ghost CMS doesn't have to reinvent the wheel is great. I can drop some plugins in (or use a theme) and be off to the races with anything like data fetching, my favorite styling method, or analytics of choice.

## Conclusion

I've been working in Gatsby so long it was nice to stick my head up and see how another React framework solved similar problems. This post also reminds me of all the things I want to see solved in Gatsby and maybe I'll write a post on what I think needs to change in Gatsby world.
