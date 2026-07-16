#!/usr/bin/env node
/**
 * Translation audit — finds missing, empty, or identical-to-English keys.
 * Run: node scripts/audit-translations.js
 */
const fs   = require('fs')
const path = require('path')

const MESSAGES_DIR = path.join(__dirname, '../messages')
const EN = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, 'en.json'), 'utf8'))

function flatten(obj, prefix = '') {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k
    if (k === '_meta') return acc
    if (v && typeof v === 'object' && !Array.isArray(v)) Object.assign(acc, flatten(v, key))
    else acc[key] = String(v ?? '')
    return acc
  }, {})
}

const enFlat = flatten(EN)
const enKeys = Object.keys(enFlat)

const LOCALES = fs.readdirSync(MESSAGES_DIR)
  .filter(f => f.endsWith('.json') && f !== 'en.json')
  .map(f => f.replace('.json', ''))
  .sort()

const results = {}
let totalIssues = 0

for (const locale of LOCALES) {
  const raw  = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, `${locale}.json`), 'utf8'))
  const flat = flatten(raw)

  const missing   = enKeys.filter(k => !(k in flat))
  const empty     = enKeys.filter(k => k in flat && flat[k] === '')
  const identical = enKeys.filter(k => k in flat && flat[k] === enFlat[k] && flat[k].length > 10)

  const issues = missing.length + empty.length + identical.length
  totalIssues += issues
  const pctDone = Math.round((1 - identical.length / enKeys.length) * 100)
  results[locale] = { missing: missing.length, empty: empty.length, identical: identical.length, total: issues, pctDone }

  const mark = issues === 0 ? '✓' : identical.length > enKeys.length * 0.2 ? '✗' : '~'
  console.log(`[${mark}] ${locale.padEnd(4)}  ${String(pctDone).padStart(3)}% translated  ${issues} issues (${missing.length} missing, ${empty.length} empty, ${identical.length} identical)`)
}

const incomplete = Object.entries(results)
  .filter(([, r]) => r.identical > enKeys.length * 0.2)
  .map(([l]) => l)

console.log(`\n${'─'.repeat(60)}`)
console.log(`Total issues: ${totalIssues} across ${LOCALES.length} non-English locales`)
if (incomplete.length) {
  console.log(`\nShould use noindex (>20% identical to EN):\n  ${incomplete.join(', ')}`)
}
