Kysely Playground Project

This project is a TypeScript playground demonstrating the use of Kysely for type-safe database interactions with PostgreSQL.

# Source Code Structure

`src/lib/`: Shared utilities, including database setup and configuration.
`src/types/`: Generated TypeScript type definitions for the database schema.
`src/modules/`: Feature modules, each containing a repository for database operations (e.g., users, todos).
`tests/`: Unit tests for repository classes.
`migrations/`: Database migration scripts for schema changes.
`scripts/`: Utility scripts, such as database seeding.

# Architecture

he application uses a modular design with repositories for data access, avoiding shared base classes. Dependencies are injected via constructor parameters using Deps objects. Database columns are in snake_case, with code using camelCase enabled by Kysely's CamelCasePlugin and code generation.

# Observations

The current repositories are simple and effective for demonstration, but lack error handling and complex queries.
Tests cover basic operations but could include more integration scenarios.
Migrations are basic; consider versioning and rollbacks for production.
A main entry point exists for connectivity testing, but no full application logic or API.

# Style Guide

- Prefer arrow functions for methods in classes and exported functions.
- Use dependency objects (Deps) for constructor injection instead of singletons/factories.
- Keep database column names snake_case; enable camelCase in code via Kysely CamelCasePlugin and kysely-codegen.
- Implement repositories directly under `src/modules/<module>/repository.ts`; avoid shared base repository abstractions.
- For NodeNext modules, prefer `import { type X } from '...'` alongside value imports; keep types co-located. Using plain `import type` is acceptable, but be consistent.
- Use Prettier (prettier.config.mjs) for formatting and ESLint v9 for linting. Run `npm run format` and `npm run lint` before commits.
- Try to keep things in one function unless composable or reusable
- DO NOT do unnecessary destructuring of variables
- DO NOT use `else` statements unless necessary
- DO NOT use `try`/`catch` if it can be avoided
- AVOID `try`/`catch` where possible
- AVOID `else` statements
- AVOID using `any` type
- AVOID `let` statements
- PREFER single word variable names where possible
