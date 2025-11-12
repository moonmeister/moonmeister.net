---
title: 'Choosing a Tech Stack (part 3): What to choose'
date: 2021-07-11
tags:
  - 'jamstack'
  - 'web'
---

Since writing [part 2](/blog/choosing-a-tech-stack-part-2-how-to-choose/) I've been reminded in several conversations of the importance of the human element of choosing a tech stack. So far I've presented a very clinical approach to this problem. In this part we're going to cover the human element and then discuss actual technologies in the "modern" web development world and the methods they employ.

## The Human Element

There are two relevant nuances to discuss here, familiarity/institutional knowledge and business need. Dave is currently a lone developer, for him he can choose something that meets our very clinical criteria but it may mean he need to spend significant time familiarizing himself with a new technology stack. This isn't inherently bad but it's a time investment that he needs to consider.

In this decision Dave could choose what he knows, knowing it may not scale, in order to ship the product and enable the business to flourish sooner. At some point down the road Dave or his new team may then choose to rebuild parts or all of the product.

When it comes to institutional knowledge we'll leave Dave building his product and I'll share a personal anecdote. I was working for a technology company and was asked to build a working demo of a new module for the product. This was a web application built in C# and .NET that used iframes inside iframes...inside iframes for different features and modules. It was a shit show...but that's a story for another time. Because the company didn't want to "do it properly" and build out this module in C# and .NET before they had buying customers they asked if I could do so being by far the most talented web developer in the office (that wasn't saying much).

I said sure and was given some rough requirements. Lives in an iframe, do it quickly (aka cheap). For context, I didn't and don't know C#, so this wasn't an option. The company used [knockout](https://knockoutjs.com/) through out their existing product stacks but I had only used it in small projects and was neither comfortable with it nor did I like it. I really like [Svelte](https://svelte.dev/), I new it was the perfect use case for this small app (specifically no shipping a runtime, but also data flow, and animations). It fit the "quickly" requirement cause I wouldn't have to deal with knockout and I jumped right in to building.

I shipped this is a couple weeks and stake holders were very happy. I even hacked a JSON API into what was suppose to be SQL (you can make MSSQL server covert tables to JSON then return that string). It was my proudest and hackiest moment. When they inevitably asked for small tweaks, feature changes, etc, it was easily handled.

But, a Senior developer who I kept informed on this project had one complaint. Svelte. It wasn't that he didn't like Svelte, in fact, he had no opinion on it at all, he was a C# dev that dabbled in the web and wasn't familiar with most "modern" web development stacks. His point was simple, if/when I was gone from the company or busy on another project no other developer in the company was familiar with Svelte; many however, were familiar with Knockout.

In picking Svelte, I did choose speed, but I also chose it because of familiarity, and forgot to consider the institutional knowledge of the company. I still stand by that choice based on the fact that it was never "suppose" to be maintained long term and the speed requirement. But, it also taught me to consider institutional knowledge when choosing tech. Remember, you might be the exception like I was.

## Real Tech Choices

Okay, let's get down to brass tax, what JavaScript frameworks exist and what rendering methods do they employ? But first, a couple notes...You'll also notice I added another "category" of build "SSG + Hydration". This is to differentiate whether the SSR is happening at build or at request. This is an important distinction I didn't think about in the original post. It's probably worth noting that "Hydration" could more simply be described as "SPA". Meaning we have singular and compound rendering methods. I've also dropped "Static" cause by definition a framework will never be static.

|                      | **SSG** | **SSR** | **SPA** | **SSG + Hydration** | **SSR + Hydration**    |
| -------------------- | ------- | ------- | ------- | ------------------- | ---------------------- |
| **Gatsby**           |         |         |         | ✔                  | Maybe be in the future |
| **Next.js**          | ✔      |         |         | ✔ (ISR)            | ✔                     |
| **Create React App** |         |         | ✔      |                     |                        |
| **Nuxt**             | ✔      |         |         | coming v3           | ✔                     |
| **Gridsome**         |         |         |         | ✔                  |                        |
| **Vue CLI**          |         |         | ✔      |                     |                        |
| **Svelte Kit**       | ✔      | ✔      | ✔      | ✔                  | ✔                     |
| **Svelte**           |         |         | ✔      |                     |                        |
| **Sapper**           | ✔      |         |         |                     | ✔                     |
| **Elder.js**         | ✔      |         |         | ✔                  | ✔                     |

You'll notice a trend. The root UI toolkit (React, Vue, and svelte) only provide SPA. This makes sense give that's the context these libraries were originally invented. Since then we've realized only running our code client side and not preregistering via SSR or SSG in many contexts was silly. Thus "meta-frameworks" became a thing and implemented SSG and SSR for these underlying technologies.

Interestingly, there's some more correlation Gatsby, Gridsome, and Elder.js all saw "SSG + Hydration" as the way forward. Next.js, Nuxt, and Sapper saw SSR + Hydration as the way forward. Ofcourse there are exceptions, Elder.js added "SSR + Hydration" support, and Next.js added "SSG" & "SSG + Hydration" support. Even Gatsby, the ever static loyalists recently announced they're moving to allow more "dynamic" aka. "SSR + Hydration" experiences.

But here's the thing there's one lone framework. Svelte Kit. Svelte Kit is by far the newest but I believe it'll be setting the tone for the future of frameworks. It probably learned from the success Next.js in part and realized how you render shouldn't matter. How you render is HIGHLY dependent on the kind of content your site is rendering. Trying to claim anyone rendering methodology is "right" is just foolish. I'll get into this more in another post but I look forward to the day rendering is democratized and can be tweaked and modified over time as the needs of any given site, page, or component needs.

## Making a Choice

So what should Dave choose...If I were Dave I'd choose whatever gave him the most flexibility. If Dave knows React, choose Next, Svelte => Svelte Kit, etc. This isn't to say there is not benefit to Gatsby or it's kin but if you can get the same rendering engine Gatsby provides in Next, and also have the ability to do SSR, that's a huge win. Of course, this ignores scores of other features outside of rendering...but rendering is really important for performance optimization.

To echo previous posts, the nuance here is infinite...but having a framework that can grow and change with you as your business and technology needs change can not be understated. All those rewrites Dave did become a thing of the past, he can tweak different pages and components to render when and where is best for his current situation. He's now saving hundreds of hours of rewrites that he can put into creating content and adding features.

## Conclusion

Web frameworks have a long way to go, there's so many cool ideas, like partial hydration and client/server components that will continue to help us optimize performance. But the days of changing frameworks every 5 minutes when we realize its rendering method isn't the latest fad or no longer meets our business needs is coming to a end and that's really exciting.
