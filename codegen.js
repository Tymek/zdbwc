require('dotenv').config()

// @see https://hasura.io/learn/graphql/typescript-react-apollo/codegen/
module.exports = {
  schema: [
    {
      'http://localhost:8080/v1/graphql': {
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET || '0',
        },
      },
    },
  ],
  documents: ['./src/**/*.tsx', './src/**/*.ts'],
  overwrite: true,
  generates: {
    './src/generated/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}
