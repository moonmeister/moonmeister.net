import * as Sentry from '@sentry/svelte';

Sentry.init({
  dsn: 'https://5a510f4ea2b74d43b1ee4698b86ccbe8@o1374822.ingest.sentry.io/6682406',
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

/** @type {import('@sveltejs/kit').HandleError} */
export function handleError({ error, event }) {
  // example integration with https://sentry.io/
  // @ts-ignore
  Sentry.captureException(error, { event });
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const response = await resolve(event);
  Sentry.captureMessage(`${event.url}:${response.status}`);

  return response;
}
