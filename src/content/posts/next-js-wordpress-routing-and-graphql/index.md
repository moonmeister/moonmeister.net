---
title: 'Next.js + WordPress: Routing and GraphQL'
date: 2025-08-04
tags:
  - 'graphql'
  - 'headless'
  - 'next-js'
  - 'wordpress'
---

[Next.js](https://nextjs.org/) is one of the most popular front-ends for building with [headless WordPress](https://wpengine.com/resources/headless-cms-and-wordpress/). My Reddit notifications are littered with Next.js + headless WordPress recommendations. Today, we’re going to look at implementing routing and data fetching for headless WordPress with Next.js.

You may wonder why we’re covering this, since WP Engine is behind [Faust.js](https://faustjs.org/), which provides its own routing solution for headless WordPress + Next.js sites. Faust’s routing solution isn’t perfect, however. In this article, we’ll experiment with another approach that offers improvements. We’ll be working with the [Pages Router](https://nextjs.org/docs/pages), though many of the concepts could be translated to the [App Router](https://nextjs.org/docs/app).

The two major issues we’ll be looking at today are bundle splitting and query optimization. Currently, the catch-all route doesn’t bundle template code separately. While this might only cause a couple of KB of bloat on small sites, the more complexity you add means you might be loading 10-100 KBs of extra code on every route. 

When Faust was first conceived years ago, I don't think the team fully understood the importance of small queries. Because of this, Faust’s main mechanism for querying GraphQL only allows for one query per template. We have since learned that this is an antipattern. Just because you can query everything you need from GraphQL in one request doesn’t mean you should. In this post, we’ll also experiment with alternative ways to handle data fetching. 

For a working example of what we discuss here, check out the [wpengine/hwptoolkit](https://github.com/wpengine/hwptoolkit/tree/main/examples/next/template-hierarchy/) repo.

## Routing

In the [article on Astro](/blog/astro-wordpress-routing-and-graphql/#basics-of-the-template-hierarchy), we discussed four major steps in the template hierarchy that must be recreated for a front-end framework. URI => Data => Template => Render: Data + Template.

In our article on [SvelteKit](/blog/sveltekit-wordpress-routing-and-graphql/), we experimented with new routing methods due to its implementation details. Next is similar in that middleware and rewrites just won’t work for us.  However, unlike SvelteKit, Next doesn’t have a way to load components outside of components. 

Next.js does have the ability to dynamically import components, which will solve our bundling issue. Our template loader will only dynamically import the needed template, not all templates.

## Template Hierarchy in Next.js

Let’s put this all together in Next.js. The steps are:

1.  Get the URI
2.  Determine the template
    - Make a “seed query” to WordPress to fetch template data
    - Collect available templates for rendering
    - Calculate possible templates the data could use
    - Figure out which of the available templates to use based on the prioritized order of most to least specific possible templates
    - Use the dynamically imported template
3.  Fetch more data from WordPress to actually render the template
4.  Merge the selected template and data for rendering

### Catch-All Route

To get the full `URI`, we’ll use Next’s file-system router and _optional_ [catch-all route](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#optional-catch-all-segments): `src/pages/[[...uri]].js`. 

:::caution
The `[...uri].js` pattern may be more common, but  it requires a value for `uri`. This means root (`/`) routes aren’t included. This is commonly not understood, and folks also include an `index.js` to handle this usecase. However, the double brackets make `uri` optional and thus inclusive of `/`. This `undefined` value will need to be handled later.
:::

### Seed Query

In the Next Pages Router, all server-side queries will need to be executed in `getStaticProps` or, more commonly, `getServerSideProps`; either way, this will be in the `src/pages/[[...uri]].js` route.

### Calculating Possible Templates

Our app will use a [function we built for Faust](https://github.com/wpengine/hwptoolkit/blob/main/examples/sveltekit/template-hierarchy-data-fetching-urql/example-app/src/lib/templates.ts#L30-L166) to take the data from the seed query and generate a list of possible templates, sorted from most specific to least specific. For example, the templates for a page could look like this: `[page-sample-page, page-2, page, singular, index]`.

### Creating Available Templates

Because we’re using dynamic imports to import our WordPress templates, they don’t have to be dedicated routes. However, we do need a single location where they all exist so we can easily import them programmatically. We will use a `wp-templates` directory with our templates inside, like this:

src

```text
src
  ↳ wp-templates/
    ↳ index.js
    ↳ default.js
    ↳ home.js
    ↳ archive.js
    ↳ single.js
```

With Astro and SvelteKit, I opted to read these from the file system to avoid having to import individual templates manually. Unfortunately, Next won’t allow us to do this. Because of the limitations in Next’s bundler and how `next/dynamic` Works, they make it clear in the [documentation](https://nextjs.org/docs/pages/guides/lazy-loading#examples) that variables can’t be used; static strings are required!

This means we use `index.js` in our `wp-templates` folder to handle dynamically importing the individual templates and exporting them into key-value pairs, where the keys are the expected WP template names. In our example above, this is mostly 1-to-1, though `default.js` will become `index`.

### Choosing a template

We now have a list of possible templates and a list of available templates. Based on the prioritized list of possible templates, we can determine which of the available templates to use. 

A [quick bit of JavaScript](https://github.com/wpengine/hwptoolkit/blob/main/examples/next/template-hierarchy/example-app/src/lib/templates.js#L165-L177) can compare the list of possible templates `[single-post-sample-post, single-post, single, singular, index]` to the list of available templates `[archive, home, archive, single]` and the first match is our template. In this case, `single` is the winner!

### Putting it all together

Now that we’ve built all the pieces, we can make a single function that takes a URI and returns the template. The `getServerSideProps` function of our catch-all route now looks something like this:

```javascript
// src/pages/[[...uri]].js
import { uriToTemplate } from '@/lib/templateHierarchy';

export async function getServerSideProps(context) {
	const { params } = context;

	const uri = Array.isArray(params.uri)
		? '/' + params.uri.join('/') + '/'
		: '/';

	const templateData = await uriToTemplate({ uri });

	if (
		!templateData?.template?.id ||
		templateData?.template?.id === '404 Not Found'
	) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			uri,
			// https://github.com/vercel/next.js/discussions/11209#discussioncomment-35915
			templateData: JSON.parse(JSON.stringify(templateData)),
		},
	};
}
```

### Loading the Template

Loading templates is done manually in the wp-templates/index.js. That will look something like:

```javascript
// src/wp-templates/index.js

import dynamic from 'next/dynamic';

const home = dynamic(() => import('./home.js'), {
	loading: () => <p>Loading Home Template...</p>,
});

const index = dynamic(() => import('./default.js'), {
	loading: () => <p>Loading Index Template...</p>,
});

const single = dynamic(() => import('./single.js'), {
	loading: () => <p>Loading Single Template...</p>,
});

export default { home, index, single };
```

### Rendering the template

Okay! Our `getServerSideProps` function does the hard work of figuring out which template to render and loading the seed query. Now, in our page component, we can handle rendering the template. 

```javascript
// src/pages/[[...uri]].js
import availableTemplates from "@/wp-templates";

export default function Page(props) {
  const { templateData } = props;

  const PageTemplate = availableTemplates[templateData.template?.id];

  return (
    <PageTemplate {...props} />
  );
}
```

## Querying Data

Now that we have a working router, let’s turn to fetching data for our templates. Currently, Faust’s main mechanism is `query` and `variables` exports from a given template. These are handled upstream in the catch-all routes `get____Props` function. 

As mentioned previously, we want to improve this by allowing multiple queries per template. Faust started to implement this by allowing a `queries` export. Without getting into too many details, this implementation has its own set of problems. We were able to implement this same pattern in the SvelteKit example without much difficulty and avoided many of the issues. Let’s do the same here.

### Defining Queries

While a full implementation might need some more advanced features, we’re going to keep ours fairly simple to start. 

```javascript
Component.queries = [
	{
		name: myQuery,
		query: gql`
      //...
    `,
		variables: (_context, { uri }) => ({ uri }),
	},
];
```

Instead of relying on complex hash algorithms to identify our queries, we’re going to use simple names. The GraphQL query name is used as a fallback if one is not provided. However, if you’re running one query with different variables, you may need to give it a unique name, so we provide the name field.

### Executing Queries

In our `getServerSideProps` function, we’re already handling the loading of our template. Now, we can access this `queries` array from there and execute our queries. Initially, I thought this would look something like: 

```javascript
const PageTemplate = availableTemplates[templateData.template?.id];

//Queries would then be available at
PageTemplate.queries
```

This didn’t work. Some console logs quickly made sense of the issue: 

```json
{
  PageTemplate: {
    '$$typeof': Symbol(react.forward_ref),
    render: [Function: LoadableComponent] {
      preload: [Function (anonymous)],
      displayName: 'LoadableComponent'
    }
  },
}
```

What’s actually being loaded is the wrapper component from `next/dynamic`, not the component itself. Thus, it doesn’t have the `queries` value I added. But since this is an async component, I suspected I should be able to access `queries` if I load the component itself via the `preload` function.

```javascript
const component = await PageTemplate.render.preload();
```

Sure enough, this worked:

```javascript
const component = await PageTemplate.render.preload();

// Queries available at:
component.default.queries;
```

Now that we have loaded our module and have access to queries, our array of queries will be handed off to a purpose-built function that can handle executing all the queries with their given config and variables, returning them in the expected structure. All together this will look something like:

```javascript
// src/pages/[[...uri]].js
import { uriToTemplate } from "@/lib/templateHierarchy";
import availableTemplates from "@/wp-templates";
import { fetchQueries } from "@/lib/queryHandler";

export async function getServerSideProps(context) {
  const { params } = context;

  const uri = Array.isArray(params.uri)
    ? "/" + params.uri?.join("/") + "/"
    : "/";

  const templateData = await uriToTemplate({ uri });

  if (
    !templateData?.template?.id ||
    templateData?.template?.id === "404 Not Found"
  ) {
    return {
      notFound: true,
    };
  }

  const PageTemplate = availableTemplates[templateData.template?.id];

  const component = await PageTemplate.render.preload();

  const graphqlData = await fetchQueries({
    queries: component.default.queries,
    context,
    props: {
      uri,
      templateData,
    },
  });

  return {
    props: {
      uri,
      // https://github.com/vercel/next.js/discussions/11209#discussioncomment-35915
      templateData: JSON.parse(JSON.stringify(templateData)),
      graphqlData: JSON.parse(JSON.stringify(graphqlData)),
    },
  };
}
```

### Component Queries

I like to be able co-locate my queries with the components they go with. So, leveraging the existing queries system I can similarly export query from individual components. For a navigation menu I could opt to pass the desired menu location in from the template to determine which menu is fetched and rendered.

In this example, I kept it simple and rendered a “Recent Posts” component on the home page.

```javascript
import { gql } from "urql";
import { useRouteData } from "@/lib/context";

export default function RecentPosts() {
  const { graphqlData } = useRouteData();

  const posts = graphqlData?.RecentPosts?.data?.posts?.nodes || [];

  if (graphqlData?.RecentPosts?.error) {
    console.error("Error fetching RecentPosts:", graphqlData.RecentPosts.error);
    return <div>Error loading recent posts.</div>;
  }

  return (
    <div className="recent-posts">
      <h2>Recent Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={post.uri}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

RecentPosts.query = {
  query: gql`
    query RecentPosts {
      posts(first: 5) {
        nodes {
          id
          title
          uri
        }
      }
    }
  `,
};
```

You may have noticed I used custom context to fetch the data. While I could pass this via props fairly easily, that’s not always the case. To avoid prop drilling, I added a context provider to our catch-all route to make page props available to all components.

```javascript
export default function Page(props) {
  const { templateData } = props;

  const PageTemplate = availableTemplates[templateData.template?.id];

  return (
    <RouteDataProvider value={props}>
      <PageTemplate {...props} />
    </RouteDataProvider>
  );
}
```

## Wrapping up

Just like that, we’ve managed to implement a template-hierarchy router and GraphQL data fetching for our templates. All the while, we have avoided some performance issues by enabling dynamic imports for templates and multiple query support for data fetching. 

This implementation is far from production-ready. I can think of a number of things the GraphQL data fetching doesn’t handle yet. But this shows us that with a little problem-solving, we can build some great solutions.

That said, between Astro, SvelteKit, and Next.js. Next has proven to be the most complicated implementation. The non-standard `next/dynamic` means extra steps for queries and manual registration of our `wp-templates`.

This comes down to strong async support in Astro and SvelteKit, while React has long struggled with supporting async data. Admittedly, Next App Router would likely help us simplify implementation complexities. But that’s a story for another day.

While my relationship with React/Next is tenuous at best, and I strongly prefer anything but, I still make a living maintaining sites using these technologies, and I learned a bunch about using them with headless WordPress. What do you think?
