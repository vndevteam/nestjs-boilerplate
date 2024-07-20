# Security

Ensuring the security of your application is paramount. This document outlines the security measures implemented in this project, including authentication, authorization, encryption, hashing, and various HTTP security headers.

---

[[toc]]

## Authentication

Authentication is the process of verifying the identity of a user or system. This project uses JSON Web Tokens (JWT) for stateless authentication. Users are required to log in with their credentials, after which they receive a token that must be included in the header of subsequent requests.

## Authorization

Authorization is the process of determining if a user has permission to perform a certain action or access a specific resource. This project implements role-based access control (RBAC) to manage user permissions. Each user is assigned one or more roles, and each role is associated with a set of permissions.

## Encryption and Hashing

### Hashing

For hashing, we use the [argon2](https://www.npmjs.com/package/argon2) package, which is currently considered one of the most secure hashing algorithms. It is used primarily for hashing passwords before they are stored in the database. Here's a basic example of how to hash a password with argon2:

```ts title="src/utils/password.util.ts"
import argon2 from 'argon2';

export const hashPassword = async (password: string): Promise<string> => {
  try {
    return await argon2.hash(password);
  } catch (err) {
    console.error(err);
    throw new Error('Can not hash password.');
  }
};
```

## Helmet

Helmet helps secure your NestJS apps by setting various HTTP headers. It's not a silver bullet, but it can help prevent some well-known web vulnerabilities by setting headers like X-Frame-Options, X-XSS-Protection, and Strict-Transport-Security. Simply add it to your NestJS app with minimal configuration:

```ts title="src/main.ts"
...
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.use(helmet());
  ...
}
```

## CORS

Cross-Origin Resource Sharing (CORS) is a security feature that restricts how resources on a web page can be requested from another domain outside the domain from which the first resource was served. In NestJS, you can enable CORS with the `enableCors` method. Here's an example of how to enable CORS with a specific origin:

```ts title="src/main.ts"
...
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const corsOrigin = configService.getOrThrow('app.corsOrigin', {
    infer: true,
  });

  app.enableCors({
    origin: corsOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  console.log('\nCORS Origin:', corsOrigin);
  ...
}
```

Please note that enabling CORS with a wildcard (`*`) is not recommended for production environments, as it can expose your application to security vulnerabilities.

You need to set the `APP_CORS_ORIGIN` environment variable to the domain you want to allow requests from. For example, if you want to allow requests from `https://example.com`, you would set `APP_CORS_ORIGIN` to `https://example.com`.

```env
APP_CORS_ORIGIN=https://example.com
```

## Rate limiting

Rate limiting is crucial for preventing abuse and ensuring that your service remains available to all users. Implement rate limiting using the express-rate-limit middleware:

```ts title="src/main.ts"
...
```

By implementing these security measures, you can significantly increase the security and resilience of your application against common web threats.
