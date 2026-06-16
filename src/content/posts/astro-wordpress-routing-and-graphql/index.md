---
title: 'Astro + WordPress: Routing and GraphQL'
date: 2025-04-11
tags:
  - 'astro'
  - 'graphql'
  - 'headless'
  - 'wordpress'
---

:::note
Astro is working on [Advanced Routing functionality](https://docs.astro.build/en/reference/experimental-flags/advanced-routing/) that will likely render this method outdated.
:::

I’ve been using headless WordPress since before it was cool. I’ve built numerous sites using Gatsby, Next.js, SvelteKit, and now Astro! 

I can wholeheartedly say Astro has been the best experience for me. While it should stand proud for various reasons, its feature set and approach make it an excellent match for use with headless WordPress.

In preparation for this article, I moved a site from Gatsby to Astro. I learned a ton about Astro and hope to share that with you over a series of articles. Today, I’ll share how I handled routing and querying WPGraphQL. 

If you’re unfamiliar with Astro, scan their [home page](https://astro.build/) and reference their docs as needed. A working example of what I’m building is also available in the [wpengine/hwptoolkit](https://github.com/wpengine/hwptoolkit/tree/main/examples/astro/template-hierarchy-data-fetching-urql) repo!

**Table of Contents**

- [Routing](#routing)
  - [Basics of the Template Hierarchy](#basics-of-the-template-hierarchy)
  - [Template Hierarchy in Astro](#template-hierarchy-in-astro)
    - [Catch-All Route](#catch-all-route)
    - [Seed Query](#seed-query)
    - [Calculating the Possible Templates](#calculating-the-possible-templates)
    - [Creating Available Templates](#creating-available-templates)
    - [Choosing a template](#choosing-a-template)
    - [Putting it all together](#putting-it-all-together)
- [Querying Data ](#querying-data)
  - [GraphQL Client](#graphql-client)
  - [Fetching Data with URQL](#fetching-data-with-urql)
- [Conclusion](#conclusion)

## Routing

Routing between WordPress and a headless app can be surprisingly complex. WordPress is unique in this aspect due to its opinionated nature. Myself and others on my team have recently written extensively on the complexities of [routing](https://github.com/wpengine/hwptoolkit/blob/main/docs/explanation/routing.md) if you want to read more. 

You need to know now that teaching your frontend to route and template like the [WordPress Template Hierarchy](https://developer.wordpress.org/themes/basics/template-hierarchy/) has some significant advantages. We implemented this in [Faust,](https://faustjs.org/docs/tutorial/learn-faust/#template-hierarchy) but it has some drawbacks due to how Next.js works. 

Astro’s flexibility and server-first model made implementing WordPress-style routing and templating a breeze with no drawbacks.

### Basics of the Template Hierarchy

The template hierarchy in WordPress can be complex and confusing. 

If you're from the WordPress world and understand how its routing works—great! You'll still benefit from this section by learning how routing typically works in most JavaScript frameworks. For everyone else who may not be as familiar with WordPress routing, don't worry—let’s break it down and make sense of it together.

Most JavaScript-based meta-frameworks route using “File System” routing. The specifics vary, but the idea is that the names of the files and folders determine what is rendered at a given route. Astro is [no exception](https://docs.astro.build/en/guides/routing/#:~:text=Astro%20uses%20file%2Dbased%20routing,project%20src%2Fpages%2F%20directory.). File system routers make some assumptions, though. 

A given route is tied to a specific piece or type of data (e.g., blog posts) and template (e.g., all data at that route should be rendered roughly in a single way). For the route `/blog/[slug].astro`, the `[slug].astro` template renders a blog post as fetched by `slug` the same way it renders every other blog post. File system routing is robust and suited to solve the unique problems of JS web apps.

WordPress flips this flow because it thinks about data first. A given post or page can be at any route and rendered with a variety of templates. The [WP Permalinks](https://wordpress.org/documentation/article/customize-permalinks/) system determines the full route (URI) of the content and the Template Hierarchy determines, based on the data, configuration, and available templates (templates are provided by a theme in WordPress). Only then is a page rendered. This system is extremely flexible and powerful. 

Practically, this flow does look a little different. When a request for `/blog/a-blog-post` comes into a WordPress site, the server only has that URI—it doesn’t magically know the data. WordPress uses the permalink system to look up the associated piece of data before choosing a template and rendering the page. 

This is the flow we’ll have to mimic in Astro. URI => Data => Template => Render: Data + Template.

### Template Hierarchy in Astro

In Astro, this will look like 6 distinct steps:

1.  Getting the URI
2.  Making a “Seed Query” to WordPress to fetch template data
3.  Collecting available templates for rendering
4.  Calculating possible templates the data could use
5.  Figuring out which of the available templates to use based on the prioritized order of most to least specific possible templates
6.  Fetching more data from WordPress to actually render the template

Does your brain hurt? Sorry, all will be explained.  

#### Catch-All Route

We need the URI, the whole thing, not just a sub-path. This is easy in Astro with a catch-all route `pages/[...uri].astro`. 

#### Seed Query

We’ll then need to fetch the data associated with that URL. The good news is that WPGraphQL has the perfect tool for the job!

```gql
query SeedQuery($uri: String!) {
  nodeByUri($uri) {
    __typename
    id
    ... on ContenNode {
      slug
    }
  }
}
```

This is an extremely simplified version of the Seed Query. The [full Seed Query](https://github.com/wpengine/hwptoolkit/blob/main/examples/astro/template-hierarchy-data-fetching-urql/example-app/src/lib/seedQuery.js#L7-L84) I’m using in the example implementation has to handle all content in WordPress with a URI (posts, pages, custom posts, taxonomies, authors, etc), even if it’s unpublished draft content. This is the same seed query used by Faust. 

All that aside, now that the data has been retrieved from WordPress, we can determine what template to render. This is where things get complicated.

#### Calculating the Possible Templates

We have a data set from our seed query. But what template will render this data? 

In the case of the seed query, we could simply ask WordPress. But there is no easy WordPress functionality to get this data. My example uses the [function we built for Faust](https://github.com/wpengine/hwptoolkit/blob/main/examples/astro/template-hierarchy-data-fetching-urql/example-app/src/lib/templates.ts#L30-L166) to take the data from the seed query and generate a list of possible templates. This list is in order of most specific to least specific. For a page, this looks like: `[page-sample-page, page-2, page, singular, index]`.

#### Creating Available Templates

To render this WordPress data, we need a template, and unless we want them all to look identical, we have to break out of the file system router. Our one catch-all route needs to be able to render multiple templates.

The logical assumption here might be to use a switch statement or key/value pairs to select from a variety of registered templates. This is how Faust works. 

While this will work technically, there are issues with bundling. File system routes bundle code on a per-route basis. In Next.js this means the JS for all routes are in a single bundle due to the use of a catch-all route. 

Astro has [similar bundling issues](https://github.com/withastro/astro/issues/8223) (technically, if you don’t ship any JS, this isn’t an issue, but that’s an unlikely scenario in reality). Because of this, standard JavaScript won’t work. We need to work with the file system router to get bundling to work correctly.

The solution is to use “rewrites”. Rewrites are a web server term. If you’re running a web server like Apache and use a basic setup to serve PHP or HTML you’ll notice all your routes look like `/about.html` or `/blog-post.php?slug=headless-wordpress-rocks`. 

These aren’t “pretty”. Rewrites let me configure Apache to serve `/about.html` when a request comes in for `/about`. Or a request for `/blog/headless-wordpress-rocks` to ask the PHP for `/blog-post.php?slug=headless-wordpress-rocks` and to serve that.

These are distinct from more common “redirects” because we don’t tell the browser to look somewhere else. Rewriting renders something other than what was requested without changing the URL. 

Rewrites let our catch-all route determine what template to use and rewrite the user's request to the template route. So my [routes in Astro](https://github.com/wpengine/hwptoolkit/tree/main/examples/astro/template-hierarchy-data-fetching-urql/example-app/src/pages/) now look like this: 

```text
pages/
  ↳  [...uri].astro
  ↳  wp-templates/
      ↳  index.astro
      ↳  home.astro
      ↳  archive.astro
      ↳  single.astro
```

I now have 4 available templates. One issue here is someone could accidentally route directly to `/wp-templates/home` or any of these routes. To solve for this I have [a check](https://github.com/wpengine/hwptoolkit/blob/main/examples/astro/template-hierarchy-data-fetching-urql/example-app/src/pages/wp-templates/archive.astro#L4-L17) at the top of all templates to make sure this isn’t the case, if it is, I rewrite to a 404 page.

Finally, we don’t want to hard code available templates into our JS code because it’s cumbersome and error-prone. I chose to use Astro’s [Content Collections](https://docs.astro.build/en/guides/content-collections/) feature to easily [read available templates](https://github.com/wpengine/hwptoolkit/blob/main/examples/astro/template-hierarchy-data-fetching-urql/example-app/src/content.config.ts#L7-L30) directly from the file system.

#### Choosing a template

We now have a list of possible templates and a list of available templates. Based on the prioritized list of possible templates, we can determine which of the available templates to use. 

A [quick bit of JavaScript](https://github.com/wpengine/hwptoolkit/blob/main/examples/astro/template-hierarchy-data-fetching-urql/example-app/src/lib/templates.ts#L168-L184) can compare the list of possible templates (`[single-post-sample-post, single-post, single, singular, index]`) to the list of available templates (`[archive, home, archive, single]`) and the first match is our template. In this case “single” is the winner!

#### Putting it all together

Now that we’ve built all the pieces, we can put this into a [single function](https://github.com/wpengine/hwptoolkit/blob/main/examples/astro/template-hierarchy-data-fetching-urql/example-app/src/lib/templateHierarchy.ts#L20-L79) that takes a URI and returns the template. Our [catch-all route](https://github.com/wpengine/hwptoolkit/blob/main/examples/astro/template-hierarchy-data-fetching-urql/example-app/src/pages/%5B...uri%5D.astro) now looks something like this:

```js
---
// ...

const { uri = "/" } = Astro.params as Params;

const results = await uriToTemplate({ uri });

if (results.template) {
  return Astro.rewrite(results.template.path);
}

---
```

The specifics look slightly different depending on whether you’re server rendering at build time or on request. The full example shows rendering statically at build time.

## Querying Data 

Routes are routing and our frontend is happily relying on the WordPress template hierarchy to route. Now, we want to render data, but our seed query didn’t have much in it! We could expand that query, but this isn’t recommended. 

While it is possible to get a lot of data from a single GraphQL request, this lowers caching hit rates. We’d rather make several specific queries to GraphQL that are highly cachable than one large query that has a low cache hit rate due to being constantly invalidated. So, we’re going to want to query data for each template. 

### GraphQL Client

There are plenty of great GraphQL clients out there, like Apollo. I chose [URQL](https://nearform.com/open-source/urql/) for this demo to learn something new and for its minimalist approach. URQL is an excellent choice with plenty of advanced features that can be added if your project demands. It paired great with Astro!

Once you [set up a client](https://github.com/wpengine/hwptoolkit/blob/main/examples/astro/template-hierarchy-data-fetching-urql/example-app/src/lib/client.js) you can use that client across Astro to fetch data.

### Fetching Data with URQL

Luckily this is Astro, whether page or component, I can easily make asynchronous calls to fetch data!

```js
---
// …

const { data, error } = await client.query(
  gql`
    query MyQuery($variable: String!) {
      # ...Whatever I need
    }
  `,
  {
    variable: “example”
  }
);

if (error) {
  console.error("Error fetching data:", error);
  return Astro.rewrite("/500");
}

---
```

If you need more data, remember to keep queries specific, one or more queries can be made in parallel:

```js
---

// ...

const [query1Results, query2Results] = Promise.all([
  client.query(query1,variables1),
  client.query(query2,variables2),
]);

// ...

---
```

## Conclusion

Astro’s ability to fetch data from any page or component, combined with its programmatic rewrites, makes it a dreamy framework for working with headless WordPress. 

We’ve done so without breaking bundling or only being allowed large, difficult-to-cache queries. We can query only the data we need to drive a specific functionality on our site. Whether rendering at build (SSG) or request (SSR), this enables us to quickly get the data we need with high cache hit rates, leveraging WPGraphQL Smart Cache. 

My review: I love it! I’m stoked on Astro and the developer experience it provides for working with headless WordPress. 

There are so many more cool features I haven’t been able to address yet (e.g., form handling for WordPress Comments, content collections for advanced data fetching, etc.), so stay tuned—I’ll be writing more soon!
