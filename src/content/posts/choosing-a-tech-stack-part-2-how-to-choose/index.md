---
title: "Choosing a Tech Stack (part 2): How to choose"
date: 2020-11-03
tags:
  - "web"
---

Welcome to part 2 of "Choosing a Tech Stack". This post is going to get into the finer details of how to choose a method for building a project. You may be hoping this is where I tell you to use framework X or language Y. Alas, that is not what I am here to do and you are here to understand why one size does not fit all and the factors to consider when choosing.

If you have not read the [last post](https://moonmeister.net/blog/choosing-a-tech-stack-part-1-method-to-the-madness/) in this series, I recommend doing so, this post will be building off the ideas presented there. As a reminder, we defined 5 ways most (all?) websites are built: static files, static site generators (SSG), server side rendering(SSR), Single Page Apps (SPA), and SSR + Hydration.

## Prologue: Truth and Engineering

There is no one "right way", "wrong way", or "best way" for most things in life and definitely engineering. Everything is compromise. Making a physical object faster or lighter generally means less durability. Making a vehicle that travels to the moon means it will not make a good daily commuter. You get the point, hopefully.

In software engineering, picking [COBOL](https://en.wikipedia.org/wiki/COBOL) over JavaScript might be a good choice. Oh, you're making a website? Well according to some, this might still be a good choice (This is a joke about the JS haters). As engineers we define the parameters of what we are trying to accomplish. With those parameters in mind we can then decide how best to solve the problem at hand. So, let's walk through some of parameters we need to consider when choosing how to build a website.

## Start from the End

Do not ask how, ask what! Are you building the next Amazon, Google, a landing page, an admin interface, a blog? Let's run through some scenarios, our Modern Web Developer™ Dave (remember Dave from part 1?), has some projects coming up and has to choose a stack.

If you are wondering what Dave is building, you are already getting a hang of "Ask what, not how". If you wanted to tell Dave to use \[Insert your favorite framework/language/etc\], because it is \[all the reasons you love it\]. Keep working on it, it is a hard habit to break. I know I still fall prey to this all the time.

## Project Overview

Dave had his million dollar idea (or so he hopes). He is going to build a web product to solve the world's problems. But products do not live in vacuums, there are marketing materials, forms, etc that need a place to live as well.

### What now...

I almost just started talking to you about technologies. Remember how I said thinking about the "how" is a really hard habit to break? I pulled a "typical" for an engineer and started thinking about the "how" after a very short paragraph defining what I was building. You and I could spend all day defining "what", that is not helpful, but neither is moving on prematurely.

Ultimately, when making these decisions you have to find a balance. Keep asking yourself "What am I building". Even after it gets awkward...but not for too long. Remember, it is also important to know what you are NOT building. Dave is not building a product that needs to scale to 1,000,000+ on day one. If he can reasonably expect that within a short-ish period, it may be something to keep in mind, but it is not a core requirement.

### The Product

After some thoughtful brainstorming and research Dave has created a list of _initial_ requirements:

- Per-user authentication
- Secure data storage and transmission
- Dynamically render content/data
- Mobile and Web clients, with possible 3rd party integration

This describes a lot of products, and that is okay. That's one reason we as engineers tend to skip this step. We are so use to seeing the same basic points that we already know how to solve, we just do stop and think. Think about what? Good Question. Let's talk about these points.

#### Per-user Authentication

There are many ways to solve this problem, but not all work in all scenarios. The cookie has been around for ages. It could work if Dave's only API clients are browsers, but he needs mobile apps and will probably be making an SDK to access the API as well.

We need to pause and talk about nuance here. If Dave was only building a web app, cookies would be great. If Dave was building a web app and maybe an SDK, what then? As engineers we have the tendency to over plan. If Elon Musk and the SpaceX team had tried to build a rocket to carry cargo to the ISS and (cause he was "planning ahead") go to mars, Space X would have failed. It wasn't that he didn't want to go to mars, or even that he didn't believe it was possible. SpaceX new that those are very different requirements, trying to save time/money by building one rocket to rule them all ultimately would have failed. By building only what they needed, when they needed it, SpaceX has become a successful company.

In Dave's case he already needs non-cookie based authentication for mobile apps. Making the decision to use something like a JWT or OAuth may be more sensible. But, if Dave decided mobile apps were a longer term goal, he would probably be better off sticking with cookies and waiting to integrate a more complex system till he needed it.

#### Secure data storage and transmission

I almost did not write this, cause HTTPS is so prevalent. But that only covers part of "transmission" and none of "storage". If Dave is building the next great NSA spyware he has some serious security concerns to take in to account. First, the web might not be the best platform for his application. Second, he probably needs at-rest data encryption, and the data probably needs 2+ layer's of encryption as it zooms through the inter-webs (the data would be encrypted, he'd be using HTTPS, in addition to a VPN, or two...).

But Dave doesn't work for the NSA, or a bank, he's building an application that stores personally identifiable information(PII), maybe some trade secrets, and the like. Dave is also processing credit cards, and this is really important to keep in mind. Any entity processing or handling credit cards is required to meet [PCI](https://www.pcisecuritystandards.org/) compliance and health care data requires meeting [HIPPA](https://www.hhs.gov/hipaa/index.html) standards in the USA.

All this to say, beyond the basic, "To use HTTPS, or not to use HTTPS" (which shouldn't be a question any more), there are a lot of further security concerns that often relate to state and federal laws (GDPR, CCPA, etc) that need to be taken into account to completely define this point.

#### Dynamically rendered content/data

This point needs some serious nuancing. WordPress and PHP dynamically render static content. But, each route has roughly the same content. On the other hand, Google Search dynamically renders your search results. Given how much personal data (location, search history, browsing history, etc) is affecting your search results and could mean a single route can return significantly different results. We also need to think about how often the data changes. Blog content changes a couple times in its entire life (years and years). Streaming sensor data from machinery is going to change a couple times per second.

Dave needs to be able to think through the requirements of the data he handles and how it is displayed create for whatever technology he chooses. In the case of the web, the only way to update data live is JavaScript. But that doesn't mean he has to use a Single Page Application, he could render the page with PHP and let JS handle that one chart client side.

#### Mobile clients and 3rd Party integrations

Because mobile apps are not my expertise I will not pretend to know all the things Dave needs to Know to pick between some a native apps or something like React Native. But his building these affects how we think about the previous items as has been discussed.

## Picking

Now that Dave has some tangible requirements he can begin checking options off his list...


- Static Files - Due to the Dynamic nature of his app this isn't an option, or at least not a scalable one.
- Static Site Generator - Dave needs a bunch of unique pages, not a lot repetitive content (e.g. blog) and most importantly this method isn't conducive to secure content.
- Server Side Rendering - Because of Dave's need of secure and dynamic content this is a possible option.
- Single Page App - This is another good option.
- SSR + Hydration - Again, another great option.

In the end Dave has 3 possible options based on the requirements of his product. To narrow the options down farther Dave needs to bring in other context and information. Things like business goals, team experience, and budget. In Dave's case he's got experience with all the stacks, but he's doing this as a side project. Because he doesn't have investors to pay for a huge team and servers, he's probably going to lean towards a SPA or SSR + Hydration to put the bulk of the work on the client side.

Finally, because Dave does want a marketing site as well (and he's a team of one), he wants the SEO benefits of SSR + Hydration without having to maintain a second code base for the marketing site. (An SPA in combination with static files could fulfill this need to, but now we're just getting picky and complicated).

## Conclusion

Now that Dave has a clear set of needs for his technology he can begin to think about what specific frameworks and tools he needs to build his Million dollar idea. We'll get more into that in the next post in this series.

Thanks for reading, there will eventually be a part 3 talking about different technologies and where they fit into this puzzle.
