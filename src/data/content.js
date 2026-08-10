/**
 * Tutti i testi del sito in un unico posto.
 * Sostituisci i valori segnati con TODO con i dati reali di LevelApp.
 */

export const company = {
  name: 'LevelApp',
  claim: 'Software house',
  payoff: 'Portiamo il tuo business al livello successivo.',
  phone: '+39 000 000 0000', // TODO: numero reale
  phoneHref: 'tel:+390000000000',
  email: 'info@levelapp.it', // TODO: email reale
  vat: 'P.IVA 00000000000', // TODO
  founded: 2022,
  foundedIn: 'Roma',
  offices: [
    // La prima è la sede storica: LevelApp è nata qui. TODO: indirizzi reali.
    { city: 'Roma', address: 'Via Esempio, 12', zip: '00184 Roma (RM)' },
    { city: 'Milano', address: 'Viale Esempio, 4', zip: '20121 Milano (MI)' },
  ],
  socials: [
    { label: 'LinkedIn', href: '#', icon: 'linkedin' }, // TODO
    { label: 'Instagram', href: '#', icon: 'instagram' }, // TODO
    { label: 'GitHub', href: '#', icon: 'github' }, // TODO
  ],
}

/* ------------------------------------------------------------------
   Navigazione
   ------------------------------------------------------------------ */

/**
 * Voci della barra di navigazione. Quelle con `columns` aprono un pannello a
 * più colonne (icona + titolo + descrizione per riga) e possono avere una card
 * promozionale a destra: è la struttura dei menu di github.com.
 */
export const nav = [
  {
    label: 'Servizi',
    to: '/servizi',
    columns: [
      {
        title: 'Costruiamo',
        items: [
          {
            label: 'Dalla tua idea al prodotto',
            to: '/servizi/prodotto',
            icon: 'lightbulb',
            desc: 'MVP in produzione in quattro settimane',
          },
          {
            label: 'Software gestionale',
            to: '/servizi/gestionale',
            icon: 'layers',
            desc: 'ERP, CRM e MES sul tuo flusso di lavoro',
          },
          {
            label: 'Web app & piattaforme',
            to: '/servizi/web-app',
            icon: 'browser',
            desc: 'Portali, aree riservate, configuratori',
          },
          {
            label: 'Siti web ed e-commerce',
            to: '/servizi/siti-web',
            icon: 'globe',
            desc: 'Veloci, indicizzabili, aggiornabili da te',
          },
          {
            label: 'App mobile',
            to: '/servizi/mobile',
            icon: 'mobile',
            desc: 'iOS e Android da un solo codebase',
          },
          {
            label: 'AI applicata',
            to: '/servizi/ai',
            icon: 'sparkle',
            desc: 'Assistenti e automazioni sui tuoi dati',
          },
        ],
      },
    ],
    promo: {
      title: 'Analisi senza impegno',
      desc: 'Mezz’ora con chi svilupperà il progetto: capiamo il perimetro e ti diciamo se siamo la scelta giusta.',
      cta: 'Prenota una call',
      to: '/contatti',
    },
  },
  {
    label: 'Progetti',
    to: '/progetti',
    columns: [
      {
        title: 'Case study',
        items: [
          {
            label: 'CRM · Novaform',
            to: '/progetti/crm',
            icon: 'graph',
            desc: 'Preventivi da 3 giorni a 20 minuti',
          },
          {
            label: 'ERP · Arkadia',
            to: '/progetti/erp',
            icon: 'layers',
            desc: 'Nove sistemi sostituiti da uno',
          },
          {
            label: 'MES · Officine V',
            to: '/progetti/mes',
            icon: 'cpu',
            desc: 'Produzione tracciata al pezzo, zero carta',
          },
          {
            label: 'Tutti i progetti',
            to: '/progetti',
            icon: 'book',
            desc: 'Settori, durate e risultati misurati',
          },
        ],
      },
    ],
  },
  {
    label: 'Azienda',
    to: '/azienda',
    columns: [
      {
        title: 'LevelApp',
        items: [
          {
            label: 'Chi siamo',
            to: '/azienda',
            icon: 'users',
            desc: 'Oltre 24 sviluppatori tra Roma e Milano',
          },
          {
            label: 'Valori',
            to: '/azienda#valori',
            icon: 'shield',
            desc: 'Nessun lock-in, perimetro nero su bianco',
          },
          {
            label: 'Tappe',
            to: '/azienda#storia',
            icon: 'clock',
            desc: 'Dal 2022 a oggi',
          },
          {
            label: 'Lavora con noi',
            to: '/azienda#team',
            icon: 'briefcase',
            desc: 'Come è fatto il team',
          },
        ],
      },
    ],
  },
  { label: 'Interattivo', to: '/interattivo' },
  { label: 'Contatti', to: '/contatti' },
]

export const footerLinks = [
  {
    title: 'Servizi',
    links: [
      { label: 'Dalla tua idea al prodotto', to: '/servizi/prodotto' },
      { label: 'Software gestionale', to: '/servizi/gestionale' },
      { label: 'Web app & piattaforme', to: '/servizi/web-app' },
      { label: 'Siti web ed e-commerce', to: '/servizi/siti-web' },
      { label: 'App mobile', to: '/servizi/mobile' },
      { label: 'AI applicata', to: '/servizi/ai' },
    ],
  },
  {
    title: 'Progetti',
    links: [
      { label: 'Tutti i case study', to: '/progetti' },
      { label: 'CRM · Novaform', to: '/progetti/crm' },
      { label: 'ERP · Arkadia', to: '/progetti/erp' },
      { label: 'MES · Officine V', to: '/progetti/mes' },
    ],
  },
  {
    title: 'Azienda',
    links: [
      { label: 'Chi siamo', to: '/azienda' },
      { label: 'Il metodo', to: '/azienda#metodo' },
      { label: 'Lavora con noi', to: '/azienda#team' },
      { label: 'Contatti', to: '/contatti' },
    ],
  },
  {
    title: 'Risorse',
    links: [
      { label: 'Costruisci il tuo gestionale', to: '/interattivo' },
      { label: 'Domande frequenti', to: '/contatti#faq' },
      { label: 'Stack tecnologico', to: '/azienda#stack' },
      { label: 'Integrazioni', to: '/servizi#integrazioni' },
      { label: 'Parliamo del tuo progetto', to: '/contatti' },
    ],
  },
]

// TODO: sostituire con le pagine legali reali.
export const legalLinks = [
  { label: 'Privacy policy', href: '#' },
  { label: 'Cookie policy', href: '#' },
  { label: 'Termini di servizio', href: '#' },
]

/* ------------------------------------------------------------------
   Home
   ------------------------------------------------------------------ */

export const heroBullets = [
  'Dall’idea al prodotto in 4 settimane',
  'Codice esclusivo, mai rivenduto',
  'Proprietà intellettuale tua',
  'Team di ingegneria in Italia',
]

export const heroStats = [
  { value: 200, suffix: '+', label: 'progetti attivi' },
  { value: 70, suffix: '+', label: 'clienti seguiti' },
  { value: 99.9, suffix: '%', label: 'uptime medio', decimals: 1 },
]

/**
 * Piattaforme e tecnologie mostrate nella fascia della home.
 *
 * `icon` è un simbolo del nostro set 16×16 (components/ui/Icon.jsx) disegnato
 * nello stile del sito: NON è il marchio ufficiale. Per usare i loghi veri —
 * avendone il diritto — metti l'SVG in `public/tech/` e valorizza `logo`.
 *
 * TODO: verifica di poter usare il termine "partner" per ognuna di queste
 * aziende. Se non ci sono accordi formali, cambia il titolo della sezione in
 * qualcosa come "Tecnologie con cui lavoriamo" (sections/Partners.jsx).
 */
export const partners = [
  { nome: 'GitHub', icon: 'github', logo: null },
  { nome: 'Vercel', icon: 'triangle', logo: null },
  { nome: 'Next.js', icon: 'disc', logo: null },
  { nome: 'React', icon: 'atom', logo: null },
  { nome: 'JavaScript', icon: 'braces', logo: null },
  { nome: 'TypeScript', icon: 'code', logo: null },
  { nome: 'Node.js', icon: 'hexagon', logo: null },
  { nome: 'AWS', icon: 'cloud', logo: null },
  { nome: 'Oracle', icon: 'database', logo: null },
  { nome: 'MySQL', icon: 'serverStack', logo: null },
  { nome: 'PlanetScale', icon: 'planet', logo: null },
  { nome: 'Convex', icon: 'cpu', logo: null },
  { nome: 'Clerk', icon: 'lock', logo: null },
  { nome: 'Docker', icon: 'container', logo: null },
  { nome: 'PostgreSQL', icon: 'database', logo: null },
  { nome: 'Rust', icon: 'gear', logo: null },
]

export const clients = [
  'Novaform',
  'Arkadia',
  'Nexus Group',
  'Delfino Lab',
  'Officine V',
  'Marea',
  'Poliedra',
  'Sintesi',
  'Vertica',
  'Tramonta',
  'BluOnda',
  'Kimera',
]

export const pillars = [
  {
    id: 'proprieta',
    index: '01',
    icon: 'lock',
    title: 'Il software resta un tuo asset.',
    body: 'Repository, dati e infrastruttura sono intestati alla tua azienda dal primo commit. Alla consegna ricevi tutto — codice, cronologia, documentazione, credenziali, pipeline di rilascio — e resti libero di proseguire con noi, portare lo sviluppo in casa o affidarlo a chi preferisci.',
    points: [
      'Repository e proprietà intellettuale intestati a te',
      'Documentazione di consegna completa',
      'Nessuna dipendenza tecnica dal fornitore',
    ],
    accent: 'var(--color-accent)',
  },
  {
    id: 'ingegneria',
    index: '02',
    icon: 'cpu',
    title: 'Ingegneria, non assemblaggio.',
    body: 'I servizi critici li scriviamo in Rust, il resto in TypeScript: tipi forti, test automatici e revisione del codice su ogni modifica. È la differenza tra un software che regge il quinto anno di esercizio e uno che regge la demo del primo mese.',
    points: [
      'Rust dove servono affidabilità e performance',
      'Test e revisione del codice su ogni modifica',
      'Soglie di performance verificate a ogni rilascio',
    ],
    accent: 'var(--color-purple)',
  },
  {
    id: 'integrazioni',
    index: '03',
    icon: 'plug',
    title: 'Si innesta su quello che hai già.',
    body: 'Gestionali storici, e-commerce, CRM, fatturazione, magazzino, business intelligence. Colleghiamo il nuovo all’esistente con API e webhook e, dove il sistema di ieri frena l’azienda, lo modernizziamo un pezzo alla volta senza fermare l’operatività.',
    points: [
      'API REST e webhook documentati',
      'Sincronizzazioni bidirezionali e tracciate',
      'Modernizzazione progressiva dei sistemi storici',
    ],
    accent: 'var(--color-success)',
  },
]

/* ------------------------------------------------------------------
   Servizi — ogni voce ha una pagina di dettaglio: /servizi/{slug}
   ------------------------------------------------------------------ */

export const services = [
  {
    slug: 'prodotto',
    icon: 'lightbulb',
    accent: 'var(--color-attention)',
    tempi: 'MVP nelle mani dei primi utenti in 4 settimane',
    title: 'Dalla tua idea al prodotto',
    short: 'Hai un’idea di software: la trasformiamo in un prodotto vero, non in una presentazione.',
    tags: ['MVP', 'Prodotto', 'Scale-up'],
    hero: 'Hai l’idea. Noi la mettiamo in produzione.',
    intro:
      'Molti dei progetti che facciamo non nascono da un processo da sistemare, ma da un’intuizione: un servizio che nel tuo settore non esiste ancora, un modo diverso di far lavorare i clienti, una competenza che oggi vendi come consulenza e potrebbe diventare software. Si parte da lì e in quattro settimane l’idea è un prodotto funzionante davanti ai primi utenti, non un documento di specifiche.',
    highlights: [
      {
        title: 'Prima gli utenti, poi il codice',
        body: 'Pochi giorni per capire chi lo userà, cosa fa oggi al posto tuo e quale pezzo vale la pena costruire per primo. Tagliamo tutto il resto: le funzioni “che serviranno di sicuro” sono il motivo per cui i prodotti nuovi escono con un anno di ritardo.',
      },
      {
        title: 'Un MVP che regge il traffico vero',
        body: 'Non un prototipo da buttare: l’MVP nasce sull’architettura del prodotto finale — servizi Rust dove serve reggere, cloud europeo, monitoraggio dal primo giorno. Quando funziona si scala, non si riscrive.',
      },
      {
        title: 'La proprietà intellettuale è tua',
        body: 'Codice, marchio e dati restano intestati alla tua azienda: nessuna quota nel capitale, nessuna royalty, nessun vincolo con noi. Se il prodotto decolla, decolla per te.',
      },
      {
        title: 'Si misura, poi si decide',
        body: 'Dal primo giorno online raccogliamo i numeri che contano davvero — chi torna, dove si blocca, cosa non usa nessuno — e la settimana dopo si taglia o si raddoppia su quello che funziona.',
      },
    ],
    deliverables: [
      'Definizione del prodotto e dei primi utenti',
      'Prototipo navigabile in pochi giorni',
      'MVP in produzione entro la quarta settimana',
      'Architettura pronta a scalare, non da riscrivere',
      'Cruscotto di utilizzo e metriche di attivazione',
      'Codice, marchio e infrastruttura intestati a te',
    ],
    stack: ['Rust', 'React', 'TypeScript', 'PostgreSQL', 'Cloud EU'],
    faqs: [
      {
        q: 'Non ho un’idea definita, solo un’intuizione.',
        a: 'È il caso più frequente, ed è il motivo per cui la prima settimana non si scrive codice: si capisce chi ha il problema, cosa fa oggi per aggirarlo e quale pezzo vale la pena costruire per primo. Se l’idea non sta in piedi te lo diciamo lì, non dopo sei mesi di sviluppo.',
      },
      {
        q: 'Entrate nel capitale o chiedete una percentuale?',
        a: 'No, lavoriamo come fornitori: il prodotto è tuo al 100%, codice compreso. Se in seguito vuoi portare lo sviluppo in casa, ti aiutiamo a costruire il team invece di trattenerti.',
      },
    ],
    code: {
      filename: 'onboarding.ts',
      lines: [
        'export async function primoAccesso(utente: Utente) {',
        '  await metriche.traccia("attivazione", { canale: utente.canale })',
        '',
        '  // Il valore si deve vedere al primo accesso, non dopo la configurazione',
        '  const spazio = await crea.spazioDiProva(utente)',
        '  await invita.colleghi(spazio, utente.team)',
        '',
        '  return spazio.url',
        '}',
      ],
    },
  },
  {
    slug: 'gestionale',
    icon: 'layers',
    accent: 'var(--color-accent)',
    tempi: 'Primo modulo in 4 settimane, poi uno ogni 2',
    title: 'Software gestionale su misura',
    short: 'ERP, CRM e MES costruiti sul tuo ciclo: preventivi, ordini, magazzino, commesse.',
    tags: ['ERP', 'CRM', 'MES'],
    hero: 'Il gestionale che assomiglia alla tua azienda',
    intro:
      'Non un prodotto da configurare per mesi: partiamo dal processo che ti sta bloccando davvero — la preventivazione, il magazzino, l’avanzamento delle commesse — e lo mandiamo in produzione in quattro settimane, collegato ai dati che hai già. I moduli successivi arrivano uno alla volta, mentre l’azienda continua a lavorare.',
    highlights: [
      {
        title: 'Prima il collo di bottiglia',
        body: 'Nell’analisi si sceglie un processo solo: quello che oggi costa più ore. In quattro settimane è in produzione e misurabile, invece di scoprire a rilascio completo se la direzione era giusta.',
      },
      {
        title: 'Un dato solo, ovunque',
        body: 'Anagrafiche, listini e giacenze vivono in un posto e si sincronizzano con fatturazione elettronica, contabilità ed e-commerce. Le doppie imputazioni e gli Excel paralleli spariscono col primo rilascio.',
      },
      {
        title: 'Regge i numeri veri',
        body: 'Il motore che calcola disponibilità, marginalità e fabbisogni è scritto in Rust: risponde in millisecondi su anni di storico e non rallenta man mano che il database cresce.',
      },
      {
        title: 'Permessi per ruolo',
        body: 'Direzione, amministrazione, produzione e rete vendita hanno viste e azioni diverse sullo stesso database, con la traccia di chi ha modificato cosa e quando.',
      },
    ],
    deliverables: [
      'Analisi del processo scelto e piano di rilascio',
      'Prototipo navigabile prima dello sviluppo',
      'Modulo in produzione entro la quarta settimana',
      'Migrazione dei dati esistenti, provata due volte',
      'Integrazioni con i sistemi già in uso',
      'Formazione dei reparti e manuale operativo',
    ],
    stack: ['Rust', 'TypeScript', 'React', 'PostgreSQL', 'Docker', 'Cloud EU'],
    faqs: [
      {
        q: 'Quattro settimane per un gestionale sono credibili?',
        a: 'Quattro settimane sono per il primo modulo in produzione, non per l’intero sistema. Si sceglie un processo, si taglia tutto quello che non serve a farlo funzionare e si rilascia. Da lì esce un modulo ogni due settimane, e ognuno entra in esercizio appena è pronto invece di aspettare un go-live unico.',
      },
      {
        q: 'Potete migrare i dati dal gestionale attuale?',
        a: 'Sì. Analizziamo il database o gli export esistenti, scriviamo gli script di migrazione e facciamo due prove complete prima del passaggio: il go-live occupa una giornata, non un fine settimana di emergenze.',
      },
    ],
    caseSlug: 'erp',
    code: {
      filename: 'ordini.service.ts',
      lines: [
        'export async function confermaOrdine(id: string) {',
        '  const ordine = await db.ordini.find(id)',
        '',
        '  // Disponibilità reale: giacenza meno impegnato',
        '  const mancanti = await magazzino.verifica(ordine.righe)',
        '  if (mancanti.length) return richiediApprovvigionamento(mancanti)',
        '',
        '  await db.ordini.update(id, { stato: "confermato" })',
        '  await erp.sincronizza(ordine)',
        '  return notifica(ordine.commerciale, "Ordine confermato")',
        '}',
      ],
    },
  },
  {
    slug: 'web-app',
    icon: 'code',
    accent: 'var(--color-purple)',
    tempi: 'Portale online in 3 settimane',
    title: 'Web app & piattaforme',
    short: 'Portali B2B, aree riservate e configuratori che tolgono lavoro dalle email.',
    tags: ['React', 'Rust', 'Cloud'],
    hero: 'La piattaforma che toglie il lavoro manuale dalle email',
    intro:
      'Ordini che arrivano via email e vengono ribattuti a mano, un listino diverso per ogni cliente, richieste di stato che diventano telefonate all’ufficio. Una piattaforma web sposta tutto questo dove clienti e agenti fanno da soli — ordini, documenti, spedizioni — con le regole commerciali già dentro e i dati che tornano nel gestionale.',
    highlights: [
      {
        title: 'Self-service per chi compra',
        body: 'Rivenditori e agenti entrano con le proprie credenziali, vedono il loro listino e i loro documenti e ordinano senza passare dal centralino. L’ufficio interno smette di fare da tramite.',
      },
      {
        title: 'Veloce anche sotto carico',
        body: 'Soglie di performance fissate a inizio progetto e verificate a ogni rilascio. Il cuore applicativo gira su servizi Rust: prima interazione sotto il secondo anche in 4G e con il catalogo pieno.',
      },
      {
        title: 'Accessibile per contratto',
        body: 'Contrasto, navigazione da tastiera, screen reader e focus visibile. Non è un extra di fine progetto: è il modo in cui scriviamo i componenti fin dal prototipo.',
      },
    ],
    deliverables: [
      'Prototipo navigabile dei flussi principali',
      'Piattaforma responsive e accessibile',
      'API documentate (OpenAPI) verso i tuoi sistemi',
      'Pipeline di rilascio e ambiente di collaudo',
      'Monitoraggio, log e allerta sugli errori',
      'Documentazione tecnica e passaggio di consegne',
    ],
    stack: ['Rust', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'GitHub Actions'],
    faqs: [
      {
        q: 'Funziona anche offline o su rete lenta?',
        a: 'Le aree critiche possono essere progettate come PWA con cache locale e coda di sincronizzazione: si continua a lavorare e i dati partono appena la rete torna.',
      },
      {
        q: 'Chi mantiene la piattaforma dopo il rilascio?',
        a: 'Puoi restare con noi, internalizzare o cambiare fornitore: il codice usa tecnologie diffuse ed è documentato proprio perché la scelta resti tua.',
      },
    ],
    caseSlug: 'crm',
    code: {
      filename: 'api/portale.ts',
      lines: [
        'import { router } from "./core"',
        '',
        'router.get("/ordini", async (req, res) => {',
        '  const cliente = await auth.cliente(req)',
        '  const ordini = await db.ordini.byCliente(cliente.id, {',
        '    limit: 50,',
        '    include: ["spedizioni", "documenti"],',
        '  })',
        '  res.json({ ordini })',
        '})',
      ],
    },
  },
  {
    slug: 'siti-web',
    icon: 'globe',
    accent: 'var(--color-pink)',
    tempi: 'Vetrina in 5 giorni, negozio in 2 settimane',
    title: 'Siti web ed e-commerce',
    short: 'Siti e negozi online veloci, collegati al gestionale e aggiornabili da te.',
    tags: ['CMS', 'E-commerce', 'SEO'],
    hero: 'Online in cinque giorni, poi lo aggiorni senza chiamarci',
    intro:
      'È il progetto più rapido che facciamo: una vetrina va online in cinque giorni lavorativi, un negozio completo in due settimane. Il negozio prende prodotti, prezzi e disponibilità dal gestionale invece di avere un magazzino parallelo, e il pannello di gestione è costruito sui tuoi contenuti reali — ci scrive dentro il tuo team, non noi.',
    highlights: [
      {
        title: 'Il catalogo è quello vero',
        body: 'Prodotti, listini e giacenze arrivano dal gestionale via API: niente allineamenti a mano, niente ordini presi su articoli finiti. Chi compra vede la disponibilità di adesso.',
      },
      {
        title: 'Veloce anche in 4G',
        body: 'Pagine servite già pronte, immagini ottimizzate e nessuno script inutile. I tempi di caricamento sono un requisito del progetto, misurato a ogni rilascio: sulle vetrine è la prima causa di abbandono.',
      },
      {
        title: 'I contenuti sono tuoi',
        body: 'Un CMS con i campi che servono a te, non un editor generico: chi scrive non può rompere la grafica e una pagina nuova va online in un minuto.',
      },
      {
        title: 'Trovabile dal primo giorno',
        body: 'Struttura, dati strutturati, metadati e redirect dal vecchio sito curati in fase di rilascio, così il traffico già acquisito non si perde nel passaggio.',
      },
    ],
    deliverables: [
      'Progettazione delle pagine e dei contenuti',
      'Sito o negozio responsive e accessibile',
      'CMS con campi su misura e ruoli',
      'Catalogo sincronizzato con il gestionale',
      'Pagamenti, spedizioni e email transazionali',
      'SEO tecnica, redirect e tracciamento conversioni',
    ],
    stack: ['Astro', 'React', 'TypeScript', 'CMS headless', 'Stripe', 'Cloud EU'],
    faqs: [
      {
        q: 'Davvero un e-commerce in due settimane?',
        a: 'Sì, ed è il motivo per cui lo consigliamo come primo progetto insieme: catalogo, pagamenti e spedizioni sono problemi già risolti, il lavoro vero è collegarli ai tuoi dati e alle tue regole. Se servono configuratori di prodotto o logiche di prezzo complesse i tempi salgono, e te lo diciamo in analisi.',
      },
      {
        q: 'Rifate anche siti già esistenti?',
        a: 'Spesso sì. Partiamo da quello che c’è — contenuti, posizionamento, indirizzi delle pagine — e lo portiamo sul nuovo sito mantenendo i redirect, così le posizioni guadagnate su Google non si azzerano al cambio.',
      },
    ],
    code: {
      filename: 'contenuti.ts',
      lines: [
        'export async function getPagina(slug: string) {',
        '  const pagina = await cms.pagine.bySlug(slug)',
        '',
        '  if (!pagina) return notFound()',
        '',
        '  return {',
        '    titolo: pagina.titolo,',
        '    seo: costruisciSeo(pagina),   // title, description, OG',
        '    blocchi: pagina.blocchi,      // testi, gallerie, moduli',
        '  }',
        '}',
      ],
    },
  },
  {
    slug: 'mobile',
    icon: 'mobile',
    accent: 'var(--color-orange)',
    tempi: '4 settimane su entrambi gli store',
    title: 'App mobile',
    short: 'App per rete vendita e tecnici in campo, che funzionano anche senza rete.',
    tags: ['iOS', 'Android', 'Offline'],
    hero: 'Lo strumento di chi lavora fuori dall’ufficio',
    intro:
      'Il tecnico che compila il rapportino in cantiere, l’agente che prende l’ordine dal cliente, il magazziniere che scansiona i colli in partenza. Un unico codebase genera le build native per iOS e Android, con la logica scritta una volta sola: una squadra da mantenere invece di due, e nessuna funzione che arriva su una piattaforma sei mesi dopo l’altra.',
    highlights: [
      {
        title: 'Lavora anche senza campo',
        body: 'Dati in locale e sincronizzazione differita: il rapportino si compila in cantiere e risale appena torna la connessione, senza che nessuno debba ricordarsi di rifarlo.',
      },
      {
        title: 'Usa l’hardware del dispositivo',
        body: 'Fotocamera, scanner di codici a barre, GPS, firma grafometrica, notifiche push e sblocco biometrico: quello che serve davvero sul campo, non un sito dentro una app.',
      },
      {
        title: 'Pubblicazione gestita',
        body: 'Certificati, schede store, revisioni e aggiornamenti li seguiamo noi, dalla prima submission ai rilasci successivi. Gli account restano intestati alla tua azienda.',
      },
    ],
    deliverables: [
      'App iOS e Android da un solo codebase',
      'Modalità offline con coda di sincronizzazione',
      'Notifiche push segmentate per ruolo',
      'Distribuzione su App Store e Play Store',
      'Crash reporting e statistiche di utilizzo',
      'Aggiornamenti over-the-air per le correzioni',
    ],
    stack: ['React Native', 'Expo', 'TypeScript', 'Rust (core condiviso)', 'SQLite'],
    faqs: [
      {
        q: 'Serve davvero un’app o basta il sito?',
        a: 'Se non ti servono hardware del dispositivo, uso offline o notifiche push, spesso basta una web app: si aggiorna da sola e non passa dagli store a ogni rilascio. Se l’app non serve, te lo diciamo in analisi.',
      },
      {
        q: 'Gestite voi gli account degli store?',
        a: 'Sì, se vuoi. Consigliamo comunque di intestarli alla tua azienda: le app restano tue anche se un domani cambi fornitore.',
      },
    ],
    caseSlug: 'mes',
    code: {
      filename: 'RapportinoScreen.tsx',
      lines: [
        'export function RapportinoScreen({ commessa }) {',
        '  const { salva, inCoda } = useSyncQueue("rapportini")',
        '',
        '  // Offline first: si salva in locale, parte quando c\'è rete',
        '  async function onSubmit(dati) {',
        '    await salva({ ...dati, commessa: commessa.id })',
        '    toast("Rapportino salvato")',
        '  }',
        '',
        '  return <Form onSubmit={onSubmit} badge={inCoda} />',
        '}',
      ],
    },
  },
  {
    slug: 'ai',
    icon: 'sparkle',
    accent: 'var(--color-success)',
    tempi: 'Primo assistente in 10 giorni lavorativi',
    title: 'AI applicata',
    short: 'Assistenti sui tuoi documenti ed estrazione dati, con la fonte sempre citata.',
    tags: ['LLM', 'RAG', 'Automazioni'],
    hero: 'AI che lavora sui tuoi dati, non su Internet',
    intro:
      'Non chatbot generici: assistenti addestrati sulle tue procedure, sui tuoi listini e sul tuo archivio documentale, con gli stessi permessi del gestionale e ogni risposta corredata dalla fonte. Si parte da un caso solo — le condizioni contrattuali, le fatture fornitore, le richieste di assistenza — e in dieci giorni lavorativi è in mano alle persone che ci lavorano.',
    highlights: [
      {
        title: 'Risposte con la fonte',
        body: 'Ogni risposta cita documento e paragrafo da cui arriva. Chi legge verifica in un clic, e l’assistente smette di essere una scatola nera di cui nessuno si fida.',
      },
      {
        title: 'Documenti che si leggono da soli',
        body: 'Fatture, DDT, contratti e capitolati diventano dati strutturati e finiscono nel gestionale senza data entry: è il punto dove il ritorno si vede prima.',
      },
      {
        title: 'Dati che restano tuoi',
        body: 'Elaborazione su infrastruttura europea, nessun addestramento dei modelli sui tuoi contenuti, log completo di ogni richiesta e possibilità di cancellare l’indice quando vuoi.',
      },
    ],
    deliverables: [
      'Indicizzazione dell’archivio documentale',
      'Assistente con controllo dei permessi',
      'Estrazione dati dai documenti ricorrenti',
      'Automazioni sugli eventi del gestionale',
      'Valutazione della qualità delle risposte',
      'Dashboard di utilizzo e qualità',
    ],
    stack: ['Rust', 'Python', 'Claude API', 'pgvector', 'Cloud EU'],
    faqs: [
      {
        q: 'I nostri documenti finiscono in pasto ai modelli?',
        a: 'No. Usiamo fornitori che non addestrano sui dati inviati via API, l’elaborazione avviene in Europa e puoi cancellare l’indice quando vuoi.',
      },
      {
        q: 'E se l’assistente sbaglia?',
        a: 'Ogni risposta porta le fonti, le domande fuori perimetro ricevono un “non lo so” esplicito e le azioni sensibili richiedono sempre conferma umana. In fase di collaudo misuriamo la qualità su un campione di domande reali, non su esempi scelti da noi.',
      },
    ],
    caseSlug: 'crm',
    code: {
      filename: 'assistente.py',
      lines: [
        'def rispondi(domanda: str, utente: Utente):',
        '    # Solo i documenti che l\'utente può già vedere',
        '    fonti = indice.cerca(domanda, permessi=utente.ruoli, top_k=6)',
        '',
        '    if not fonti:',
        '        return "Non trovo questa informazione nei documenti."',
        '',
        '    risposta = modello.completa(domanda, contesto=fonti)',
        '    return risposta.con_citazioni(fonti)',
      ],
    },
  },
]

export const aiFeatures = [
  {
    title: 'Agenti su misura',
    icon: 'sparkle',
    desc: 'Assistenti addestrati sui tuoi documenti e sulle tue procedure, con permessi e tracciamento delle fonti.',
  },
  {
    title: 'Documenti che si leggono da soli',
    icon: 'file',
    desc: 'Fatture, DDT, contratti e capitolati estratti in dati strutturati e riversati nel gestionale.',
  },
  {
    title: 'Automazioni intelligenti',
    icon: 'zap',
    desc: 'Smistamento richieste, risposte suggerite, controlli di coerenza: il lavoro ripetitivo sparisce.',
  },
]

/* ------------------------------------------------------------------
   Case study — pagina di dettaglio: /progetti/{id}
   ------------------------------------------------------------------ */

export const cases = [
  {
    id: 'crm',
    kicker: 'Case study — CRM',
    type: 'CRM',
    client: 'Novaform',
    sector: 'Arredamento su misura',
    year: '2024',
    duration: '4 settimane',
    team: '4 persone',
    title: 'Preventivi in 20 minuti, non più in 3 giorni',
    body: 'Abbiamo unificato listini, configuratore di prodotto e firma digitale in un unico CRM. La rete vendita compila un’offerta dal tablet e il cliente la firma prima di uscire dall’appuntamento.',
    quote:
      'Prima un preventivo complesso richiedeva giorni e tre persone. Oggi lo chiude un commerciale in venti minuti.',
    author: 'Direzione commerciale, Novaform',
    metrics: [
      { value: 68, suffix: '%', label: 'tempo di preventivazione' },
      { value: 31, suffix: '%', label: 'tasso di conversione' },
      { value: 4, suffix: 'x', label: 'offerte gestite/mese' },
    ],
    cta: 'Sviluppa il tuo CRM su misura',
    accent: 'var(--color-accent)',
    challenge: [
      'Ogni preventivo passava da tre persone: il commerciale raccoglieva le misure, l’ufficio tecnico verificava la fattibilità, l’amministrazione applicava sconti e condizioni. In mezzo, quattro versioni dello stesso file Excel e un listino aggiornato a mano.',
      'Il risultato erano tre giorni di attesa media, errori di prezzo ricorrenti e clienti che nel frattempo chiedevano un preventivo anche altrove.',
    ],
    solution: [
      'Abbiamo costruito un configuratore che conosce le regole di prodotto: combinazioni ammesse, maggiorazioni per finitura, minimi di produzione. Il commerciale compone la soluzione davanti al cliente e il prezzo si aggiorna in tempo reale.',
      'Il listino è diventato una fonte unica, versionata, con scontistiche per fascia cliente approvate una volta sola. La firma digitale chiude il giro: l’offerta accettata genera in automatico la commessa nel gestionale di produzione.',
    ],
    results: [
      'Preventivo consegnato durante l’appuntamento nel 78% dei casi',
      'Errori di prezzo praticamente azzerati grazie al listino unico',
      'Storico completo delle revisioni per ogni offerta',
      'Integrazione bidirezionale con il gestionale di produzione',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Firma digitale', 'REST API'],
  },
  {
    id: 'erp',
    kicker: 'Case study — ERP',
    type: 'ERP',
    client: 'Arkadia',
    sector: 'Costruzioni e impianti',
    year: '2023',
    duration: '4 settimane il primo modulo',
    team: '6 persone',
    title: 'Un solo posto per cantieri, magazzino e costi',
    body: 'Nove fogli di calcolo e tre gestionali diversi sono diventati un ERP unico. Ogni cantiere ha budget, avanzamento e marginalità aggiornati in tempo reale, con permessi per ruolo.',
    quote:
      'Finalmente la direzione vede la marginalità di commessa mentre il cantiere è ancora aperto.',
    author: 'CFO, Arkadia',
    metrics: [
      { value: 9, suffix: '', label: 'sistemi sostituiti' },
      { value: 22, suffix: '%', label: 'costi operativi' },
      { value: 100, suffix: '%', label: 'dati centralizzati' },
    ],
    cta: 'Sviluppa il tuo ERP su misura',
    accent: 'var(--color-purple)',
    challenge: [
      'Tre gestionali che non si parlavano — uno per la contabilità, uno per il magazzino, uno per il personale — più nove fogli di calcolo condivisi che, di fatto, erano il vero sistema aziendale.',
      'La marginalità di una commessa si conosceva a cantiere chiuso, quando ormai non si poteva più correggere nulla. Ogni chiusura mensile richiedeva una settimana di riconciliazioni manuali.',
    ],
    solution: [
      'Abbiamo mappato i processi reparto per reparto e costruito un ERP unico con la commessa al centro: ore, materiali, subappalti e costi indiretti confluiscono sulla stessa scheda.',
      'La migrazione è avvenuta per moduli, mai in blocco: il magazzino è entrato in produzione dopo quattro settimane, le commesse e la contabilità analitica sono seguite con lo stesso ritmo. Ogni modulo è andato in esercizio mentre il precedente era già a regime, senza fermare l’operatività.',
    ],
    results: [
      'Marginalità di commessa aggiornata ogni notte',
      'Chiusura mensile da 5 giorni a mezza giornata',
      'Un solo anagrafico fornitori, prima duplicato su tre sistemi',
      'Permessi per ruolo su 120 utenti interni',
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Metabase', 'SAP connector'],
  },
  {
    id: 'mes',
    kicker: 'Case study — MES',
    type: 'MES',
    client: 'Officine V',
    sector: 'Metalmeccanica',
    year: '2024',
    duration: '3 settimane',
    team: '4 persone',
    title: 'La produzione senza carta, tracciata al pezzo',
    body: 'Ordini di lavoro, controlli qualità e non conformità su terminale a bordo macchina. Ogni pezzo ha uno storico completo e la rintracciabilità si genera da sola.',
    quote: 'Gli scarti si sono dimezzati semplicemente perché ora vediamo dove nascono.',
    author: 'Responsabile produzione, Officine V',
    metrics: [
      { value: 51, suffix: '%', label: 'non conformità' },
      { value: 0, suffix: '', label: 'moduli cartacei' },
      { value: 18, suffix: '%', label: 'resa di linea' },
    ],
    cta: 'Sviluppa il tuo MES su misura',
    accent: 'var(--color-success)',
    challenge: [
      'Ordini di lavoro stampati la mattina, annotazioni a penna durante il turno, inserimento a computer la sera. Tra il pezzo prodotto e il dato disponibile passavano fino a dodici ore.',
      'Le non conformità venivano registrate solo se gravi, quindi le cause ricorrenti restavano invisibili e gli scarti si ripetevano di lotto in lotto.',
    ],
    solution: [
      'Terminali a bordo macchina con interfaccia pensata per i guanti: pochi tasti grandi, avanzamento con un tocco, causali di fermo preimpostate.',
      'Ogni pezzo porta con sé un identificativo che raccoglie macchina, operatore, parametri e controlli qualità. La rintracciabilità, prima ricostruita a mano su richiesta del cliente, ora si genera da sola in un PDF.',
    ],
    results: [
      'Dati di produzione disponibili in tempo reale, non a fine turno',
      'Non conformità dimezzate nei primi sei mesi',
      'Rintracciabilità di lotto generata automaticamente',
      'Zero moduli cartacei in reparto',
    ],
    stack: ['React Native', 'Node.js', 'PostgreSQL', 'MQTT', 'Grafana'],
  },
]

export const integrations = [
  'SAP',
  'Shopify',
  'HubSpot',
  'Stripe',
  'Slack',
  'Zucchetti',
  'Google Workspace',
  'Microsoft 365',
  'Fatture in Cloud',
  'Salesforce',
  'Notion',
  'WhatsApp Business',
]

/* ------------------------------------------------------------------
   Metodo, numeri, persone
   ------------------------------------------------------------------ */

export const process = [
  {
    step: '01',
    title: 'Analisi',
    duration: '2–3 giorni',
    body: 'Due o tre giorni nei reparti, non due settimane di documenti: guardiamo il processo come funziona davvero e scegliamo il perimetro del primo rilascio. Quello che non entra nelle quattro settimane viene messo per iscritto e rimandato, non promesso a mezza bocca.',
    activities: [
      'Interviste ai referenti dei reparti coinvolti',
      'Mappatura del flusso e dei sistemi già in uso',
      'Ricognizione dei dati da migrare e delle integrazioni',
      'Perimetro del primo rilascio e piano delle settimane',
    ],
    deliverable: 'Perimetro scritto e piano delle quattro settimane',
  },
  {
    step: '02',
    title: 'Prototipazione',
    duration: '3–5 giorni',
    body: 'L’analisi diventa schermate navigabili, messe subito davanti a chi userà il sistema tutti i giorni. È lì che si scopre cosa manca, mentre cambiarlo costa un pomeriggio. In parallelo fissiamo architettura, modello dei dati e scelte tecnologiche.',
    activities: [
      'Flussi principali e architettura dell’informazione',
      'Prototipo cliccabile delle schermate chiave',
      'Prova con gli utenti reali dei reparti',
      'Architettura tecnica e modello dei dati',
    ],
    deliverable: 'Prototipo navigabile e architettura tecnica',
  },
  {
    step: '03',
    title: 'Sviluppo',
    duration: 'sprint da 1 settimana',
    body: 'Sprint settimanali con demo il venerdì: ogni settimana vedi funzionare un pezzo in più sull’ambiente di collaudo, e le priorità della settimana dopo si decidono insieme. Ogni modifica passa da revisione del codice e test automatici.',
    activities: [
      'Demo e rilascio su ambiente di collaudo ogni venerdì',
      'Revisione del codice e test automatici su ogni modifica',
      'Integrazioni e migrazione dei dati provate in anticipo',
      'Controlli di performance e sicurezza a ogni rilascio',
    ],
    deliverable: 'Build collaudabile ogni settimana',
  },
  {
    step: '04',
    title: 'Rilascio e assistenza',
    duration: 'entro la 4ª settimana, poi continuativo',
    body: 'Il go-live sta dentro il mese: migrazione finale provata almeno due volte, formazione reparto per reparto, piano di rientro se qualcosa non va. Da lì in avanti siamo il tuo team tecnico — monitoraggio, correzioni con tempi concordati e sviluppo delle evolutive.',
    activities: [
      'Migrazione finale e go-live pianificato',
      'Formazione del team e manuale operativo',
      'Monitoraggio, log e allerta automatica sugli errori',
      'Evolutive e correzioni con tempi di intervento concordati',
    ],
    deliverable: 'Go-live, documentazione e supporto con SLA',
  },
]

export const stats = [
  { value: 200, suffix: '+', label: 'Progetti attivi' },
  { value: 70, suffix: '+', label: 'Clienti seguiti' },
  { value: 24, suffix: '+', label: 'Sviluppatori nel team' },
  { value: 96, suffix: '%', label: 'Clienti che rinnovano' },
]

export const aboutStory = [
  'LevelApp nasce a Roma nel 2022 da Pasqualino Puddas e Kayo Willian Dionizio Venturino: due dipendenti stanchi di vedere aziende sane piegare i propri processi a software che non le rappresentavano. Il primo lavoro è un gestionale per appaltatori pubblici — gare, requisiti, documentazione — che da allora non ha mai smesso di girare.',
  'Nel 2024 la collaborazione con un ente milanese porta attorno al nucleo iniziale più di 24 sviluppatori back-end e front-end, e con loro la seconda sede. Nello stesso anno il ritmo cambia: niente più progetti lunghi mesi, ma rilasci in produzione entro quattro settimane.',
  'Oggi seguiamo oltre 70 clienti e più di 200 progetti attivi, tra Roma e Milano. Uno di questi lo portiamo avanti come fondatori e non come fornitori — Horeca in Suite — ed è il motivo per cui, quando qualcuno arriva con un’idea invece che con un processo da sistemare, sappiamo esattamente di cosa sta parlando.',
]

export const values = [
  {
    icon: 'lock',
    title: 'Nessun lock-in',
    body: 'Codice, dati e infrastruttura sono tuoi dal primo giorno. Se un domani vuoi portare lo sviluppo in casa o affidarlo ad altri, trovi tutto documentato e nessuna dipendenza da noi.',
  },
  {
    icon: 'graph',
    title: 'Perimetro nero su bianco',
    body: 'Dopo l’analisi sai cosa entra nel primo rilascio, cosa arriva dopo e con quali tempi. Le variazioni si concordano prima di lavorarle, mai a cose fatte.',
  },
  {
    icon: 'users',
    title: 'Parli con chi sviluppa',
    body: 'Niente account manager che fanno da filtro. Riunioni brevi e concrete con le persone che hanno le mani nel codice.',
  },
  {
    icon: 'shield',
    title: 'Manutenibile da chiunque',
    body: 'Tecnologie diffuse, test, documentazione. Scriviamo codice pensando a chi lo leggerà tra tre anni, anche se non saremo noi.',
  },
]

/**
 * Tappe dell'azienda. `link` è opzionale: quando c'è, la voce mostra un
 * collegamento in fondo al racconto.
 *
 * TODO: manca il nome dell'ente milanese della tappa 2024 e quello ufficiale
 * dell'assistente lanciato nel 2025 — sono segnati nei testi.
 */
export const timeline = [
  {
    year: '2022',
    title: 'Due dipendenti e un software per gli appalti',
    body: 'LevelApp nasce a Roma da Pasqualino Puddas e Kayo Willian Dionizio Venturino, due dipendenti che decidono di mettersi in proprio. Nello stesso anno esce il primo lavoro: un software per appaltatori pubblici, che gestisce gare, requisiti e documentazione — ed è ancora oggi in esercizio, usato tutti i giorni.',
  },
  {
    year: '2024',
    title: 'La squadra si allarga a Milano',
    body: 'Nasce la collaborazione con un ente milanese: attorno al nucleo iniziale si affiancano più di 24 sviluppatori back-end e front-end, con chi si occupa di infrastruttura, dati e progettazione. È l’anno in cui smettiamo di lavorare a progetti lunghi mesi e passiamo ai rilasci a quattro settimane. Si chiude con 48 clienti ricorrenti e oltre 180 progetti attivi.',
  },
  {
    year: '2025',
    title: 'Il nostro assistente AI',
    body: 'Lanciamo l’assistente che oggi mettiamo dentro i gestionali dei clienti: risponde sui documenti aziendali citando la fonte, rispetta i permessi di chi fa la domanda e trasforma fatture, DDT e contratti in dati strutturati. Elaborazione su infrastruttura europea, nessun addestramento sui contenuti dei clienti.',
  },
  {
    year: '2026',
    title: 'Oltre 70 clienti e 200 progetti attivi',
    body: 'Progetti in corso su tutta Italia, dalla metalmeccanica ai servizi. Tra questi ce n’è uno che portiamo avanti come fondatori, non come fornitori: Horeca in Suite, la piattaforma gestionale per bar, ristoranti e hotel.',
    link: { label: 'horecainsuite.com', href: 'https://www.horecainsuite.com' },
  },
]

// TODO: nomi, ruoli e foto reali del team.
export const team = [
  { name: 'Chi guida l’analisi', role: 'Analisi & processi', focus: 'Mappatura dei flussi, perimetro, stime' },
  { name: 'Chi disegna', role: 'Design di prodotto', focus: 'Prototipi, design system, accessibilità' },
  { name: 'Chi costruisce', role: 'Ingegneria del software', focus: 'Rust, TypeScript, integrazioni' },
  { name: 'Chi tiene su tutto', role: 'Infrastruttura & supporto', focus: 'Cloud, monitoraggio, SLA' },
]

export const stack = [
  { group: 'Back-end', items: ['Rust', 'Node.js', 'Python', 'REST & GraphQL'] },
  { group: 'Front-end', items: ['React', 'TypeScript', 'Vite', 'React Native'] },
  { group: 'Dati', items: ['PostgreSQL', 'Redis', 'pgvector', 'Metabase'] },
  { group: 'Infrastruttura', items: ['Docker', 'GitHub Actions', 'Cloud europeo', 'Grafana'] },
]

export const testimonials = [
  {
    name: 'Gabriele Perali',
    role: 'Operations Manager',
    text: 'Il MES che hanno costruito ha cambiato il modo in cui gestiamo la produzione. Zero carta, tutto tracciato, e un supporto che risponde davvero.',
    rating: 5,
    when: '2 settimane fa',
  },
  {
    name: 'Arianna Brugnoli',
    role: 'Direttrice Amministrativa',
    text: 'La fase di analisi iniziale è stata il vero valore aggiunto: hanno capito i nostri processi meglio di quanto li avessimo mai documentati.',
    rating: 5,
    when: '1 mese fa',
  },
  {
    name: 'Cristian Forte',
    role: 'Titolare',
    text: 'Perimetro chiaro dall’inizio, tempi rispettati e riunioni concrete. Non ho mai avuto la sensazione di parlare con dei tecnici distanti.',
    rating: 5,
    when: '1 mese fa',
  },
  {
    name: 'Marta Iovine',
    role: 'Head of Sales',
    text: 'Il CRM su misura ci ha fatto recuperare intere giornate. La rete vendita lo ha adottato in una settimana, senza formazione infinita.',
    rating: 5,
    when: '2 mesi fa',
  },
  {
    name: 'Davide Sanna',
    role: 'IT Manager',
    text: 'Integrazioni pulite, documentate e testate. Per una volta ho ricevuto un progetto che il mio team può mantenere senza dipendere da nessuno.',
    rating: 5,
    when: '3 mesi fa',
  },
  {
    name: 'Elena Ricci',
    role: 'Founder',
    text: 'In quattro settimane avevamo il primo modulo in produzione, e da lì abbiamo iterato. Approccio pragmatico, nessuna over-engineering.',
    rating: 5,
    when: '4 mesi fa',
  },
]

export const faqs = [
  {
    q: 'Come si definisce il perimetro di un progetto?',
    a: 'Con due o tre giorni di analisi nei reparti. Mappiamo il processo, i sistemi già in uso e i dati da migrare, poi mettiamo per iscritto cosa entra nelle quattro settimane e cosa arriva nei rilasci successivi. Il perimetro è la prima cosa che consegniamo, prima di qualsiasi riga di codice.',
  },
  {
    q: 'Cosa succede dopo il rilascio?',
    a: 'Restiamo il tuo team tecnico: monitoraggio degli errori, correzioni con tempi di intervento concordati a contratto e sviluppo delle evolutive quando l’azienda cambia. Hai un canale diretto con le persone che hanno scritto il codice, non un call center.',
  },
  {
    q: 'Che tipo di software realizzate?',
    a: 'Gestionali, ERP, CRM, MES, portali B2B, piattaforme web, siti ed e-commerce, app mobile e integrazioni tra sistemi esistenti. Se il tuo processo è specifico, è esattamente il tipo di progetto che facciamo meglio.',
  },
  {
    q: 'Con quali tecnologie lavorate?',
    a: 'Rust è la scelta predefinita per tutto ciò che deve essere veloce e affidabile: motori di calcolo, sincronizzazioni, servizi sotto carico, elaborazioni in background. Attorno usiamo TypeScript e React sul fronte applicativo, Python per data e AI, PostgreSQL come database e cloud europeo per l’infrastruttura. Sono tecnologie diffuse: chiunque potrà mantenere il codice, anche senza di noi.',
  },
  {
    q: 'Perché Rust e non solo tecnologie più comuni?',
    a: 'Perché su un gestionale che resta in esercizio per anni la differenza non la fa la velocità di scrittura del codice, ma quanti incidenti genera in produzione. Il compilatore di Rust intercetta prima del rilascio un’intera famiglia di errori che altrove si scoprono di notte, e i consumi di memoria restano prevedibili anche sotto carico. Dove questo non serve, usiamo strumenti più leggeri: non è ideologia.',
  },
  {
    q: 'Lavorate anche su software che esiste già?',
    a: 'Sì, ed è buona parte del lavoro. Spesso non serve rifare tutto: si isola la parte che frena l’azienda, la si riscrive e la si ricollega al resto, un pezzo alla volta. Il sistema storico continua a girare mentre viene sostituito.',
  },
  {
    q: 'Perché non usare un software standard?',
    a: 'Se un prodotto pronto copre gran parte dei tuoi processi te lo diciamo e ti aiutiamo a sceglierlo. Il su misura ha senso quando il tuo modo di lavorare è un vantaggio competitivo: piegarlo a un software generico significherebbe perderlo.',
  },
  {
    q: 'Il codice è davvero di nostra proprietà?',
    a: 'Sì, per contratto. Alla consegna ricevi repository, cronologia dei commit, documentazione, credenziali e infrastruttura. Puoi proseguire con noi, portare lo sviluppo in casa o cambiare fornitore quando vuoi.',
  },
  {
    q: 'Quanto tempo serve per il primo rilascio?',
    a: 'Dipende da cosa costruiamo, ma il tetto è di quattro settimane. Una vetrina va online in cinque giorni lavorativi, un negozio in due settimane, il primo assistente AI in dieci giorni, un portale web in tre settimane, un’app su entrambi gli store e il primo modulo di un gestionale in quattro. Lavoriamo a sprint settimanali, quindi vedi qualcosa di funzionante dal primo venerdì: se un progetto non ci sta in quattro settimane, lo spezziamo in rilasci che ci stanno.',
  },
]

/* ------------------------------------------------------------------
   Contatti
   ------------------------------------------------------------------ */

export const contactReasons = [
  { value: 'prodotto', label: 'Ho un’idea di software da realizzare' },
  { value: 'gestionale', label: 'Software gestionale (ERP, CRM, MES)' },
  { value: 'web-app', label: 'Web app o piattaforma' },
  { value: 'sito-web', label: 'Sito web o e-commerce' },
  { value: 'mobile', label: 'App mobile' },
  { value: 'ai', label: 'AI applicata' },
  { value: 'modernizzazione', label: 'Modernizzazione di un software esistente' },
  { value: 'altro', label: 'Altro / non lo so ancora' },
]

export const contactSteps = [
  {
    title: 'Rispondiamo entro un giorno lavorativo',
    body: 'Legge la richiesta chi si occuperà davvero del progetto, non un centralino.',
  },
  {
    title: 'Prima call di 30 minuti',
    body: 'Capiamo il contesto e ti diciamo subito se siamo la scelta giusta. Se non lo siamo, te lo diciamo lo stesso.',
  },
  {
    title: 'Analisi e piano in pochi giorni',
    body: 'Dopo due o tre giorni nei tuoi processi hai perimetro, architettura e la data del rilascio per iscritto.',
  },
]
