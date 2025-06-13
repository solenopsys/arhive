# Module Store Service

A simple backend module storage service built with [Bun](https://bun.sh/), [Elysia](https://elysiajs.com) and [Kysely](https://kysely.dev) using Bun's built in SQLite driver.

The service exposes a minimal HTTP API for storing and retrieving small JavaScript modules (up to **100 KB**).

## API

All routes are prefixed with `/registry`.

- `POST /registry/module` – create a module. Requires header `Authorization: Bearer <token>` with `MODULE_TOKEN`.
- `GET /registry/module/:name` – fetch stored module code by name.
- `GET /registry/modules` – list available modules.
- `DELETE /registry/module/:name` – remove a module.

## Development

Install dependencies and run the service:

```bash
bun install
bun run src/index.ts
```

Set `MODULE_TOKEN` in the environment to control who can upload modules. The database is stored in `modules.db`.

