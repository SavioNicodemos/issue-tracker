/**
 * Applies all pending Prisma migrations to Turso via @libsql/client.
 * Run with: npm run migrate:prod
 *
 * Requires TURSO_DATABASE_URL and TURSO_AUTH_TOKEN to be set in the environment.
 */

import { createClient } from '@libsql/client';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

const MIGRATIONS_DIR = join(process.cwd(), 'src/prisma/migrations');

async function main() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) throw new Error('TURSO_DATABASE_URL is not set');

  const db = createClient({ url, authToken });

  // Ensure the migrations tracking table exists
  await db.execute(`
    CREATE TABLE IF NOT EXISTS _prisma_migrations (
      id                TEXT    PRIMARY KEY,
      checksum          TEXT    NOT NULL,
      finished_at       DATETIME,
      migration_name    TEXT    NOT NULL,
      logs              TEXT,
      rolled_back_at    DATETIME,
      started_at        DATETIME NOT NULL DEFAULT current_timestamp,
      applied_steps_count INTEGER NOT NULL DEFAULT 0
    )
  `);

  // Get already-applied migrations
  const { rows: applied } = await db.execute('SELECT migration_name FROM _prisma_migrations');
  const appliedNames = new Set(applied.map((r) => r.migration_name as string));

  // Read all migration folders sorted by name (chronological)
  const entries = (await readdir(MIGRATIONS_DIR, { withFileTypes: true }))
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

  let applied_count = 0;

  for (const name of entries) {
    if (appliedNames.has(name)) {
      console.log(`  ✓ ${name} (already applied)`);
      continue;
    }

    const sqlPath = join(MIGRATIONS_DIR, name, 'migration.sql');
    const sql = await readFile(sqlPath, 'utf-8');

    console.log(`  → Applying ${name}...`);

    // Split on semicolons to execute statement by statement
    const statements = sql
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const statement of statements) {
      await db.execute(statement);
    }

    await db.execute({
      sql: `INSERT INTO _prisma_migrations (id, checksum, finished_at, migration_name, applied_steps_count)
            VALUES (?, ?, datetime('now'), ?, ?)`,
      args: [crypto.randomUUID(), '', name, 1],
    });

    console.log(`  ✓ ${name}`);
    applied_count++;
  }

  if (applied_count === 0) {
    console.log('No pending migrations.');
  } else {
    console.log(`\nApplied ${applied_count} migration(s).`);
  }

  db.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
