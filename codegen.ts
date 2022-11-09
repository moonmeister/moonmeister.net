import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://api.moonmeister.net/graphql',
  // documents: ['src/**/*.{js,svelte}', '!src/lib/gql/**/*'],
  ignoreNoDocuments: true, // for better experience with the watcher
  documents: ["src/**/*.svelte"],
  generates: {
    './src/lib/gql/': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
    },
  },
};

export default config;
