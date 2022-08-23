<script lang="ts">
  import { page } from '$app/stores';

  import * as Sentry from '@sentry/svelte';
  // import { BrowserTracing } from '@sentry/tracing';

  Sentry.init({
    dsn: 'https://5a510f4ea2b74d43b1ee4698b86ccbe8@o1374822.ingest.sentry.io/6682406',
    // integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

  Sentry.captureMessage($page.error.message);
</script>

<h1>{$page.status} : {$page.error.message}</h1>
