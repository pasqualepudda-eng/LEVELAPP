/**
 * Contenuti della pagina interattiva: catalogo dei moduli per il costruttore
 * di gestionali e materiale dei tre giochi.
 *
 * Tutto quello che l'utente compone qui vive solo nello stato di React: non
 * tocchiamo localStorage, quindi a ogni ricaricamento la pagina riparte vuota.
 */

/* ------------------------------------------------------------------
   Tipi di software selezionabili
   ------------------------------------------------------------------ */

export const softwareTypes = [
  {
    id: 'erp',
    label: 'Gestionale / ERP',
    icon: 'layers',
    accent: 'var(--color-accent)',
    desc: 'Ordini, magazzino, commesse e amministrazione in un unico sistema.',
  },
  {
    id: 'crm',
    label: 'CRM commerciale',
    icon: 'graph',
    accent: 'var(--color-purple)',
    desc: 'Contatti, trattative e offerte per chi sta davanti al cliente.',
  },
  {
    id: 'mes',
    label: 'MES di produzione',
    icon: 'cpu',
    accent: 'var(--color-orange)',
    desc: 'Reparto, avanzamento, qualità e tracciabilità al pezzo.',
  },
  {
    id: 'portale',
    label: 'Portale B2B',
    icon: 'browser',
    accent: 'var(--color-pink)',
    desc: 'L’area riservata dove clienti e rivenditori fanno da soli.',
  },
]

/* ------------------------------------------------------------------
   Moduli. `kind` decide come viene disegnata l'anteprima del modulo:
   tabella, cruscotto, form, agenda, chat o terminale.
   ------------------------------------------------------------------ */

export const modules = [
  // Trasversali a tutti i tipi
  {
    id: 'anagrafiche',
    label: 'Anagrafiche',
    icon: 'users',
    kind: 'tabella',
    desc: 'Clienti, fornitori e sedi, una scheda sola per tutti i moduli.',
    types: ['erp', 'crm', 'mes', 'portale'],
  },
  {
    id: 'dashboard',
    label: 'Cruscotto',
    icon: 'graph',
    kind: 'cruscotto',
    desc: 'I numeri che guardi ogni lunedì mattina, aggiornati in tempo reale.',
    types: ['erp', 'crm', 'mes', 'portale'],
  },
  {
    id: 'permessi',
    label: 'Ruoli e permessi',
    icon: 'lock',
    kind: 'form',
    desc: 'Ogni reparto vede e modifica solo quello che gli compete.',
    types: ['erp', 'crm', 'mes', 'portale'],
  },
  {
    id: 'documenti',
    label: 'Archivio documenti',
    icon: 'book',
    kind: 'tabella',
    desc: 'Contratti, capitolati e allegati agganciati alla scheda giusta.',
    types: ['erp', 'crm', 'mes', 'portale'],
  },
  {
    id: 'assistente',
    label: 'Assistente AI',
    icon: 'sparkle',
    kind: 'chat',
    desc: 'Risponde sui tuoi documenti citando la fonte, con i permessi dell’utente.',
    types: ['erp', 'crm', 'mes', 'portale'],
  },
  {
    id: 'integrazioni',
    label: 'Integrazioni',
    icon: 'plug',
    kind: 'tabella',
    desc: 'API e webhook verso i sistemi che l’azienda usa già.',
    types: ['erp', 'crm', 'mes', 'portale'],
  },

  // Gestionale / ERP
  {
    id: 'ordini',
    label: 'Ordini',
    icon: 'file',
    kind: 'tabella',
    desc: 'Dal primo inserimento alla conferma, con disponibilità reale.',
    types: ['erp', 'portale'],
  },
  {
    id: 'magazzino',
    label: 'Magazzino',
    icon: 'layers',
    kind: 'tabella',
    desc: 'Giacenze, impegnato e movimenti, senza inventari paralleli.',
    types: ['erp', 'mes'],
  },
  {
    id: 'acquisti',
    label: 'Acquisti',
    icon: 'database',
    kind: 'tabella',
    desc: 'Richieste, ordini a fornitore e riordino automatico sotto scorta.',
    types: ['erp'],
  },
  {
    id: 'commesse',
    label: 'Commesse',
    icon: 'workflow',
    kind: 'cruscotto',
    desc: 'Ore, materiali e avanzamento raccolti sulla stessa scheda.',
    types: ['erp', 'mes'],
  },

  // CRM
  {
    id: 'lead',
    label: 'Contatti e lead',
    icon: 'users',
    kind: 'tabella',
    desc: 'Chi ti ha scritto, da dove arriva e chi lo sta seguendo.',
    types: ['crm'],
  },
  {
    id: 'trattative',
    label: 'Trattative',
    icon: 'graph',
    kind: 'cruscotto',
    desc: 'Pipeline per fase, con probabilità e prossima azione.',
    types: ['crm'],
  },
  {
    id: 'offerte',
    label: 'Offerte',
    icon: 'file',
    kind: 'form',
    desc: 'Configuratore di prodotto e regole di fattibilità già dentro.',
    types: ['crm', 'portale'],
  },
  {
    id: 'agenda',
    label: 'Agenda e attività',
    icon: 'clock',
    kind: 'agenda',
    desc: 'Visite, call e solleciti sincronizzati con il calendario aziendale.',
    types: ['crm'],
  },
  {
    id: 'firma',
    label: 'Firma digitale',
    icon: 'verified',
    kind: 'form',
    desc: 'Il cliente firma dal tablet e la pratica si apre da sola.',
    types: ['crm', 'portale'],
  },

  // MES
  {
    id: 'odl',
    label: 'Ordini di lavoro',
    icon: 'workflow',
    kind: 'tabella',
    desc: 'Cosa si produce oggi, su quale macchina e con che priorità.',
    types: ['mes'],
  },
  {
    id: 'terminale',
    label: 'Terminale di reparto',
    icon: 'terminal',
    kind: 'terminale',
    desc: 'Pochi tasti grandi: avanzamento e fermi si registrano coi guanti.',
    types: ['mes'],
  },
  {
    id: 'qualita',
    label: 'Controllo qualità',
    icon: 'verified',
    kind: 'form',
    desc: 'Piani di controllo, misure e non conformità a bordo macchina.',
    types: ['mes'],
  },
  {
    id: 'tracciabilita',
    label: 'Tracciabilità',
    icon: 'search',
    kind: 'tabella',
    desc: 'Ogni pezzo porta con sé macchina, operatore e parametri.',
    types: ['mes'],
  },
  {
    id: 'manutenzioni',
    label: 'Manutenzioni',
    icon: 'tools',
    kind: 'agenda',
    desc: 'Preventive e a guasto, con storico per singolo impianto.',
    types: ['mes', 'erp'],
  },

  // Portale B2B
  {
    id: 'catalogo',
    label: 'Catalogo',
    icon: 'browser',
    kind: 'tabella',
    desc: 'Schede prodotto e disponibilità aggiornate dal gestionale.',
    types: ['portale'],
  },
  {
    id: 'spedizioni',
    label: 'Stato spedizioni',
    icon: 'rocket',
    kind: 'tabella',
    desc: 'Tracking e documenti di trasporto, senza telefonate all’ufficio.',
    types: ['portale', 'erp'],
  },
  {
    id: 'ticket',
    label: 'Assistenza',
    icon: 'comment',
    kind: 'chat',
    desc: 'Richieste dei clienti con storico, priorità e tempi di risposta.',
    types: ['portale', 'crm'],
  },
]

/* ------------------------------------------------------------------
   Gioco 1 — Trova il bug
   ------------------------------------------------------------------ */

export const bugRounds = [
  {
    filename: 'totali.ts',
    lines: [
      'export function totaleRighe(righe: Riga[]) {',
      '  let totale = 0',
      '  for (let i = 0; i <= righe.length; i++) {',
      '    totale += righe[i].quantita',
      '  }',
      '  return totale',
      '}',
    ],
    buggy: 2,
    explanation:
      'Il ciclo arriva fino a `righe.length` incluso: all’ultimo giro `righe[i]` non esiste e il codice esplode. Va usato `<` al posto di `<=`.',
  },
  {
    filename: 'sincronizza.ts',
    lines: [
      'async function sincronizza(ordini: Ordine[]) {',
      '  const esiti = ordini.map(async (o) => erp.invia(o))',
      '',
      '  return esiti',
      '}',
    ],
    buggy: 3,
    explanation:
      '`map` con una funzione asincrona restituisce un array di Promise, non di risultati. Serve `return await Promise.all(esiti)`, altrimenti il chiamante prosegue prima che l’invio sia finito.',
  },
  {
    filename: 'utenti.ts',
    lines: [
      'const utenti = await db.utenti.find({ ruolo })',
      '',
      'if (utenti.length = 0) {',
      '  return []',
      '}',
      '',
      'return utenti.map(toDto)',
    ],
    buggy: 2,
    explanation:
      'Un uguale solo: è un’assegnazione, non un confronto. `utenti.length` viene azzerato e la condizione è sempre falsa. Va scritto `utenti.length === 0`.',
  },
  {
    filename: 'media.rs',
    lines: [
      'pub fn media(valori: &[f64]) -> f64 {',
      '    let somma: f64 = valori.iter().sum();',
      '',
      '    somma / valori.len() as f64',
      '}',
      '',
      '// chiamata con uno slice vuoto: 0.0 / 0.0',
    ],
    buggy: 3,
    explanation:
      'Con uno slice vuoto la divisione dà `NaN`, che poi si propaga in tutti i report. In Rust la firma onesta è `Option<f64>`, restituendo `None` quando non ci sono valori.',
  },
]

/* ------------------------------------------------------------------
   Gioco 2 — Memory dello stack (otto coppie)

   `icon` è un simbolo del nostro set 16×16 (components/ui/Icon.jsx), disegnato
   nello stile del sito: non è il marchio ufficiale della tecnologia.

   Per usare i loghi veri — avendone il diritto — metti il file in
   `public/tech/` e valorizza `logo`: la carta userà quello al posto del
   simbolo, senza altre modifiche al codice.
   ------------------------------------------------------------------ */

export const memoryTechs = [
  { nome: 'Rust', icon: 'gear', tinta: 'var(--color-orange)', logo: null },
  { nome: 'React', icon: 'atom', tinta: 'var(--color-accent)', logo: null },
  { nome: 'TypeScript', icon: 'code', tinta: 'var(--color-accent)', logo: null },
  { nome: 'PostgreSQL', icon: 'database', tinta: 'var(--color-purple)', logo: null },
  { nome: 'Docker', icon: 'container', tinta: 'var(--color-accent)', logo: null },
  { nome: 'Python', icon: 'snake', tinta: 'var(--color-attention)', logo: null },
  { nome: 'Redis', icon: 'layers', tinta: 'var(--color-danger)', logo: null },
  { nome: 'GitHub Actions', icon: 'github', tinta: 'var(--color-success)', logo: null },
]
