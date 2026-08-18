/**
 * Genera public/sitemap.xml dalle stesse fonti che alimentano il sito.
 *
 * Gira da solo prima di ogni `npm run build` (script `prebuild`), così l'elenco
 * delle rotte non resta mai indietro rispetto ai dati: se nasce un servizio o
 * un progetto, il file lo contiene già.
 *
 * TODO: `SITO` va allineato al dominio definitivo.
 */

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { services, cases } from '../src/data/content.js'
import { documenti } from '../src/data/legal.js'

const SITO = 'https://www.levelapp.it'
const oggi = new Date().toISOString().slice(0, 10)

/* La navigazione è a hash: le rotte vivono dopo `#/`. */
const rotte = [
  { path: '/', priorita: '1.0', frequenza: 'weekly' },
  { path: '/servizi', priorita: '0.9', frequenza: 'monthly' },
  ...services.map((s) => ({ path: `/servizi/${s.slug}`, priorita: '0.8', frequenza: 'monthly' })),
  { path: '/progetti', priorita: '0.9', frequenza: 'monthly' },
  ...cases.map((c) => ({ path: `/progetti/${c.id}`, priorita: '0.7', frequenza: 'yearly' })),
  { path: '/azienda', priorita: '0.7', frequenza: 'yearly' },
  { path: '/lavora-con-noi', priorita: '0.8', frequenza: 'monthly' },
  { path: '/interattivo', priorita: '0.6', frequenza: 'monthly' },
  { path: '/contatti', priorita: '0.9', frequenza: 'yearly' },
  ...documenti.map((d) => ({ path: `/${d.slug}`, priorita: '0.3', frequenza: 'yearly' })),
  { path: '/mappa', priorita: '0.4', frequenza: 'monthly' },
]

const url = ({ path, priorita, frequenza }) => {
  const loc = path === '/' ? `${SITO}/` : `${SITO}/#${path}`
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${oggi}</lastmod>`,
    `    <changefreq>${frequenza}</changefreq>`,
    `    <priority>${priorita}</priority>`,
    '  </url>',
  ].join('\n')
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!--
  Generato da scripts/sitemap.mjs — non modificarlo a mano: le modifiche vanno
  ai dati in src/data, poi \`npm run sitemap\` (o un normale \`npm run build\`).

  NB: la navigazione è a hash. Google segue i link interni di una SPA resa lato
  client, ma per avere una URL indicizzabile per pagina serve il pre-rendering:
  in quel caso queste \`loc\` diventano indirizzi veri senza il cancelletto.
-->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rotte.map(url).join('\n')}
</urlset>
`

const qui = dirname(fileURLToPath(import.meta.url))
writeFileSync(join(qui, '..', 'public', 'sitemap.xml'), xml)
console.log(`sitemap.xml: ${rotte.length} rotte`)
