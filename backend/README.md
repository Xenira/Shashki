# Express Typescript Template with MongoDB and Passport

Simple template with support for MongoDB and Passport.

## Usage

### Starting (With watcher)

```yarn start``` or ```npm start```

### Building

```tsc```

## Structure

| Folder | Content |
| --- | --- |
| ./dist | Compiled JavaScript files (May not exist) |
| ./src | app.ts - Initializes express and routing<br>index.ts - Starts the express application by binding to http(s) |
| ./src/config | Passport configuration and middleware |
| ./src/controllers | Logic that is called from the router |
| ./src/models | MongoDB connection and models |
| ./src/public | Staticly accessable files |
| ./src/routes | Routes that can be importet in app.ts and call the controller logic |
| ./sslcert | Place your certificates here |
| ./config.json | Database and other config can be put here |

## Environments

- PORT
  - Sets the port the server binds to
