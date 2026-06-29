import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Dear Bloomy API',
        version: '1.0.0',
        description:
          'API for Dear Bloomy — create and share digital gifts (bouquets, cakes, cards). Includes authentication (NextAuth) and gift creation endpoints.',
      },
      servers: [{ url: '/', description: 'Current host' }],
      tags: [
        { name: 'Auth', description: 'Sign up, sign in and session management' },
        { name: 'Gifts', description: 'Create and fetch digital gifts' },
      ],
      components: {
        schemas: {
          Error: {
            type: 'object',
            properties: { error: { type: 'string', example: 'Invalid input' } },
          },
        },
      },
      // Manually documented NextAuth auto-generated routes (no JSDoc source).
      paths: {
        '/api/auth/callback/credentials': {
          post: {
            tags: ['Auth'],
            summary: 'Sign in with email & password',
            description:
              'NextAuth credentials callback. Requires a CSRF token from GET /api/auth/csrf. Sets a session cookie on success.',
            requestBody: {
              required: true,
              content: {
                'application/x-www-form-urlencoded': {
                  schema: {
                    type: 'object',
                    required: ['csrfToken', 'email', 'password'],
                    properties: {
                      csrfToken: { type: 'string' },
                      email: { type: 'string', example: 'you@example.com' },
                      password: { type: 'string', example: 'secret123' },
                    },
                  },
                },
              },
            },
            responses: {
              200: { description: 'Signed in (session cookie set)' },
              401: { description: 'Invalid email or password' },
            },
          },
        },
        '/api/auth/session': {
          get: {
            tags: ['Auth'],
            summary: 'Get current session',
            description: 'Returns the logged-in user, or an empty object if signed out.',
            responses: { 200: { description: 'Session object (empty if logged out)' } },
          },
        },
        '/api/auth/providers': {
          get: {
            tags: ['Auth'],
            summary: 'List enabled sign-in providers',
            responses: { 200: { description: 'Map of configured providers' } },
          },
        },
        '/api/auth/csrf': {
          get: {
            tags: ['Auth'],
            summary: 'Get a CSRF token',
            description: 'Required before posting to the credentials callback.',
            responses: { 200: { description: 'CSRF token' } },
          },
        },
        '/api/auth/signout': {
          post: {
            tags: ['Auth'],
            summary: 'Sign out',
            responses: { 200: { description: 'Session cleared' } },
          },
        },
      },
    },
  });
  return spec;
};
