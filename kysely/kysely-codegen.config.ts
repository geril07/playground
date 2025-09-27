import { type CodegenConfig } from 'kysely-codegen'

// Prefer DATABASE_URL from env files; fall back to composed URL
const url =
  process.env.DATABASE_URL ||
  `postgres://${process.env.PGUSER || 'kysely_user'}:${process.env.PGPASSWORD || 'kysely_pass'}@${process.env.PGHOST || 'localhost'}:${process.env.PGPORT || '5432'}/${process.env.PGDATABASE || 'kysely_db'}`

const config: CodegenConfig = {
  // Up-to-date keys per latest README
  url,
  dialect: 'postgres',
  defaultSchemas: ['public'],
  outFile: 'src/types/database.d.ts',
  camelCase: true,
  // Keep type-only imports for cleaner output
  typeOnlyImports: true,
}

export default config
