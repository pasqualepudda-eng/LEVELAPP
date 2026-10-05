/**
 * Tutti i testi del sito in un unico posto.
 * Sostituisci i valori segnati con TODO con i dati reali di LevelApp.
 */

export const company = {
  name: 'LevelApp',
  claim: 'Software house',
  payoff: 'Portiamo il tuo business al livello successivo.',
  phone: '+39 351 418 1029',
  phoneHref: 'tel:+393514181029',
  email: 'amministrazione@levelapp.cloud',
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/levelapp.cloud', icon: 'instagram' },
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
            desc: 'ERP, CRM, MES e verticali su misura',
          },
          {
            label: 'Web app & piattaforme',
            to: '/servizi/web-app',
            icon: 'browser',
            desc: 'Portali, aree riservate, intranet, SaaS',
          },
          {
            label: 'Siti web ed e-commerce',
            to: '/servizi/siti-web',
            icon: 'globe',
            desc: 'One page, landing, multipagina, e-commerce',
          },
          {
            label: 'App mobile',
            to: '/servizi/mobile',
            icon: 'mobile',
            desc: 'App per clienti, rete vendita, operativi',
          },
          {
            label: 'AI applicata',
            to: '/servizi/ai',
            icon: 'sparkle',
            desc: 'Bot, esperienze guidate, sistemi multi-modello',
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
            label: 'Horeca in Suite',
            to: '/progetti/horeca',
            icon: 'layers',
            desc: 'Un gestionale al posto di trenta strumenti',
          },
          {
            label: 'Scuolabus · Comune di Roma',
            to: '/progetti/scuolabus',
            icon: 'users',
            desc: 'Il genitore segue il figlio fermata per fermata',
          },
          {
            label: 'Multiservizi in Suite',
            to: '/progetti/multiservizi',
            icon: 'workflow',
            desc: 'ERP per appaltatori, con timbratura sul posto',
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
            desc: 'Oltre 24 sviluppatori e più di 70 clienti',
          },
          {
            label: 'Lavora con noi',
            to: '/lavora-con-noi',
            icon: 'briefcase',
            desc: 'Scegli il ruolo e fai il test d’ingresso',
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
      { label: 'Horeca in Suite', to: '/progetti/horeca' },
      { label: 'Scuolabus · Comune di Roma', to: '/progetti/scuolabus' },
      { label: 'Multiservizi in Suite', to: '/progetti/multiservizi' },
    ],
  },
  {
    title: 'Azienda',
    links: [
      { label: 'Chi siamo', to: '/azienda' },
      { label: 'Il metodo', to: '/azienda#metodo' },
      { label: 'Lavora con noi', to: '/lavora-con-noi' },
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

export const legalLinks = [
  { label: 'Privacy policy', to: '/privacy' },
  { label: 'Cookie policy', to: '/cookie' },
  { label: 'Termini e condizioni', to: '/termini' },
  { label: 'Mappa del sito', to: '/mappa' },
  { label: 'Area riservata', to: '/accedi' },
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
    short: 'Hai un’idea di software: la portiamo in produzione, dal primo utente in poi.',
    tags: ['MVP', 'Prodotto', 'Scale-up'],
    hero: 'Hai l’idea. Noi la mettiamo in produzione.',
    intro:
      'Un servizio che nel tuo settore non esiste ancora, uno strumento che oggi vendi come consulenza, una piattaforma da affiancare al tuo prodotto, un’app pensata per i tuoi clienti: qualunque forma abbia l’idea, il percorso è lo stesso. In quattro settimane diventa un prodotto funzionante davanti ai primi utenti, non un documento di specifiche.',
    highlights: [
      {
        title: 'Prima gli utenti, poi il codice',
        body: 'Pochi giorni per capire chi lo userà, cosa fa oggi al posto tuo e quale pezzo vale la pena costruire per primo. Le funzioni “che serviranno di sicuro” sono il motivo per cui i prodotti nuovi escono con un anno di ritardo.',
      },
      {
        title: 'Un MVP che regge il traffico vero',
        body: 'Non un prototipo da buttare: nasce sull’architettura del prodotto finale, con monitoraggio dal primo giorno. Quando funziona si scala, non si riscrive.',
      },
      {
        title: 'La proprietà intellettuale è tua',
        body: 'Codice, marchio e dati restano intestati alla tua azienda: nessuna quota nel capitale, nessuna royalty, nessun vincolo con noi.',
      },
      {
        title: 'Si misura, poi si decide',
        body: 'Dal primo giorno online raccogliamo i numeri che contano — chi torna, dove si blocca, cosa non usa nessuno — e la settimana dopo si taglia o si raddoppia su quello che funziona.',
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
    short: 'ERP, CRM, MES e gestionali verticali costruiti sul modo di lavorare della tua azienda.',
    tags: ['ERP', 'CRM', 'MES'],
    hero: 'Il gestionale che assomiglia alla tua azienda',
    intro:
      'Commesse o pratiche, anagrafiche e documenti, pianificazione e turni, flussi di approvazione, scadenze, rendicontazione: ogni azienda ha processi che nessun prodotto pronto copre davvero. Costruiamo il gestionale attorno a come lavori — in produzione, nei servizi, negli appalti, nella logistica o nel commercio — partendo dal processo che oggi ti costa più ore.',
    highlights: [
      {
        title: 'Prima il collo di bottiglia',
        body: 'Nell’analisi si sceglie un processo solo: quello che oggi consuma più tempo o genera più errori. In quattro settimane è in produzione e misurabile, invece di scoprire a rilascio completo se la direzione era giusta.',
      },
      {
        title: 'Un dato solo, ovunque',
        body: 'Anagrafiche, documenti e scadenze vivono in un posto e si parlano con i sistemi che hai già — contabilità, fatturazione elettronica, e-commerce, strumenti di reparto. Le doppie imputazioni spariscono col primo rilascio.',
      },
      {
        title: 'Regge i numeri veri',
        body: 'I motori di calcolo — disponibilità, costi, pianificazioni, riepiloghi — sono scritti in Rust: rispondono in millisecondi su anni di storico e non rallentano man mano che il database cresce.',
      },
      {
        title: 'Ruoli, permessi e tracciamento',
        body: 'Direzione, amministrazione, operativi e collaboratori esterni hanno viste e azioni diverse sullo stesso sistema, con la traccia di chi ha modificato cosa e quando.',
      },
    ],
    deliverables: [
      'Analisi del processo scelto e piano di rilascio',
      'Prototipo navigabile prima dello sviluppo',
      'Modulo in produzione entro la quarta settimana',
      'Migrazione dei dati esistenti, provata due volte',
      'Integrazioni con i sistemi già in uso',
      'Formazione degli utenti e manuale operativo',
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
    caseSlug: 'multiservizi',
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
    tempi: 'Piattaforma online in 3 settimane',
    title: 'Web app & piattaforme',
    short: 'Portali, aree riservate, intranet, configuratori e piattaforme in abbonamento.',
    tags: ['Portali', 'SaaS', 'Aree riservate'],
    hero: 'Tutto quello che deve vivere nel browser',
    intro:
      'Un portale per clienti o fornitori, un’area riservata dove ognuno vede solo le proprie cose, una intranet che tiene insieme il lavoro dei reparti, un configuratore che guida una scelta complessa, una piattaforma in abbonamento da vendere a più aziende. Cambiano il pubblico e le regole, non il modo di costruirle: ruoli chiari, dati veri, integrazione con quello che hai già.',
    highlights: [
      {
        title: 'Ogni utente vede il suo',
        body: 'Ruoli e permessi disegnati sul tuo organigramma e sui tuoi interlocutori esterni: clienti, agenti, fornitori e collaboratori entrano nello stesso sistema e trovano soltanto quello che li riguarda.',
      },
      {
        title: 'Veloce anche sotto carico',
        body: 'Soglie di performance fissate a inizio progetto e verificate a ogni rilascio. Il cuore applicativo gira su servizi Rust: prima interazione sotto il secondo anche in 4G e con l’archivio pieno.',
      },
      {
        title: 'Parla con i tuoi sistemi',
        body: 'API e webhook verso gestionale, contabilità, e-commerce o strumenti di settore: la piattaforma non diventa l’ennesima isola da allineare a mano.',
      },
      {
        title: 'Accessibile per contratto',
        body: 'Contrasto, navigazione da tastiera, screen reader e focus visibile. Non è un extra di fine progetto: è il modo in cui scriviamo i componenti fin dal prototipo.',
      },
    ],
    deliverables: [
      'Prototipo navigabile dei flussi principali',
      'Piattaforma responsive e accessibile',
      'Gestione di ruoli, permessi e accessi',
      'API documentate verso i tuoi sistemi',
      'Pipeline di rilascio e ambiente di collaudo',
      'Monitoraggio, log e allerta sugli errori',
    ],
    stack: ['Rust', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'GitHub Actions'],
    faqs: [
      {
        q: 'Funziona anche offline o su rete lenta?',
        a: 'Le aree critiche possono essere progettate come PWA con cache locale e coda di sincronizzazione: si continua a lavorare e i dati partono appena la rete torna.',
      },
      {
        q: 'Chi mantiene la piattaforma dopo il rilascio?',
        a: 'Ce ne occupiamo noi con un accordo di manutenzione: correzioni, evolutive e aggiornamenti tecnici. Il codice però resta tuo e usa tecnologie diffuse, quindi restare con noi è una scelta, non un obbligo.',
      },
    ],
    caseSlug: 'vallenova',
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
    tempi: 'Landing e one page in 5 giorni, e-commerce in 2 settimane',
    title: 'Siti web ed e-commerce',
    short:
      'One page, multipagina, landing, opt-in, cataloghi ed e-commerce: il formato giusto per l’obiettivo.',
    tags: ['One page', 'Landing', 'E-commerce'],
    hero: 'Il sito giusto per l’obiettivo che hai',
    intro:
      'Un sito non è una cosa sola. Una landing serve a far compiere un’azione, una one page a raccontare un lancio, un opt-in a raccogliere contatti, un multipagina a reggere un’azienda intera con servizi e sedi, un catalogo a far trovare i prodotti, un e-commerce a venderli. Si parte dall’obiettivo e dal pubblico, poi si sceglie il formato — non il contrario.',
    highlights: [
      {
        title: 'Ogni formato ha il suo mestiere',
        body: 'Landing e opt-in costruite attorno a una sola azione, one page per un lancio o un profilo professionale, multipagina per aziende con più servizi e sedi, cataloghi ed e-commerce quando c’è da vendere. In analisi ti diciamo quale ti serve davvero, anche quando è il più piccolo.',
      },
      {
        title: 'Veloce, perché è la prima causa di abbandono',
        body: 'Pagine servite già pronte, immagini ottimizzate e nessuno script inutile. I tempi di caricamento sono un requisito del progetto, misurato a ogni rilascio.',
      },
      {
        title: 'Trovabile dal primo giorno',
        body: 'Struttura, dati strutturati, metadati e redirect dal vecchio sito curati in fase di rilascio, così il traffico e le posizioni già guadagnate non si perdono nel passaggio.',
      },
      {
        title: 'Aggiornamenti e manutenzione li facciamo noi',
        body: 'Nessun pannello da imparare e nessun rischio di rompere qualcosa: le modifiche ce le chiedi e le pubblichiamo noi, con tempi concordati. Il sito resta coerente negli anni invece di degradare a ogni intervento improvvisato.',
      },
    ],
    deliverables: [
      'Scelta del formato e progettazione dei contenuti',
      'Sito responsive e accessibile',
      'Moduli di contatto e raccolta contatti',
      'Catalogo, pagamenti e spedizioni per gli e-commerce',
      'SEO tecnica, redirect e tracciamento conversioni',
      'Dominio, hosting europeo e manutenzione continua',
    ],
    stack: ['Astro', 'React', 'TypeScript', 'Stripe', 'Cloud EU'],
    faqs: [
      {
        q: 'Che tipo di sito ci serve?',
        a: 'Dipende da cosa deve succedere quando qualcuno arriva. Se l’obiettivo è una sola azione — un contatto, un’iscrizione, una prenotazione — bastano una landing o un opt-in e si è online in cinque giorni. Se devi raccontare più servizi, sedi o referenze serve un multipagina. Se devi vendere, un e-commerce. Lo decidiamo insieme in analisi, e non ti proponiamo il formato più grande solo perché è più grande.',
      },
      {
        q: 'Possiamo modificare i testi da soli?',
        a: 'Alle modifiche pensiamo noi: ci mandi il testo, la foto o il prodotto nuovo e lo pubblichiamo, di norma in giornata. È incluso nella manutenzione, e serve a tenere il sito coerente nel tempo invece di lasciarlo alla buona volontà di chi ha cinque minuti liberi.',
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
    short: 'App iOS e Android per i tuoi clienti, per la rete vendita o per chi lavora in campo.',
    tags: ['iOS', 'Android', 'Offline'],
    hero: 'Lo strumento che sta in tasca a chi lo usa',
    intro:
      'Un’app per i clienti — prenotazioni, tessera fedeltà, stato delle pratiche, assistenza — oppure per chi lavora fuori dall’ufficio: rapportini, sopralluoghi, consegne, letture, presenze. Un unico codebase genera le build native per iOS e Android, con la logica scritta una volta sola: una squadra da mantenere invece di due.',
    highlights: [
      {
        title: 'Lavora anche senza campo',
        body: 'Dati in locale e sincronizzazione differita: si compila dove la rete non arriva e tutto risale appena torna la connessione, senza che nessuno debba rifare il lavoro.',
      },
      {
        title: 'Usa l’hardware del dispositivo',
        body: 'Fotocamera, scanner di codici, GPS, firma sullo schermo, notifiche push, sblocco biometrico e pagamenti in app: quello che un sito dentro una app non può fare.',
      },
      {
        title: 'Pubblicazione gestita',
        body: 'Certificati, schede store, revisioni e aggiornamenti li seguiamo noi, dalla prima pubblicazione ai rilasci successivi. Gli account restano intestati alla tua azienda.',
      },
    ],
    deliverables: [
      'App iOS e Android da un solo codebase',
      'Modalità offline con coda di sincronizzazione',
      'Notifiche push segmentate per profilo',
      'Distribuzione su App Store e Play Store',
      'Crash reporting e statistiche di utilizzo',
      'Aggiornamenti e correzioni gestiti da noi',
    ],
    stack: ['React Native', 'Expo', 'TypeScript', 'Rust (core condiviso)', 'SQLite'],
    faqs: [
      {
        q: 'Serve davvero un’app o basta il sito?',
        a: 'Se non ti servono hardware del dispositivo, uso offline o notifiche push, spesso basta una web app: non passa dagli store a ogni rilascio ed è più rapida da far evolvere. Se l’app non serve, te lo diciamo in analisi.',
      },
      {
        q: 'Gestite voi gli account degli store?',
        a: 'Sì. Consigliamo comunque di intestarli alla tua azienda: le app restano tue anche se un domani cambi fornitore.',
      },
    ],
    caseSlug: 'meridia',
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
    short: 'Bot di assistenza, esperienze guidate e sistemi multi-modello sui tuoi dati.',
    tags: ['Bot', 'Agenti', 'Multi-modello'],
    hero: 'AI che lavora dentro i tuoi processi',
    intro:
      'Bot che rispondono ai clienti su prodotti, pratiche e procedure; esperienze guidate che accompagnano l’utente passo per passo fino alla scelta giusta; assistenti interni che cercano nei documenti aziendali; sistemi in cui più modelli si passano il lavoro, ognuno per quello che sa fare meglio. Si parte da un caso solo e in dieci giorni lavorativi è in mano alle persone.',
    highlights: [
      {
        title: 'Bot di assistenza che risolvono',
        body: 'Rispondono su sito, WhatsApp, app o area riservata, conoscono i tuoi prodotti e le tue procedure e sanno quando fermarsi: la conversazione passa a una persona con tutto il contesto già raccolto, non ricomincia da capo.',
      },
      {
        title: 'Esperienze guidate, non moduli da compilare',
        body: 'Configuratori conversazionali, diagnosi guidate, primo avvio accompagnato: l’utente risponde a domande in ordine e arriva alla scelta giusta, invece di trovarsi davanti trenta campi e una pagina di istruzioni.',
      },
      {
        title: 'Più modelli che collaborano',
        body: 'Un modello capisce la richiesta, uno cerca nei dati, uno scrive, uno verifica prima di rispondere: sistemi multi-modello orchestrati, con controlli a ogni passaggio e nessuna azione sensibile eseguita senza conferma.',
      },
      {
        title: 'Sui tuoi dati, con le fonti',
        body: 'Documenti, listini, procedure e storico diventano la base delle risposte, con i permessi di chi fa la domanda e la fonte citata. Elaborazione su infrastruttura europea, nessun addestramento dei modelli sui tuoi contenuti.',
      },
    ],
    deliverables: [
      'Bot pubblicato sui canali che usi già',
      'Esperienza guidata sui percorsi scelti',
      'Base di conoscenza sui tuoi contenuti',
      'Orchestrazione multi-modello con controlli',
      'Passaggio a operatore con il contesto raccolto',
      'Valutazione della qualità e cruscotto di utilizzo',
    ],
    stack: ['Rust', 'Python', 'Claude API', 'pgvector', 'Cloud EU'],
    faqs: [
      {
        q: 'I nostri dati finiscono in pasto ai modelli?',
        a: 'No. Usiamo fornitori che non addestrano sui dati inviati via API, l’elaborazione avviene in Europa e puoi cancellare la base di conoscenza quando vuoi.',
      },
      {
        q: 'E se il bot sbaglia?',
        a: 'Le risposte portano le fonti, le domande fuori perimetro ricevono un “non lo so” esplicito e passano a una persona, e le azioni sensibili richiedono sempre conferma umana. In collaudo misuriamo la qualità su domande reali, non su esempi scelti da noi.',
      },
    ],
    caseSlug: 'horeca',
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
    title: 'Bot di assistenza',
    icon: 'comment',
    desc: 'Rispondono ai clienti su sito, WhatsApp o area riservata e passano a una persona con il contesto già raccolto.',
  },
  {
    title: 'Esperienze guidate',
    icon: 'sparkle',
    desc: 'Configuratori conversazionali, diagnosi passo passo e primo avvio accompagnato, al posto di moduli e istruzioni.',
  },
  {
    title: 'Sistemi multi-modello',
    icon: 'zap',
    desc: 'Più modelli che si passano il lavoro — capire, cercare, scrivere, verificare — con controlli a ogni passaggio.',
  },
]

/* ------------------------------------------------------------------
   Case study — pagina di dettaglio: /progetti/{id}
   ------------------------------------------------------------------ */

/**
 * Progetti. I primi tre sono i lavori più recenti; seguono i software che
 * portiamo avanti come prodotti nostri.
 *
 * TODO: i nomi dei primi tre clienti sono segnaposto inventati — vanno
 * sostituiti con quelli reali (o rimossi) prima di pubblicare, insieme ai
 * numeri delle metriche.
 */
export const cases = [
  {
    id: 'sismalab',
    accent: 'var(--color-accent)',
    type: 'Gestionale su misura',
    team: '3 persone: analisi, back-end, front-end',
    year: '2026',
    client: 'Sismalab S.p.A.',
    sector: 'Laboratorio prove materiali',
    duration: '4 settimane',
    title: 'Dal verbale su carta al certificato firmato in giornata',
    body: 'Commesse, prove di laboratorio e certificati in un unico flusso: il tecnico compila in reparto, il responsabile firma digitalmente e il cliente scarica dal portale.',
    quote:
      'Prima un certificato passava da tre scrivanie. Adesso esce lo stesso giorno della prova, e nessuno rincorre più i fogli.',
    author: 'Direzione tecnica',
    metrics: [
      { value: 90, suffix: '%', label: 'verbali digitalizzati' },
      { value: 4, suffix: 'x', label: 'certificati al giorno' },
      { value: 0, suffix: '', label: 'fogli di calcolo paralleli' },
    ],
    challenge: [
      'Ogni prova produceva un verbale cartaceo che veniva poi ribattuto a mano nel foglio di calcolo del laboratorio, e una terza volta nel modello del certificato.',
      'Il cliente chiamava per sapere a che punto fosse la pratica, e la risposta richiedeva di cercare fisicamente il fascicolo.',
    ],
    solution: [
      'Abbiamo digitalizzato la scheda di prova con i campi e i controlli della norma applicata: i valori fuori tolleranza si evidenziano mentre il tecnico li inserisce.',
      'Il certificato si genera dai dati già registrati e viene firmato digitalmente dal responsabile. Il portale clienti mostra lo stato di ogni pratica senza telefonate.',
    ],
    results: [
      'Certificato emesso in giornata nella maggior parte delle prove',
      'Storico consultabile per cliente, materiale e periodo',
      'Nessuna reimmissione manuale tra laboratorio e amministrazione',
    ],
    stack: ['Rust', 'React', 'PostgreSQL', 'Firma digitale', 'Cloud EU'],
  },
  {
    id: 'vallenova',
    accent: 'var(--color-purple)',
    type: 'Portale B2B',
    team: '3 persone: design, front-end, back-end',
    year: '2026',
    client: 'Vallenova Group S.p.A.',
    sector: 'Distribuzione alimentare',
    duration: '3 settimane',
    title: 'I rivenditori ordinano da soli, con il loro listino',
    body: 'Un portale dove ogni cliente entra, vede le proprie condizioni e ordina senza passare dall’ufficio commerciale. Gli ordini entrano già strutturati nel gestionale.',
    quote:
      'L’ufficio ordini ha smesso di fare da centralino. Il tempo liberato è finito sui clienti nuovi.',
    author: 'Responsabile commerciale',
    metrics: [
      { value: 68, suffix: '%', label: 'ordini inseriti dai clienti' },
      { value: 3, suffix: ' sett.', label: 'dal via al primo rilascio' },
      { value: 24, suffix: 'h', label: 'catalogo sempre aggiornato' },
    ],
    challenge: [
      'Gli ordini arrivavano per email, telefono e messaggi, ognuno in un formato diverso: qualcuno andava perso, molti venivano ribattuti a mano con errori di codice articolo.',
      'Ogni rivenditore aveva condizioni proprie, custodite in fogli che solo due persone sapevano leggere.',
    ],
    solution: [
      'Il portale espone a ogni cliente il suo listino e la disponibilità reale presa dal gestionale, con le regole commerciali applicate in automatico.',
      'L’ordine confermato entra nel gestionale già completo: nessun reinserimento, nessuna interpretazione.',
    ],
    results: [
      'Due terzi degli ordini inseriti direttamente dai rivenditori',
      'Errori di codice articolo praticamente azzerati',
      'Storico ordini e documenti consultabili dal cliente',
    ],
    stack: ['Rust', 'React', 'TypeScript', 'PostgreSQL', 'Cloud EU'],
  },
  {
    id: 'meridia',
    accent: 'var(--color-orange)',
    type: 'App mobile e pannello turni',
    team: '4 persone: analisi, mobile, back-end, sistemistica',
    year: '2025',
    client: 'Trasporti Meridia S.p.A.',
    sector: 'Trasporto persone',
    duration: '4 settimane',
    title: 'Turni, cambi e presenze dal telefono degli autisti',
    body: 'Una app per gli autisti e un pannello per la centrale: turni pubblicati, cambi richiesti e approvati, presenze registrate dove il servizio comincia davvero.',
    quote: 'I cambi turno si chiudono in chat di gruppo? Non più: ora passano tutti dal sistema.',
    author: 'Responsabile esercizio',
    metrics: [
      { value: 100, suffix: '%', label: 'turni pubblicati in app' },
      { value: 50, suffix: ' m', label: 'raggio della timbratura' },
      { value: 4, suffix: ' sett.', label: 'su iOS e Android' },
    ],
    challenge: [
      'I turni venivano affissi in deposito e i cambi concordati a voce: la centrale scopriva le sostituzioni a servizio iniziato.',
      'Le presenze si ricostruivano a fine mese incrociando fogli firma e memoria dei capiturno.',
    ],
    solution: [
      'App con turni personali, richiesta di cambio e approvazione tracciata; la centrale vede in tempo reale chi ha accettato cosa.',
      'Timbratura con verifica della posizione: se il dispositivo non è entro il raggio previsto dal luogo di servizio, la timbratura non si chiude.',
    ],
    results: [
      'Cambi turno tracciati e approvati, senza accordi informali',
      'Presenze pronte a fine mese, senza ricostruzioni',
      'Storico completo per contestazioni e verifiche',
    ],
    stack: ['React Native', 'Rust', 'PostgreSQL', 'Geolocalizzazione'],
  },
  {
    id: 'horeca',
    accent: 'var(--color-success)',
    type: 'Piattaforma di prodotto',
    team: '6 persone, squadra interna dedicata',
    year: '2024 · in corso',
    client: 'Horeca in Suite',
    sector: 'Prodotto nostro · HoReCa',
    duration: 'In sviluppo continuo',
    title: 'Un gestionale solo al posto di trenta strumenti',
    body: 'La piattaforma che portiamo avanti come fondatori: magazzino e lotti, temperature in tempo reale, ordini che arrivano da WhatsApp, parco mezzi, vuoti, giri di consegna e fatturazione, tutto in un unico software pensato per l’HoReCa.',
    link: { label: 'horecainsuite.com', href: 'https://www.horecainsuite.com' },
    metrics: [
      { value: 8, suffix: '', label: 'aree in un solo software' },
      { value: 1, suffix: 'ª', label: 'in Italia con ordini WhatsApp' },
      { value: 24, suffix: '/7', label: 'monitoraggio temperature' },
    ],
    challenge: [
      'Chi distribuisce food & beverage lavora con un programma per il magazzino, uno per gli ordini, uno per la fatturazione e nessuno che parli con gli altri: i dati vanno ribattuti e le scadenze si scoprono tardi.',
      'Gli ordini arrivano dove arrivano i clienti — soprattutto su WhatsApp — e finiscono ricopiati a mano, con gli errori che ne conseguono.',
    ],
    solution: [
      'Un’unica piattaforma con tracciabilità dei lotti, mappa degli scaffali, inventario multi-operatore e allerte automatiche su scadenze e sotto scorta.',
      'Il messaggio WhatsApp del cliente viene letto e trasformato in ordine già strutturato: all’operatore resta la verifica, non la trascrizione.',
      'Monitoraggio continuo delle temperature per cella, con storico e anomalie; parco mezzi con scadenze di assicurazione, bollo, revisione e ATP; gestione di vuoti e cauzioni; giri di consegna pianificati con l’AI.',
    ],
    results: [
      'Magazzino, temperature, mezzi, vuoti e fatturazione in un solo posto',
      'Ordini da WhatsApp creati senza reinserimento manuale',
      'Migrazione dei dati dal vecchio gestionale inclusa nell’avvio',
    ],
    stack: ['Rust', 'React', 'TypeScript', 'PostgreSQL', 'AI', 'Cloud EU'],
  },
  {
    id: 'scuolabus',
    accent: 'var(--color-accent)',
    type: 'Web app scolastica',
    team: '5 persone: analisi, front-end, back-end, mobile',
    year: '2025',
    client: 'Comune di Roma',
    sector: 'Pubblica amministrazione · Scuola',
    duration: '4 settimane il primo modulo',
    title: 'Il genitore sa dove si trova il figlio, fermata per fermata',
    body: 'La web app che gestisce alunni, navette e abbonamenti del servizio di trasporto scolastico, con un pannello per i genitori e uno per gli autisti.',
    metrics: [
      { value: 3, suffix: '', label: 'pannelli: scuola, genitori, autisti' },
      { value: 100, suffix: '%', label: 'corse tracciate' },
      { value: 0, suffix: '', label: 'moduli cartacei per l’iscrizione' },
    ],
    challenge: [
      'Iscrizioni, abbonamenti ed elenchi degli alunni per fermata vivevano su moduli cartacei e fogli di calcolo, con aggiornamenti che arrivavano in ritardo agli autisti.',
      'Il genitore non aveva modo di sapere se il figlio fosse salito, dove si trovasse la navetta e se fosse arrivato a scuola.',
    ],
    solution: [
      'Anagrafica alunni, navette, percorsi e abbonamenti in un unico sistema, con l’elenco della corsa sempre aggiornato sul dispositivo dell’autista.',
      'Tracciabilità completa del bambino: salita, percorso, discesa e arrivo a scuola, visibili al genitore dal proprio pannello.',
      'Pannello autisti con la corsa del giorno, l’elenco dei presenti e le segnalazioni da inviare alla scuola.',
    ],
    results: [
      'Genitori informati in tempo reale, senza telefonate alla segreteria',
      'Elenchi di corsa sempre allineati tra scuola e autisti',
      'Abbonamenti e iscrizioni gestiti senza carta',
    ],
    stack: ['React', 'Rust', 'PostgreSQL', 'Geolocalizzazione', 'Cloud EU'],
  },
  {
    id: 'cleanbus',
    accent: 'var(--color-pink)',
    type: 'Gestionale interno',
    team: '3 persone: analisi, sviluppo, sistemistica',
    year: '2025',
    client: 'Cleanbus',
    sector: 'Software interno · Servizi di pulizia',
    duration: '3 settimane',
    title: 'Le ore di pulizia sui mezzi, rendicontate senza fogli',
    body: 'Il gestionale interno che organizza squadre e turni di pulizia degli autobus, registra le presenze a bordo e produce la rendicontazione delle ore.',
    metrics: [
      { value: 100, suffix: '%', label: 'presenze registrate a bordo' },
      { value: 1, suffix: ' clic', label: 'per la rendicontazione mensile' },
      { value: 3, suffix: ' sett.', label: 'dal via all’uso quotidiano' },
    ],
    challenge: [
      'Le ore degli operatori venivano annotate a mano e ricostruite a fine mese, quando ormai nessuno ricordava chi avesse pulito quale mezzo.',
      'Non esisteva un riscontro oggettivo delle presenze sui singoli autobus.',
    ],
    solution: [
      'Pianificazione delle squadre per turno e per mezzo, con assegnazioni visibili agli operatori.',
      'Registrazione della presenza sull’autobus e delle ore effettive, con riepilogo per operatore, per mezzo e per periodo.',
    ],
    results: [
      'Rendicontazione delle ore pronta senza ricostruzioni',
      'Storico degli interventi per singolo mezzo',
      'Meno contestazioni sulle ore dichiarate',
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'Cloud EU'],
  },
  {
    id: 'multiservizi',
    accent: 'var(--color-attention)',
    type: 'ERP per appaltatori',
    team: '6 persone su moduli paralleli',
    year: '2022 · in evoluzione',
    client: 'Multiservizi in Suite',
    sector: 'Prodotto nostro · Appalti pubblici',
    duration: '4 settimane il primo modulo',
    title: 'L’ERP che risponde all’ente appaltante',
    body: 'Il gestionale per chi eroga servizi in appalto: personale, mezzi, magazzino, turni e consuntivazione economica dei servizi richiesti dall’ente, con timbratura verificata sul posto.',
    metrics: [
      { value: 50, suffix: ' m', label: 'raggio massimo per timbrare' },
      { value: 8, suffix: '', label: 'aree gestite in un sistema' },
      { value: 100, suffix: '%', label: 'servizi consuntivati' },
    ],
    challenge: [
      'Chi lavora in appalto deve dimostrare all’ente cosa ha fatto, con quali persone e con quali mezzi: senza un sistema unico la rendicontazione diventa un lavoro a sé, fatto di fogli e allegati.',
      'Turni, cambi turno e scadenze del personale e dei mezzi vivevano su strumenti separati, con il rischio di far uscire un operatore non in regola.',
    ],
    solution: [
      'Un ERP unico su personale, mezzi, magazzino, servizi, spostamenti e turnistica, con i cambi turno richiesti e approvati dentro al sistema.',
      'Timbratura geolocalizzata: fuori dai 50 metri dal luogo di lavoro la timbratura non si chiude, e la posizione resta agli atti.',
      'Consuntivazione economica per servizio e per commessa, pronta da presentare all’ente appaltante, e gestione delle scadenze di personale e mezzi con allerta anticipata.',
    ],
    results: [
      'Rendicontazione all’ente costruita dai dati operativi, non a posteriori',
      'Turni e cambi tracciati, con storico delle approvazioni',
      'Mezzi e personale geolocalizzati durante il servizio',
    ],
    stack: ['Rust', 'React', 'React Native', 'PostgreSQL', 'Geolocalizzazione'],
  },
]

/** Progetti che non hanno una scheda dedicata: il grosso del lavoro fatto. */
export const altriProgetti = {
  quanti: '80+',
  testo: 'ERP, gestionali, app e web app rilasciati per aziende e amministrazioni, dalla produzione ai servizi in appalto.',
}

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
  'LevelApp nasce da due dipendenti stanchi di vedere aziende sane piegare i propri processi a software che non le rappresentavano. Il primo lavoro è un gestionale per appaltatori pubblici — gare, requisiti, documentazione — che da allora non ha mai smesso di girare.',
  'Nel 2024 la collaborazione con un’azienda statunitense porta attorno al nucleo iniziale più di 24 sviluppatori back-end e front-end, e con loro un altro passo di scala. Nello stesso anno il ritmo cambia: niente più progetti lunghi mesi, ma rilasci in produzione entro quattro settimane.',
  'Oggi seguiamo oltre 70 clienti e più di 200 progetti attivi. Uno di questi lo portiamo avanti come fondatori e non come fornitori — Horeca in Suite — ed è il motivo per cui, quando qualcuno arriva con un’idea invece che con un processo da sistemare, sappiamo esattamente di cosa sta parlando.',
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
 * TODO: manca il nome dell'azienda statunitense della tappa 2024 e quello ufficiale
 * dell'assistente lanciato nel 2025 — sono segnati nei testi.
 */
export const timeline = [
  {
    year: '2022',
    title: 'Due dipendenti e un software per gli appalti',
    body: 'LevelApp nasce da due dipendenti che decidono di mettersi in proprio. Nello stesso anno esce il primo lavoro: un software per appaltatori pubblici, che gestisce gare, requisiti e documentazione — ed è ancora oggi in esercizio, usato tutti i giorni.',
  },
  {
    year: '2024',
    title: 'La squadra si allarga oltreoceano',
    body: 'Nasce la collaborazione con un’azienda statunitense: attorno al nucleo iniziale si affiancano più di 24 sviluppatori back-end e front-end, con chi si occupa di infrastruttura, dati e progettazione. È l’anno in cui smettiamo di lavorare a progetti lunghi mesi e passiamo ai rilasci a quattro settimane. Si chiude con 48 clienti ricorrenti e oltre 180 progetti attivi.',
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
  { value: 'sito-web', label: 'Sito, landing o e-commerce' },
  { value: 'mobile', label: 'App mobile' },
  { value: 'ai', label: 'Bot AI, assistenti o automazioni' },
  { value: 'modernizzazione', label: 'Modernizzazione di un software esistente' },
  { value: 'altro', label: 'Altro / non lo so ancora' },
]

/* ------------------------------------------------------------------
   Area ticket: solo per chi è già cliente
   ------------------------------------------------------------------ */

/** TODO: sostituire con i referenti reali del supporto. */
export const operatori = [
  'Non lo so / assegnatelo voi',
  'Chi ha seguito lo sviluppo',
  'Supporto tecnico',
  'Referente di progetto',
]

export const tipiRichiesta = [
  { value: 'malfunzionamento', label: 'Qualcosa non funziona' },
  { value: 'errore-dati', label: 'Dato sbagliato o mancante' },
  { value: 'evolutiva', label: 'Modifica a una funzione esistente' },
  { value: 'nuova', label: 'Funzione nuova da valutare' },
  { value: 'accessi', label: 'Accessi, utenti e permessi' },
  { value: 'uso', label: 'Domanda su come si usa' },
  { value: 'formazione', label: 'Formazione per una persona nuova' },
  { value: 'integrazione', label: 'Integrazione con un altro sistema' },
]

/**
 * Livelli di urgenza con la definizione accanto: senza una descrizione
 * operativa diventano tutti "urgente", e la coda perde significato.
 */
export const urgenze = [
  {
    value: 'bloccante',
    label: 'Bloccante',
    tono: 'var(--color-danger)',
    desc: 'Il lavoro è fermo: nessuno può proseguire e non esiste un modo alternativo.',
    sla: 'Presa in carico entro 2 ore lavorative',
  },
  {
    value: 'alta',
    label: 'Alta',
    tono: 'var(--color-orange)',
    desc: 'Una parte del team è bloccata, oppure si lavora solo con una procedura di ripiego pesante.',
    sla: 'Presa in carico in giornata',
  },
  {
    value: 'media',
    label: 'Media',
    tono: 'var(--color-attention)',
    desc: 'Rallenta il lavoro o costringe a qualche passaggio in più, ma si va avanti.',
    sla: 'Presa in carico entro 2 giorni lavorativi',
  },
  {
    value: 'bassa',
    label: 'Bassa',
    tono: 'var(--color-success)',
    desc: 'Miglioria, fastidio o richiesta che può essere pianificata con calma.',
    sla: 'Inserita nella pianificazione',
  },
]

export const daQuando = [
  'Da sempre, non ha mai funzionato',
  'Da oggi',
  'Da questa settimana',
  'Da dopo l’ultimo aggiornamento',
  'Capita solo ogni tanto',
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
