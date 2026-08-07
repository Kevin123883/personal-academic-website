// Copies the repo-wide single-source data into src/data so the portfolio
// builds self-contained (e.g. on Vercel, where ../data is not uploaded).
// Locally this runs before dev/build, keeping ../data authoritative.
import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const source = join(root, '..', 'data')
const target = join(root, 'src', 'data')

if (existsSync(source)) {
  mkdirSync(target, { recursive: true })
  for (const f of ['about.json', 'education.json', 'cv.json', 'teaching.json', 'publications.json']) {
    cpSync(join(source, f), join(target, f))
  }
  console.log('✓ synced data/ → src/data/')
} else {
  console.log('· ../data not present (deploy build) — using committed src/data/')
}
