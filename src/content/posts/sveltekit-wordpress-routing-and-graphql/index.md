---
title: 'SvelteKit + WordPress: Routing and GraphQL'
date: 2025-05-12
tags:
  - 'graphql'
  - 'headless'
  - 'sveltekit'
  - 'wordpress'
---

Svelte is my favorite framework, and today we’re exploring using SvelteKit to handle routing and data fetching for headless WordPress!

This article is part of a series exploring implementing the [WordPress template hierarchy](https://developer.wordpress.org/themes/basics/template-hierarchy/) in various frameworks. In the [Astro + WordPress article](/blog/astro-wordpress-routing-and-graphql/), we covered many foundational topics. I recommend giving that a quick read before proceeding, especially if you’re not familiar with WordPress, its template hierarchy, or how to implement the template hierarchy in a JavaScript framework.

For a working example of what we discuss here, check out the [wpengine/hwptoolkit](https://github.com/wpengine/hwptoolkit/tree/main/examples/sveltekit/template-hierarchy-data-fetching-urql) repo.

**Table of Contents**

- [Routing](#routing)
- [Template Hierarchy in SvelteKit](#template-hierarchy-in-sveltekit)
  - [Catch-All Route](#catch-all-route)
  - [Seed Query](#seed-query)
  - [Calculating the Possible Templates](#calculating-possible-templates)
  - [Creating Available Templates](#creating-available-templates)
  - [Choosing A Template](#choosing-a-template)
  - [Putting it All Together](#putting-it-all-together)
  - [Loading the Template](#loading-the-template)
  - [Rendering the Template](#rendering-the-template)
- [Querying Data](#querying-data)
  - [Defining Queries](#defining-queries)
  - [Executing Queries](#executing-queries)
  - [Component Queries](#component-queries)
- [Wrapping up](#wrapping-up)

## Routing

In the [article on Astro](/blog/astro-wordpress-routing-and-graphql/#basics-of-the-template-hierarchy), we discussed 4 major steps in the template hierarchy that must be recreated for a front-end framework. URI => Data => Template => Render: Data + Template.

In Astro, we did this on the server, leveraging a catch-all route. Then, we used Astro’s rewrites to switch to a different route under the hood that acted as our template. The rewrites were important to allow us to keep bundling working correctly. Given that SvelteKit rehydrates and does client-side routing by default, this will be even more important here!

Svelte does have a mechanism for rewrites, or as they call them, [reroutes](https://svelte.dev/docs/kit/hooks#Universal-hooks-reroute). Compared to [`Astro.rewrite()`](https://docs.astro.build/en/guides/routing/#rewrites), this is a very different system. Reroutes are basically dedicated middleware that is executed on every request to the server, rather than a simple function that can be called.

I decided to see how it would work, but I didn’t like it. The implementation had some significant edge cases, which ultimately made it too cumbersome.

Unlike Astro, because reroutes are a [SvelteKit Hook](https://svelte.dev/docs/kit/hooks), any code in this hook runs on every request; it happens before SvelteKit's file-system routing. This is important because it means all routes get handled by the `reroute` hooks, not just the ones that make it to a [catch-all route](https://svelte.dev/docs/kit/advanced-routing#Rest-parameters).

The difference being, if I add a route in the file system for content not driven by WordPress, Astro seamlessly handles that before the catch-all route (i.e., file-system router => catch-all rewrite => template). In SvelteKit, that same route would still get passed to the reroute hook (i.e., reroute hook => template). The file-system router has been fully circumvented. Additionally, this means we’re making a request to WordPress on every request to the server. To avoid both these issues, we have to add logic to specifically include and exclude certain routes from being sent to WordPress or avoid the file-system router. In the end, it felt like I was having to invent a new router, on top of SvelteKit.

While we can use a catch-all route in the Svelte router, we’re back to being worried about how our JavaScript will bundle. But SvelteKit has a whole data loading system for routes that Astro doesn’t have. Some quick searching led me to a pretty cool solution.

Usually, frameworks only support returning serializable data from data loading functions like the Next.js [`getServerSideProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props) function. This is because the framework has to turn this data into JSON to send it to a browser. SvelteKit offers this same functionality with its server [load function](https://svelte.dev/docs/kit/load) in `+page.server.js`.

However, SvelteKit also has a [universal](https://svelte.dev/docs/kit/load#Universal-vs-server) load function in `+page.js`! This function is executed both on the server and on the client, so it can support returning non-serializable data—data like a Svelte component!

These load functions support asynchronous calls and thus also support dynamically importing Svelte components with the ESM `import()` [syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import). We can combine this to make seed queries, load the appropriate template, and render a page.

## Template Hierarchy in SvelteKit

Let’s put this all together in SvelteKit. The steps are:

1.  Get the URI
2.  Determine the template
    1.  Making a “seed query” to WordPress to fetch template data
    2.  Collecting available templates for rendering
    3.  Calculating possible templates the data could use
    4.  Figuring out which of the available templates to use based on the prioritized order of most to least specific possible templates
    5.  Import the template
3.  Fetch more data from WordPress to actually render the template
4.  Merge the selected template and data for rendering

### Catch-All Route

To get the full URI, we’ll use the SvelteKit file-system router and a catch-all route: `src/routes/[...uri]/`.

:::note
SvelteKit creates routes based on folder names, not file names, we’ll create specific files here soon.
:::

### Seed Query

To run the [seed query](https://github.com/wpengine/hwptoolkit/blob/main/examples/sveltekit/template-hierarchy-data-fetching-urql/example-app/src/lib/seedQuery.js#L3-L80) in SvelteKit, we’ll use the server load function in `+page.server.js`. This data is serializable. In apps that you build, you can either choose to use the server load function as demonstrated here or the universal load function, depending on the type of page and the type of data that it requires.

### Calculating the Possible Templates

Our app will use [a function we built for Faust](https://github.com/wpengine/hwptoolkit/blob/main/examples/sveltekit/template-hierarchy-data-fetching-urql/example-app/src/lib/templates.ts#L30-L166) to take the data from the seed query and generate a list of possible templates, sorted from most specific to least specific. For example, the templates for a page could look like this: `[page-sample-page, page-2, page, singular, index]`.

### Creating Available Templates

Because we’re using dynamic imports to import our WordPress templates, they don’t have to be dedicated routes. However, we do need a single location where they all exist so we can easily import them programmatically. We will use a `wp-templates` directory with our templates inside, like this:

```text
src
  ↳ wp-templates/
    ↳ index.svelte
    ↳ home.svelte
    ↳ archive.svelte
    ↳ single.svelte
```

Like with Astro, we can read from the file system to determine which templates are available. This is a bit easier than registering them manually.

Because we’re reading from the file system, this work must be done on the server. The code could be handled directly in our server load function. Alternatively, to use the universal load function, you’d have to create an API endpoint.

Svelte has another superpower: [a special built-in version of `fetch`](https://svelte.dev/docs/kit/load#Making-fetch-requests). This is available in load functions and optimizes our request. In the case of server load functions, it doesn’t make an HTTP request but directly executes the JS, meaning we don’t have the overhead of a network request.

This is handy because it allows us to get the available templates from [an endpoint](https://github.com/wpengine/hwptoolkit/blob/main/examples/sveltekit/template-hierarchy-data-fetching-urql/example-app/src/routes/api/templates/%2Bserver.ts). Then, regardless of whether I choose to fetch that data in the universal (`+page.ts`) or server (`+page.server.ts`) load function, it will always work optimally.

### Choosing a template

We now have a list of possible templates and a list of available templates. Based on the prioritized list of possible templates, we can determine which of the available templates to use.

A [quick bit of JavaScript](https://github.com/wpengine/hwptoolkit/blob/main/examples/sveltekit/template-hierarchy-data-fetching-urql/example-app/src/lib/templates.ts#L168-L184) can compare the list of possible templates (single-post-sample-post, single-post, single, singular, index) to the list of available templates (archive, home, archive, single) and the first match is our template. In this case, `single` is the winner!

### Putting it all together

Now that we’ve built all the pieces, we can put this into a [single function](https://github.com/wpengine/hwptoolkit/blob/main/examples/sveltekit/template-hierarchy-data-fetching-urql/example-app/src/lib/templateHierarchy.ts#L18-L77) that takes a URI and returns the template. The [server load function](https://github.com/wpengine/hwptoolkit/blob/main/examples/sveltekit/template-hierarchy-data-fetching-urql/example-app/src/routes/%5B...uri%5D/%2Bpage.server.ts#L4-L18) for our catch-all route now looks something like this:

```javascript
// routes/[...uri]/+page.server.js

export const load = async (event) => {
	const {
		params: { uri },
		fetch,
	} = event;

	const workingUri = uri || '/';

	const templateData = await uriToTemplate({ uri: workingUri, fetch });

	return {
		uri: workingUri,
		templateData,
	};
};
```

### Loading the template

We have all the data, now we need to use that data to load our template in the universal load function.

The data returned from a server load function is always resolved before the universal load function is executed and passed to it.

Additionally, because we’re returning data from the universal load function, we’ll lose any data we returned from the server load function. If we want data from both, we must return the server data from the universal function.

Our [universal load function](https://github.com/wpengine/hwptoolkit/blob/main/examples/sveltekit/template-hierarchy-data-fetching-urql/example-app/src/routes/%5B...uri%5D/%2Bpage.ts#L10-L24) now looks something like:

```javascript
// routes/[...uri]/+page.js

export const load = async ({ data }) => {
	const template = await import(
		`$wp-templates/${dataToPass.templateData.template?.id}.svelte`
	);

	return {
		...data,
		template: template.default,
	};
};
```

### Rendering the template

Okay, so our load functions are doing their jobs. The final step is to render our template, which is passed to the page route.

Svelte makes this easy in the [route template](https://github.com/wpengine/hwptoolkit/blob/main/examples/sveltekit/template-hierarchy-data-fetching-urql/example-app/src/routes/%5B...uri%5D/%2Bpage.svelte):

```svelte
// routes/[...uri]/+page.svelte

<script>
 const { data } = $props();
</script>

<data.template />
```

## Querying Data

The template hierarchy has now been implemented, and WordPress is routing! Now we need to get some data for our routes.

We could query data from within our Svelte components. However, these queries will be executed on the client and not prerendered at build or on the server.

This is preferably handled in one of our load functions. Either the server or the universal load functions may be used. There is a slight difference in how and when this data is queried.

The most important thing to note is that the universal load function will execute once on the server and again on the client (albeit [without the need for a redundant network request](https://svelte.dev/docs/kit/load#Making-fetch-requests)) for server-rendered pages. However, it will only be executed on the client for client-side navigation.

The server load function is only executed on the server, and the response is delivered via JSON to the client for hydration. Client-side navigation means a new JSON payload is delivered.

Depending on the caching headers you opt to set, code complexity, etc., either of these may have performance implications or benefits. In this example, I’m going to fetch this data from the [universal load function](https://github.com/wpengine/hwptoolkit/blob/main/examples/sveltekit/template-hierarchy-data-fetching-urql/example-app/src/routes/%5B...uri%5D/%2Bpage.ts#L17).

### Defining Queries

The first step is creating a place to define queries that need to be executed for a given template. Since we’re already dynamically importing templates, importing the needed queries along with them seems logical. This way, all GraphQL, HTML, JS, and CSS can live within one file.

SvelteKit allows us to export things from the [module-level script tags](https://github.com/wpengine/hwptoolkit/blob/main/examples/sveltekit/template-hierarchy-data-fetching-urql/example-app/src/wp-templates/single.svelte#L1-L67) in a component. i.e.;

```svelte
<script module>

</script>
```

In this script tag, we can export anything we like, just like in regular JS. For our purposes, we need to export an array of objects with at least a query and variables.

```svelte
<script module>
 import { gql } from "$lib/client";

 export const queries = [
   {
     query: gql`
       //...
     `,
     variables: (event) => ({ uri: event.params.uri }),
   },
 ];
</script>
```

To make things fancier, we’ll want to pass 2 more optional fields, \`stream\` and \`fetchAll\`.

```svelte

 export const queries = [
   {
     stream: false,
     query: gql`
       query ArchiveTemplateNodeQuery($uri: String!) {
         # My Query
       }
     `,
     variables: (event) => ({ uri: event.params.uri }),
   },
 ];
</script>
```

[SvelteKit supports streaming](https://svelte.dev/docs/kit/load#Streaming-with-promises) data to the browser using promises. This means page load won’t be delayed waiting for that data to load. This `stream` boolean will be `false` by default, but if we do set it to `true`, then the load function will return the promise instead of the resolved data! This is great for non-critical data.

The `fetchAll` field will take a function that receives data from the GraphQL client requesting our query. It will then return an instance of `pageInfo` from a paginated GraphQL request.

In my case, I want to be able to fetch all menu items. I could make this work without pagination by setting my `first: $first` variable in a query quite high. However, this is not recommended. Not only is it fragile—should you ever go over the given estimate, your menus will stop working—but it also reduces the cacheability of your GraphQL requests. Smaller requests will always cache better because if one page of responses gets invalidated, the remaining pages will still be cached responses.

Now that we’ve defined our GraphQL queries, we’ll want to implement a way to execute these queries!

### Executing Queries

In our [universal load function](https://github.com/wpengine/hwptoolkit/blob/main/examples/sveltekit/template-hierarchy-data-fetching-urql/example-app/src/routes/%5B...uri%5D/%2Bpage.ts#L17), we’re already handling the import of our wp-templates. The Svelte component itself is the `default` export on the imported module. We can access `queries` as a named export.

We will now take the array of queries and pass it to a function that handles executing all the queries with their given config and variables. This will look something like:

```javascript
import { fetchQueries } from '$lib/queryHandler';

export const load = async (event) => {
	const { data } = event;
	const template = await import(`$wp/${data.templateData.template.id}.svelte`);

	const queryResults = await fetchQueries({ queries: template.queries, event });

	return {
		...data,
		template: template.default,
		graphqlData: queryResults,
	};
};
```

This function will correctly fetch all available data for paginated queries or streaming back queries we want streamed!

This data is returned in an object with a key matching the name of or GraphQL query. For example, if my query is `query furtherReading($uri: String!) {...}` our `graphqlData` object will be:

```js
    name: furtherReading,
    variables: { uri: “ourUri” },
    response: { … },
  }
}
```

If you streamed a response, then `response` will be a promise you have to use Svelte’s [`{#await}` syntax](https://svelte.dev/docs/svelte/await) with.

### Component Queries

For this example, I implemented a similar system for components. The distinction is that components may be used on one or more templates. I used a [component-level query](https://github.com/wpengine/hwptoolkit/blob/main/examples/sveltekit/template-hierarchy-data-fetching-urql/example-app/src/components/Nav.svelte#L1-L27) in my `Nav.svelte` to populate my navigation menu.

I opted to export a single query from a component, e.g.:

```svelte
// src/components/Nav.svelte

<script module>
 import { gql } from "$lib/client";

 export const query = {
     query: gql`
       //...
     `,
     variables: (event) => ({ uri: event.params.uri }),
   };
 </script>
```

This query can now be passed to any WordPress template that needs it executed. For the nav, I opted to execute this in the [layout load function](https://github.com/wpengine/hwptoolkit/blob/main/examples/sveltekit/template-hierarchy-data-fetching-urql/example-app/src/routes/%5B...uri%5D/%2Blayout.ts):

```javascript
// src/routes/[...]/+layout.js

import { fetchQueries } from '$lib/queryHandler';
import { query as NavQuery } from '$components/Nav.svelte';

export const load = async (event) => {
	const queryResults = await fetchQueries({ queries: [NavQuery], event });

	return {
		layoutData: queryResults,
	};
};
```

To avoid passing this data down through several layers of components as props to get it to the nav component, we can access it directly from the [page store in the nav component](https://github.com/wpengine/hwptoolkit/blob/main/examples/sveltekit/template-hierarchy-data-fetching-urql/example-app/src/components/Nav.svelte#L32-L38):

```svelte
<script>
 import { flatListToHierarchical } from "$lib/wpgraphql";
 import { page } from "$app/state";

 const menu = $derived(
   flatListToHierarchical(
     page.data.layoutData.headerNavQuery.response.data.menu.menuItems.nodes
   )
 );
</script>
<nav>
 <ul>
   {#each menu as item (item.id)}
     <NavStructure navItem={item} />
   {/each}
 </ul>
</nav>
```

## Wrapping up

Et. Voila! We have implemented the template hierarchy and data fetching for our templates! There are some edge cases, but we have a solid foundation to work from!

SvelteKit’s load functions provide us with a unique set of tools. While the specifics of implementing the template hierarchy varied from Astro, the general steps remained the same!

Personally, I feel like there are a few extra steps required, especially when fetching data in SvelteKit. Astro templates not being rendered in the client simplifies things significantly. I had less to think about and fewer tradeoffs to consider.

That said, SvelteKit still feels far simpler than most Next.js/React applications I’ve built. The routing and data loading can be complicated, or I can opt to keep it simple. As the developer, I feel like I have more levers at my disposal to control the exact outcome, which makes SvelteKit quite powerful but comes with tradeoffs.

I have a side project I’ll likely be using Svelte + Astro on soon! What do you think of this approach? What’s your favorite framework to use with headless WordPress?
