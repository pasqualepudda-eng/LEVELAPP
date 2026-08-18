# LevelApp — sito web

Sito multi-pagina per la software house **LevelApp**, costruito con React + Vite,
Tailwind CSS v4 e Motion (Framer Motion).

Il linguaggio visivo è una copia di quello di github.com: token Primer nei due
temi (chiaro e scuro), bordi da 1px sempre visibili, un solo accento blu per i
link e verde per le azioni, tipografia Mona Sans, e l'impaginazione delle pagine
marketing — hero con campo email, funzionalità a tab, blocchi "bento", sezione
di prodotto scura in entrambi i temi, storie dei clienti e footer a colonne.
Marchio, testi e contenuti sono di LevelApp.

## Avvio

```bash
npm install
npm run dev      # http://localhost:5500
npm run build    # build di produzione in dist/
npm run preview  # anteprima della build, sempre su :5500
npm run lint
```

Tutto gira sulla porta **5500**, la stessa di Live Server (`vite.config.js` e
`.vscode/settings.json`). Di conseguenza gira **un servizio alla volta**: se
Live Server è attivo, `npm run dev` si ferma con un errore invece di spostarsi
su un'altra porta.

Con "Go Live" viene servita la cartella `dist/`, non il sorgente: l'`index.html`
in root è il modello di Vite e carica `/src/main.jsx`, che il browser non sa
compilare — aprendolo si vede una pagina bianca. Quindi: `npm run build` e poi
Go Live, oppure `npm run dev` durante lo sviluppo.

## Pagine

La navigazione è **a hash**, senza dipendenze esterne (`src/lib/router.jsx`):
funziona su qualsiasi hosting statico, anche in sottocartella, senza rewrite
verso `index.html`.

| Rotta | Pagina |
| --- | --- |
| `#/` | Home |
| `#/servizi` | Panoramica servizi |
| `#/servizi/gestionale` · `web-app` · `mobile` · `ai` | Dettaglio di ogni servizio |
| `#/progetti` | Elenco case study |
| `#/progetti/crm` · `erp` · `mes` | Case study completo |
| `#/azienda` | Chi siamo, valori, tappe, team, stack, sedi |
| `#/interattivo` | Tre prove interattive |
| `#/contatti` | Form, riferimenti, FAQ |
| qualsiasi altra | 404 con scorciatoie |

Convenzione del router: **solo** gli hash che iniziano con `#/` sono rotte. Un
`#ancora` semplice (skip link, link interni) non tocca la navigazione. I link con
sotto-ancora funzionano: `#/azienda#metodo` apre la pagina e scorre alla sezione.

## Struttura

```
src/
├─ App.jsx                 tabella delle rotte + layout
├─ index.css               design token, utility, keyframe
├─ data/content.js         TUTTI i testi del sito
├─ data/interactive.js     domande e contenuti dei giochi
├─ lib/
│  ├─ router.jsx           Router, Link, useRoute, scroll management
│  ├─ motion.js            easing, spring, varianti condivise
│  └─ useMediaQuery.js     breakpoint e prefers-reduced-motion
├─ pages/                  Home, Services, ServiceDetail, Projects,
│                          CaseStudy, About, Contact, Interactive, NotFound
├─ sections/               blocchi della home, nell'ordine in cui compaiono:
│                          Hero, Clients, FeatureTabs, WorkflowRiver, Pillars,
│                          AiSection, StatsBand, ProcessSection, Integrations,
│                          CasesTeaser, Testimonials
└─ components/
   ├─ Header.jsx           barra fissa con mega-menu + pannello mobile
   ├─ Footer.jsx           marchio, iscrizione, mappa del sito, riga legale
   ├─ ThemeToggle.jsx      selettore chiaro / scuro / come il sistema
   ├─ EmailSignup.jsx      campo email + azione primaria (hero e chiusura)
   ├─ PageHeader.jsx       testata delle pagine interne (briciole + titolo)
   ├─ CtaBand.jsx          chiusura ricorrente di ogni pagina
   ├─ FaqList.jsx          accordion accessibile
   ├─ ServiceCard.jsx      card di servizio (home + /servizi)
   ├─ CaseCard.jsx         anteprima case study
   ├─ AppWindow.jsx        mockup di gestionale (solo CSS)
   ├─ AiConsole.jsx        conversazione dimostrativa dell'assistente
   ├─ CodeWindow.jsx       finestra di codice con evidenziazione minima
   ├─ Logo.jsx             marchio
   ├─ interactive/         giochi della pagina interattiva: BugHunt,
   │                       StackMemory, LatencyMeter
   └─ ui/                  Button, Icon, Label, Reveal, Counter, Marquee,
                           SectionHeading
```

## Da personalizzare prima di andare online

Tutti i contenuti stanno in [`src/data/content.js`](src/data/content.js).
I valori ancora da sostituire sono segnati con `TODO`:

- `company` — telefono, email, P.IVA, anno di fondazione, sedi (Roma e Milano), social
- `clients` — nomi dei clienti (o sostituisci i wordmark con veri loghi SVG)
- `cases`, `testimonials`, `stats`, `timeline`, `team` — **dati e numeri reali**:
  quelli attuali sono plausibili ma inventati, non pubblicarli così come sono
- `faqs` — in particolare SLA e tempistiche

Il sito non espone prezzi, fasce di budget o condizioni economiche: se in futuro
vanno aggiunti, il posto è `faqs` e la pagina contatti. Gli importi che restano
nei case study (`cases`) sono i listini dei **clienti**, parte del racconto del
progetto, non tariffe di LevelApp.
- `legalLinks` — privacy, cookie, termini: oggi puntano a `#`

Fuori da `content.js`:

- **Dominio** — `https://www.levelapp.it` compare in `index.html` (canonical, OG,
  JSON-LD), `public/robots.txt` e `public/sitemap.xml`
- **Form** — `pages/Contact.jsx` non ha un backend: apre una mail precompilata
  verso l'indirizzo aziendale. Il punto in cui inserire un vero endpoint
  (Formspree, Resend, API tua) è commentato dentro `onSubmit`
- **`public/og-image.png`** — anteprima social: da rigenerare, i colori sono
  quelli della vecchia palette
- **SEO** — con il routing a hash esiste una sola URL indicizzabile. Se servono
  URL vere per pagina, la strada è il pre-rendering (vite-plugin-ssg, Astro,
  prerender dell'hosting): il router va allora spostato su History API

## Accessibilità

- Skip link "Vai al contenuto" come primo stop di tabulazione
- `:focus-visible` con outline visibile su tutti gli elementi interattivi
- FAQ con `aria-expanded` / `aria-controls` e pannelli come `region`
- Menu di navigazione con `aria-expanded`, chiusura con Esc e click esterno
- Briciole di pane come `<nav>` + `<ol>`, pagina corrente marcata `aria-current`
- Con `prefers-reduced-motion` i contatori mostrano subito il valore finale e le
  animazioni si azzerano

## Tema chiaro e scuro

Lo switch è nell'header e nel footer e ha tre stati — chiaro, scuro, come il
sistema — come l'impostazione "Appearance" di GitHub. La preferenza sta in
`localStorage` (`levelapp:color-mode`); su `<html>` finisce sempre il tema
*risolto*, in `data-color-mode="light|dark"`.

- `src/lib/theme.js` — lettura, scrittura e hook `useColorMode`
- `index.html` — lo stesso calcolo in uno script inline, eseguito prima del
  primo paint: senza, chi ha scelto lo scuro vedrebbe un lampo bianco
- `.on-dark` — riscrive i token della sola sezione: serve ai blocchi che
  restano scuri anche in tema chiaro (la sezione AI), come fa GitHub nelle sue
  pagine di prodotto

## Palette

Token in `src/index.css`, nomenclatura e valori di Primer. Il tema chiaro è il
default in `@theme`; quello scuro riscrive gli stessi token in un unico blocco.

| Token | Chiaro | Scuro | Uso |
| --- | --- | --- | --- |
| `canvas` | `#ffffff` | `#0d1117` | fondo pagina |
| `canvas-inset` | `#f6f8fa` | `#010409` | footer, blocchi incassati |
| `canvas-subtle` | `#f6f8fa` | `#151b23` | card |
| `canvas-overlay` / `canvas-raised` | `#ffffff` / `#eff2f5` | `#212830` / `#262c36` | menu, popover, hover |
| `fg` / `fg-muted` / `fg-subtle` | `#1f2328` / `#59636e` / `#6e7781` | `#f0f6fc` / `#9198a1` / `#656c76` | testo primario / secondario / terziario |
| `line` / `line-muted` | `#d1d9e0` / `#e4e8ec` | `#3d444d` / `#262c36` | bordi |
| `accent` | `#0969da` | `#4493f8` | link e accento primario |
| `success` / `success-emphasis` | `#1a7f37` / `#1f883d` | `#3fb950` / `#238636` | conferme, bottoni primari |
| `purple` / `attention` / `danger` / `orange` | `#8250df` / `#9a6700` / `#cf222e` / `#bc4c00` | `#ab7df8` / `#d29922` / `#f85149` / `#db6d28` | accenti tematici per sezione |
| `btn-*` | bottoni Primer (fondo, hover, bordo) | idem | `<Button />` |
| `code-*` | sintassi Primer light | sintassi Primer dark | `<CodeWindow />` |

## Pagina interattiva

`#/interattivo` ospita tre prove brevi, senza alcuna persistenza: **nessun
localStorage, nessun cookie, nessuna chiamata di rete**. Lo stato vive nei
componenti React, quindi ricaricare azzera tutto.

- `BugHunt` — trova la riga con il bug su codice evidenziato, quattro round
- `StackMemory` — otto coppie di tecnologie, carte che girano in 3D
- `LatencyMeter` — tempo di reazione, con la scala dei millisecondi

Domande e coppie stanno in `src/data/interactive.js`.
