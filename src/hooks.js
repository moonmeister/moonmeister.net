import * as Sentry from '@sentry/browser';

/** @type {import('@sveltejs/kit').HandleError} */
export function handleError({ error, event }) {
    // example integration with https://sentry.io/
    // @ts-ignore
    Sentry.captureException(error, { event });
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {

    // @ts-ignore
    Sentry.captureEvent(event);

    const response = await resolve(event);

    return response;
}