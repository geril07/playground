Kysely + kysely-ctl quick commands

Setup

- Install deps: `npm install`
- Start DB: `docker compose up -d`

Migrations (kysely-ctl)

- Create: `npm run migrate:new -- add_users_table`
- Up (latest): `npm run migrate`
- Down (one step): `npm run migrate:down`
- To a migration: `npm run migrate:to -- 20250101010101`
- Reset (all down then up): `npm run migrate:reset`

Config is in `kysely/kysely.config.ts`. Connection defaults match `docker-compose.yml`.
