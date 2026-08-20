import { useSyncExternalStore } from 'react'
import { services } from '../data/content'

/**
 * Compilazione assistita dei preventivi.
 *
 * Si descrive a parole cosa deve comprendere il lavoro e torna un preventivo
 * dettagliato: oggetto, tempi di consegna, voci con quantità e prezzo, note.
 *
 * ATTENZIONE ALLA CHIAVE. Come richiesto, la chiave sta nella configurazione
 * del sito (`VITE_ANTHROPIC_API_KEY` in `.env.local`) e viene inclusa nel
 * pacchetto JavaScript al momento della build: chiunque apra il sito può
 * leggerla dagli strumenti per sviluppatori e spenderci sopra. Tienila stretta,
 * mettile un tetto di spesa e ruotala se finisce online.
 * Il file `.env.local` non entra in git (`*.local` è già ignorato).
 *
 * Senza chiave l'assistente non si blocca: passa al generatore locale, che
 * incrocia la descrizione con il catalogo dei servizi. È più grezzo, ma non
 * chiama nessuno e funziona offline.
 */

const MODELLO = 'claude-opus-5'

/* Prezzi di riferimento per area, usati come àncora dal modello.
   TODO: allineali al tuo listino reale — sono la base di ogni stima. */
const LISTINO = {
  prodotto: { giornata: 700, tipico: '18.000–35.000 € per un MVP in quattro settimane' },
  gestionale: { giornata: 700, tipico: '15.000–40.000 € per il primo modulo' },
  'web-app': { giornata: 700, tipico: '12.000–30.000 € per una piattaforma in tre settimane' },
  'siti-web': { giornata: 600, tipico: '3.000–8.000 € una landing, 8.000–20.000 € un e-commerce' },
  mobile: { giornata: 700, tipico: '20.000–45.000 € per iOS e Android da un solo codice' },
  ai: { giornata: 800, tipico: '10.000–25.000 € per il primo assistente in dieci giorni' },
}

/* ------------------------------------------------------------------
   La chiave

   Due strade, in quest'ordine: quella incollata qui dentro (resta in questo
   browser, si attiva subito, non serve ricostruire il sito) e quella della
   build (`VITE_ANTHROPIC_API_KEY` in `.env.local`, inclusa nel pacchetto).
   ------------------------------------------------------------------ */

const CHIAVE = 'levelapp:chiave-ai'

const ascoltatori = new Set()

function leggiLocale() {
  try {
    return window.localStorage.getItem(CHIAVE) ?? ''
  } catch {
    return ''
  }
}

function sottoscrivi(callback) {
  ascoltatori.add(callback)
  window.addEventListener('storage', callback)
  return () => {
    ascoltatori.delete(callback)
    window.removeEventListener('storage', callback)
  }
}

export function chiaveAttiva() {
  return leggiLocale() || import.meta.env.VITE_ANTHROPIC_API_KEY || ''
}

/** Da dove arriva quella in uso: 'locale', 'build' oppure null. */
export function origineChiave() {
  if (leggiLocale()) return 'locale'
  return import.meta.env.VITE_ANTHROPIC_API_KEY ? 'build' : null
}

export function salvaChiave(valore) {
  try {
    window.localStorage.setItem(CHIAVE, valore.trim())
  } catch {
    return false
  }
  ascoltatori.forEach((f) => f())
  return true
}

export function rimuoviChiave() {
  try {
    window.localStorage.removeItem(CHIAVE)
  } catch {
    /* niente da fare */
  }
  ascoltatori.forEach((f) => f())
}

/** Stato della chiave, reattivo: i pannelli si aggiornano appena cambia. */
export function useChiave() {
  const locale = useSyncExternalStore(sottoscrivi, leggiLocale, () => '')
  const dallaBuild = import.meta.env.VITE_ANTHROPIC_API_KEY || ''
  return {
    presente: Boolean(locale || dallaBuild),
    origine: locale ? 'locale' : dallaBuild ? 'build' : null,
    mascherata: (locale || dallaBuild).replace(/^(.{7}).*(.{4})$/, '$1…$2'),
  }
}

export const aiDisponibile = () => Boolean(chiaveAttiva())

/* ------------------------------------------------------------------
   Forma della risposta: il modello deve restituire esattamente questo.
   ------------------------------------------------------------------ */

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['oggetto', 'consegna', 'note', 'voci'],
  properties: {
    oggetto: { type: 'string', description: 'Titolo del lavoro, una riga, senza nome cliente' },
    consegna: { type: 'string', description: 'Tempo di consegna complessivo, es. "4 settimane"' },
    note: { type: 'string', description: 'Cosa resta fuori dal perimetro e cosa serve dal cliente' },
    voci: {
      type: 'array',
      description: 'Da 3 a 8 voci, ordinate come si svolge il lavoro',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['descrizione', 'dettaglio', 'quantita', 'prezzo', 'sconto'],
        properties: {
          descrizione: { type: 'string', description: 'Nome della voce, breve' },
          dettaglio: { type: 'string', description: 'Cosa comprende e cosa resta fuori, 1-2 frasi' },
          quantita: { type: 'number' },
          prezzo: { type: 'number', description: 'Prezzo unitario in euro, imponibile' },
          sconto: { type: 'number', description: 'Sconto percentuale, 0 se non previsto' },
        },
      },
    },
  },
}

const istruzioni = () => `Sei chi scrive i preventivi in LevelApp LLC, software house italiana.
Da una descrizione a parole ricavi un preventivo dettagliato, pronto da mandare al cliente.

Le aree di lavoro, con i tempi che promettiamo e il riferimento di prezzo:
${services
  .map(
    (s) =>
      `- ${s.title} (${s.slug}): ${s.short} Tempi: ${s.tempi}. Giornata ${LISTINO[s.slug]?.giornata} €, ordine di grandezza ${LISTINO[s.slug]?.tipico}.`,
  )
  .join('\n')}

Regole che non si tradiscono:
- Nessun lavoro supera le quattro settimane per il primo rilascio; se la richiesta è più grande, spezzala in voci e dillo nelle note.
- Codice, dati e infrastruttura restano intestati al cliente: non proporre canoni di licenza sul software sviluppato.
- Le voci descrivono lavoro concreto e verificabile (analisi, prototipo, sviluppo di un modulo preciso, migrazione dati, formazione, assistenza), mai etichette vaghe.
- Prezzi realistici e coerenti con le giornate stimate: quantità in giornate o in unità sensate, prezzo unitario imponibile in euro, niente IVA nelle voci.
- Se la descrizione è generica, scegli l'interpretazione più probabile e scrivi nelle note le assunzioni fatte.
- Scrivi in italiano, asciutto, senza superlativi e senza gergo commerciale.`

/** Estrae il JSON dalla risposta, comunque sia impacchettato. */
function leggiJson(risposta) {
  const testo = risposta.content?.find((b) => b.type === 'text')?.text ?? ''
  return JSON.parse(testo)
}

/**
 * Chiede al modello il preventivo. Ritorna `{ fonte, dati }`.
 * `fonte` vale 'ai' oppure 'locale' quando manca la chiave.
 */
export async function compilaPreventivo(descrizione, contesto = {}) {
  const chiave = chiaveAttiva()
  if (!chiave) return { fonte: 'locale', dati: bozzaLocale(descrizione) }

  /* Il modulo del client pesa: si carica solo quando serve davvero, così le
     pagine pubbliche non se lo portano dietro. */
  const { default: Anthropic } = await import('@anthropic-ai/sdk')

  const client = new Anthropic({
    apiKey: chiave,
    // Le chiamate partono dal browser: senza questo il modulo si rifiuta di girare.
    dangerouslyAllowBrowser: true,
  })

  const richiesta = {
    model: MODELLO,
    max_tokens: 8000,
    system: istruzioni(),
    output_config: {
      // Il ragionamento è acceso di suo su questo modello: `medium` tiene
      // l'attesa ragionevole senza perdere qualità su un compito di stesura.
      effort: 'medium',
      format: { type: 'json_schema', schema: SCHEMA },
    },
    messages: [
      {
        role: 'user',
        content: [
          contesto.cliente ? `Cliente: ${contesto.cliente}.` : '',
          'Lavoro da preventivare, a parole del commerciale:',
          descrizione.trim(),
        ]
          .filter(Boolean)
          .join('\n'),
      },
    ],
  }

  /* Se i classificatori rifiutano, l'API rigira la richiesta al modello di
     riserva invece di restituire un rifiuto. È una beta: se l'organizzazione
     non ce l'ha attiva, si riprova senza. */
  let risposta
  try {
    risposta = await client.beta.messages.create({
      ...richiesta,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
    })
  } catch (errore) {
    if (errore?.status !== 400) throw errore
    risposta = await client.messages.create(richiesta)
  }

  if (risposta.stop_reason === 'refusal') {
    throw new Error('Il modello ha rifiutato di rispondere a questa descrizione.')
  }

  return { fonte: 'ai', dati: leggiJson(risposta) }
}

/* ------------------------------------------------------------------
   Generatore locale: nessuna chiamata, nessuna chiave.
   ------------------------------------------------------------------ */

/* Parole che fanno pensare a un'area piuttosto che a un'altra. */
const INDIZI = {
  gestionale: ['gestional', 'erp', 'crm', 'magazzin', 'commess', 'fattur', 'ordini', 'anagrafic'],
  'web-app': ['portale', 'piattaform', 'area riservat', 'intranet', 'saas', 'configurator'],
  'siti-web': ['sito', 'landing', 'vetrina', 'e-commerce', 'ecommerce', 'catalogo', 'shop'],
  mobile: ['app', 'ios', 'android', 'mobile', 'smartphone', 'tablet'],
  ai: ['ai', 'intelligenza', 'assistente', 'chatbot', 'bot', 'documenti', 'rag'],
  prodotto: ['idea', 'mvp', 'prodotto', 'startup', 'lanciare'],
}

export function bozzaLocale(descrizione) {
  const testo = descrizione.toLowerCase()

  const aree = services.filter((s) =>
    (INDIZI[s.slug] ?? []).some((parola) => testo.includes(parola)),
  )
  const scelte = aree.length > 0 ? aree.slice(0, 2) : [services.find((s) => s.slug === 'web-app')]

  const voci = []
  scelte.forEach((servizio, i) => {
    const giornata = LISTINO[servizio.slug]?.giornata ?? 700
    if (i === 0) {
      voci.push({
        descrizione: 'Analisi e perimetro',
        dettaglio:
          'Incontri con chi userà il software, mappa del processo attuale, definizione di cosa entra nel primo rilascio e cosa arriva dopo.',
        quantita: 3,
        prezzo: giornata,
        sconto: 0,
      })
      voci.push({
        descrizione: 'Prototipo navigabile',
        dettaglio: 'Le schermate principali da provare prima che si scriva codice di produzione.',
        quantita: 2,
        prezzo: giornata,
        sconto: 0,
      })
    }
    voci.push({
      descrizione: servizio.title,
      dettaglio: `${servizio.short} ${servizio.deliverables.slice(0, 2).join('. ')}.`,
      quantita: 12,
      prezzo: giornata,
      sconto: 0,
    })
  })

  voci.push({
    descrizione: 'Rilascio, formazione e assistenza',
    dettaglio:
      'Messa in produzione, formazione reparto per reparto e assistenza con tempi concordati per il primo mese.',
    quantita: 3,
    prezzo: LISTINO[scelte[0].slug]?.giornata ?? 700,
    sconto: 0,
  })

  return {
    oggetto: scelte.map((s) => s.title).join(' + '),
    consegna: scelte[0].tempi,
    note: 'Bozza generata dal catalogo interno senza AI: prezzi e giornate sono da rivedere prima di mandarla al cliente.',
    voci,
  }
}
