import Icon from '../ui/Icon'
import { Avanzamento, Avatar, Badge, Sparkline } from '../ui/MockBits'

/**
 * Anteprime dei moduli del costruttore: schermate finte ma dense, con la
 * roba che c'è davvero in un gestionale — barra strumenti, filtri, tabelle con
 * avanzamenti e stati, cruscotti con serie storiche, form a sezioni, agenda
 * settimanale, conversazione con le fonti, terminale di reparto.
 *
 * È tutto decorativo: `aria-hidden` sull'involucro, così chi usa uno screen
 * reader sente il nome e la descrizione del modulo e non trenta numeri finti.
 */

/* ------------------------------------------------------------------
   Pezzi condivisi
   ------------------------------------------------------------------ */

/** Barra strumenti: ricerca, filtri, cambio vista, azione principale. */
function Strumenti({ cerca, filtri, azione, accent }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 border-b border-line-muted px-3 py-2">
      <span className="flex h-6 min-w-0 flex-1 items-center gap-1.5 rounded-md border border-line bg-canvas px-2 text-[10.5px] text-fg-subtle">
        <Icon name="search" size={10} />
        <span className="truncate">{cerca}</span>
      </span>

      {filtri.map((f) => (
        <span
          key={f}
          className="flex h-6 items-center gap-1 rounded-md border border-line bg-canvas px-2 text-[10px] whitespace-nowrap text-fg-muted"
        >
          {f}
          <Icon name="chevronDown" size={9} className="text-fg-subtle" />
        </span>
      ))}

      <span className="hidden h-6 items-center rounded-md border border-line bg-canvas sm:flex">
        <span className="flex size-6 items-center justify-center rounded-l-md bg-canvas-subtle text-fg">
          <Icon name="layers" size={10} />
        </span>
        <span className="flex size-6 items-center justify-center text-fg-subtle">
          <Icon name="graph" size={10} />
        </span>
      </span>

      <span
        className="flex h-6 items-center gap-1 rounded-md px-2 text-[10px] font-medium text-white"
        style={{ backgroundColor: accent }}
      >
        <Icon name="plus" size={9} />
        {azione}
      </span>
    </div>
  )
}

function PiePagina({ testo, extra }) {
  return (
    <div className="flex items-center justify-between gap-2 border-t border-line-muted px-3 py-2">
      <span className="font-mono text-[9.5px] text-fg-subtle">{testo}</span>
      <span className="flex items-center gap-1">
        {extra}
        <span className="flex size-5 items-center justify-center rounded border border-line text-fg-subtle">
          <Icon name="chevronRight" size={9} style={{ transform: 'scaleX(-1)' }} />
        </span>
        <span className="flex size-5 items-center justify-center rounded border border-line text-fg">
          <Icon name="chevronRight" size={9} />
        </span>
      </span>
    </div>
  )
}

/* ------------------------------------------------------------------
   Tabella: elenco operativo con selezione, avanzamento e stati
   ------------------------------------------------------------------ */

const RIGHE = [
  ['RIF-2419', 'Novaform', 'Giulia Marchetti', 72, '14 mar', 'In corso'],
  ['RIF-2418', 'Arkadia', 'Marco Serra', 91, '15 mar', 'Collaudo'],
  ['RIF-2417', 'Officine V', 'Elena Bosco', 45, '18 mar', 'In corso'],
  ['RIF-2415', 'Marea', 'Davide Fini', 100, '11 mar', 'Chiuso'],
  ['RIF-2414', 'Poliedra', 'Sara Conti', 28, '22 mar', 'In attesa'],
  ['RIF-2411', 'Sintesi', 'Luca Amato', 64, '25 mar', 'In corso'],
]

const TONO_STATO = {
  'In corso': 'var(--color-accent)',
  Collaudo: 'var(--color-purple)',
  Chiuso: 'var(--color-success)',
  'In attesa': 'var(--color-attention)',
}

function Tabella({ accent }) {
  return (
    <div className="overflow-hidden rounded-md border border-line bg-canvas">
      <Strumenti
        cerca="Cerca per codice, cliente o referente…"
        filtri={['Stato', 'Ultimi 30 giorni']}
        azione="Nuovo"
        accent={accent}
      />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-line-muted bg-canvas-subtle text-[9.5px] tracking-wide text-fg-muted uppercase">
              <th className="w-7 px-3 py-1.5 font-medium">
                <span className="block size-3 rounded-[3px] border border-line" />
              </th>
              <th className="px-2 py-1.5 font-medium">Codice</th>
              <th className="px-2 py-1.5 font-medium">Cliente</th>
              <th className="px-2 py-1.5 font-medium">Referente</th>
              <th className="px-2 py-1.5 font-medium">Avanzamento</th>
              <th className="px-2 py-1.5 font-medium">Consegna</th>
              <th className="px-2 py-1.5 font-medium">Stato</th>
            </tr>
          </thead>
          <tbody>
            {RIGHE.map(([codice, cliente, referente, pct, data, stato], i) => (
              <tr
                key={codice}
                className={`border-b border-line-muted last:border-0 ${i === 0 ? 'bg-canvas-subtle' : ''}`}
              >
                <td className="px-3 py-1.5">
                  <span
                    className="flex size-3 items-center justify-center rounded-[3px] border"
                    style={
                      i === 0
                        ? {
                            borderColor: accent,
                            backgroundColor: accent,
                            color: '#fff',
                          }
                        : { borderColor: 'var(--color-line)' }
                    }
                  >
                    {i === 0 && <Icon name="check" size={8} />}
                  </span>
                </td>
                <td className="px-2 py-1.5 font-mono text-[10px] text-fg-subtle">{codice}</td>
                <td className="px-2 py-1.5 text-[11px] font-medium text-fg">{cliente}</td>
                <td className="px-2 py-1.5">
                  <span className="flex items-center gap-1.5 text-[10.5px] text-fg-muted">
                    <Avatar nome={referente} />
                    <span className="hidden truncate sm:inline">{referente}</span>
                  </span>
                </td>
                <td className="px-2 py-1.5">
                  <Avanzamento valore={pct} tono={TONO_STATO[stato]} />
                </td>
                <td className="px-2 py-1.5 font-mono text-[10px] text-fg-muted">{data}</td>
                <td className="px-2 py-1.5">
                  <Badge tono={TONO_STATO[stato]}>{stato}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PiePagina
        testo="6 di 128 righe · 1 selezionata"
        extra={
          <span className="mr-1 hidden items-center gap-1 rounded border border-line px-1.5 py-0.5 text-[9.5px] text-fg-muted sm:flex">
            <Icon name="file" size={9} />
            Esporta
          </span>
        }
      />
    </div>
  )
}

/* ------------------------------------------------------------------
   Cruscotto: numeri, serie storica, ripartizione, ultime attività
   ------------------------------------------------------------------ */

const KPI = [
  {
    label: 'Commesse aperte',
    valore: '38',
    delta: '+6',
    su: true,
    serie: [12, 18, 14, 22, 19, 26, 31],
  },
  {
    label: 'Marginalità media',
    valore: '24,8%',
    delta: '+2,1',
    su: true,
    serie: [18, 19, 21, 20, 23, 24, 25],
  },
  {
    label: 'Consegne in ritardo',
    valore: '4',
    delta: '−2',
    su: false,
    serie: [9, 8, 7, 8, 6, 5, 4],
  },
  {
    label: 'Ore a consuntivo',
    valore: '1.284',
    delta: '+112',
    su: true,
    serie: [800, 940, 910, 1050, 1120, 1200, 1284],
  },
]

const BARRE = [
  [48, 42],
  [56, 51],
  [51, 46],
  [67, 62],
  [72, 58],
  [64, 61],
  [78, 71],
  [83, 74],
  [76, 80],
  [88, 79],
  [92, 86],
  [85, 90],
]

const MESI = ['G', 'F', 'M', 'A', 'M', 'G', 'L', 'A', 'S', 'O', 'N', 'D']

const RIPARTIZIONE = [
  ['In produzione', 46, 'var(--color-accent)'],
  ['Collaudo', 22, 'var(--color-purple)'],
  ['Consegnate', 24, 'var(--color-success)'],
  ['In attesa', 8, 'var(--color-attention)'],
]

const ATTIVITA = [
  ['check', 'RIF-2415 chiusa da Davide Fini', '12 min fa', 'var(--color-success)'],
  ['file', 'Caricato collaudo RIF-2418.pdf', '38 min fa', 'var(--color-accent)'],
  ['issue', 'Non conformità aperta su RIF-2417', '1 h fa', 'var(--color-danger)'],
  ['users', 'Sara Conti assegnata a RIF-2414', '2 h fa', 'var(--color-fg-muted)'],
]

function Cruscotto({ accent }) {
  return (
    <div className="overflow-hidden rounded-md border border-line bg-canvas">
      <Strumenti
        cerca="Filtra per commessa, cliente o reparto…"
        filtri={['Anno corrente', 'Tutti i reparti']}
        azione="Report"
        accent={accent}
      />

      <div className="grid grid-cols-2 gap-px bg-line-muted lg:grid-cols-4">
        {KPI.map((k) => (
          <div key={k.label} className="bg-canvas p-2.5">
            <p className="truncate text-[9.5px] text-fg-muted">{k.label}</p>
            <p className="mt-0.5 flex items-baseline gap-1.5">
              <span className="text-[15px] font-semibold text-fg">{k.valore}</span>
              <span
                className="text-[9.5px] font-medium"
                style={{
                  color: k.su ? 'var(--color-success)' : 'var(--color-danger)',
                }}
              >
                {k.delta}
              </span>
            </p>
            <div className="mt-1">
              <Sparkline
                punti={k.serie}
                tono={k.su ? 'var(--color-success)' : 'var(--color-danger)'}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-2.5 border-t border-line-muted p-2.5 lg:grid-cols-[1.6fr_1fr]">
        {/* Serie storica */}
        <div className="rounded-md border border-line p-2.5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10.5px] font-semibold text-fg">Ore pianificate e a consuntivo</p>
            <span className="flex items-center gap-2 text-[9px] text-fg-muted">
              <span className="flex items-center gap-1">
                <span className="size-1.5 rounded-full" style={{ backgroundColor: accent }} />
                Pianificato
              </span>
              <span className="flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-fg-subtle" />
                Effettivo
              </span>
            </span>
          </div>

          <div className="mt-2 flex gap-1.5">
            <div className="flex flex-col justify-between py-0.5 font-mono text-[8px] text-fg-subtle">
              <span>1.5k</span>
              <span>750</span>
              <span>0</span>
            </div>
            <div className="flex h-24 flex-1 items-end gap-[3px] border-b border-l border-line-muted pb-0.5 pl-1">
              {BARRE.map(([pian, eff], i) => (
                <span key={i} className="flex h-full flex-1 items-end gap-[1px]">
                  <span
                    className="w-1/2 rounded-t-[2px]"
                    style={{
                      height: `${pian}%`,
                      backgroundColor: accent,
                      opacity: 0.85,
                    }}
                  />
                  <span
                    className="w-1/2 rounded-t-[2px] bg-fg-subtle"
                    style={{ height: `${eff}%`, opacity: 0.55 }}
                  />
                </span>
              ))}
            </div>
          </div>
          <div className="mt-1 flex justify-between pl-6 font-mono text-[8px] text-fg-subtle">
            {MESI.map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
        </div>

        {/* Ripartizione + attività */}
        <div className="space-y-2.5">
          <div className="rounded-md border border-line p-2.5">
            <p className="text-[10.5px] font-semibold text-fg">Ripartizione per stato</p>
            <div className="mt-2 flex h-2 overflow-hidden rounded-full">
              {RIPARTIZIONE.map(([nome, quota, tono]) => (
                <span key={nome} style={{ width: `${quota}%`, backgroundColor: tono }} />
              ))}
            </div>
            <ul className="mt-2 space-y-1">
              {RIPARTIZIONE.map(([nome, quota, tono]) => (
                <li key={nome} className="flex items-center gap-1.5 text-[9.5px] text-fg-muted">
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: tono }} />
                  <span className="flex-1 truncate">{nome}</span>
                  <span className="font-mono text-fg">{quota}%</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-md border border-line p-2.5">
            <p className="text-[10.5px] font-semibold text-fg">Ultime attività</p>
            <ul className="mt-2 space-y-1.5">
              {ATTIVITA.map(([icona, testo, quando, tono]) => (
                <li key={testo} className="flex items-start gap-1.5">
                  <Icon
                    name={icona}
                    size={10}
                    className="mt-0.5 shrink-0"
                    style={{ color: tono }}
                  />
                  <span className="min-w-0 flex-1 truncate text-[9.5px] text-fg">{testo}</span>
                  <span className="font-mono text-[8.5px] whitespace-nowrap text-fg-subtle">
                    {quando}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
   Form: scheda a sezioni con righe di dettaglio e riepilogo
   ------------------------------------------------------------------ */

const CAMPI_GENERALI = [
  ['Codice', 'RIF-2419', 'assegnato in automatico'],
  ['Cliente', 'Novaform S.p.A.', ''],
  ['Referente', 'Giulia Marchetti', ''],
  ['Data richiesta', '04/03/2026', ''],
]

const CAMPI_CONDIZIONI = [
  ['Priorità', 'Alta', ''],
  ['Reparto', 'Lavorazioni speciali', ''],
  ['Consegna prevista', '14/03/2026', 'due giorni di margine'],
  ['Responsabile', 'Marco Serra', ''],
]

const RIGHE_DETTAGLIO = [
  ['ART-118', 'Profilo alluminio 40×40', '120 pz'],
  ['ART-204', 'Staffa d’aggancio', '240 pz'],
  ['LAV-07', 'Verniciatura a polvere', '1 lotto'],
]

function Scheda({ accent }) {
  return (
    <div className="overflow-hidden rounded-md border border-line bg-canvas">
      <div className="flex flex-wrap items-center gap-2 border-b border-line-muted px-3 py-2">
        <span className="font-mono text-[10px] text-fg-subtle">RIF-2419</span>
        <Badge tono={accent}>Bozza</Badge>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="flex h-6 items-center rounded-md border border-line px-2 text-[10px] text-fg-muted">
            Annulla
          </span>
          <span
            className="flex h-6 items-center gap-1 rounded-md px-2 text-[10px] font-medium text-white"
            style={{ backgroundColor: accent }}
          >
            <Icon name="check" size={9} />
            Salva
          </span>
        </span>
      </div>

      <div className="grid gap-2.5 p-2.5 lg:grid-cols-[1.7fr_1fr]">
        <div className="space-y-2.5">
          {[
            ['Dati generali', CAMPI_GENERALI],
            ['Condizioni di lavorazione', CAMPI_CONDIZIONI],
          ].map(([titolo, campi]) => (
            <div key={titolo} className="rounded-md border border-line p-2.5">
              <p className="text-[10.5px] font-semibold text-fg">{titolo}</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {campi.map(([etichetta, valore, aiuto]) => (
                  <div key={etichetta}>
                    <p className="text-[9px] font-medium text-fg-muted">{etichetta}</p>
                    <p className="mt-0.5 flex h-6 items-center rounded border border-line bg-canvas-subtle px-2 text-[10.5px] text-fg">
                      {valore}
                    </p>
                    {aiuto && <p className="mt-0.5 text-[8.5px] text-fg-subtle">{aiuto}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Righe di dettaglio */}
          <div className="rounded-md border border-line">
            <div className="flex items-center justify-between border-b border-line-muted px-2.5 py-1.5">
              <p className="text-[10.5px] font-semibold text-fg">Righe</p>
              <span className="flex items-center gap-1 text-[9.5px]" style={{ color: accent }}>
                <Icon name="plus" size={9} />
                Aggiungi riga
              </span>
            </div>
            {RIGHE_DETTAGLIO.map(([codice, descrizione, qta]) => (
              <div
                key={codice}
                className="flex items-center gap-2 border-b border-line-muted px-2.5 py-1.5 last:border-0"
              >
                <span className="font-mono text-[9.5px] text-fg-subtle">{codice}</span>
                <span className="min-w-0 flex-1 truncate text-[10.5px] text-fg">{descrizione}</span>
                <span className="font-mono text-[9.5px] text-fg-muted">{qta}</span>
                <Icon name="dash" size={10} className="text-fg-subtle" />
              </div>
            ))}
          </div>
        </div>

        {/* Riepilogo */}
        <div className="space-y-2.5">
          <div className="rounded-md border border-line p-2.5">
            <p className="text-[10.5px] font-semibold text-fg">Riepilogo</p>
            <ul className="mt-2 space-y-1.5 text-[9.5px]">
              {[
                ['Righe', '3'],
                ['Quantità totale', '361 pz'],
                ['Ore stimate', '46'],
                ['Reparti coinvolti', '2'],
              ].map(([k, v]) => (
                <li key={k} className="flex items-center justify-between gap-2">
                  <span className="text-fg-muted">{k}</span>
                  <span className="font-mono text-fg">{v}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-md border border-line p-2.5">
            <p className="text-[10.5px] font-semibold text-fg">Controlli</p>
            <ul className="mt-2 space-y-1.5">
              {[
                ['Anagrafica cliente completa', true],
                ['Disponibilità materiali verificata', true],
                ['Approvazione responsabile', false],
              ].map(([testo, fatto]) => (
                <li key={testo} className="flex items-start gap-1.5 text-[9.5px]">
                  <Icon
                    name={fatto ? 'check' : 'clock'}
                    size={10}
                    className="mt-px shrink-0"
                    style={{
                      color: fatto ? 'var(--color-success)' : 'var(--color-attention)',
                    }}
                  />
                  <span className={fatto ? 'text-fg-muted' : 'text-fg'}>{testo}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
   Agenda: settimana con fasce orarie, mini calendario, impegni
   ------------------------------------------------------------------ */

const GIORNI = ['Lun 9', 'Mar 10', 'Mer 11', 'Gio 12', 'Ven 13']
const ORE = ['09', '11', '13', '15', '17']

// [giorno, riga di partenza, durata in righe, titolo, tono]
const EVENTI = [
  [0, 0, 2, 'Sopralluogo Novaform', 'var(--color-accent)'],
  [1, 1, 1, 'Collaudo Arkadia', 'var(--color-purple)'],
  [2, 0, 1, 'Riunione produzione', 'var(--color-attention)'],
  [2, 2, 2, 'Formazione reparto', 'var(--color-success)'],
  [3, 1, 2, 'Visita Officine V', 'var(--color-accent)'],
  [4, 3, 1, 'Chiusura settimana', 'var(--color-fg-muted)'],
]

const PROSSIMI = [
  ['09:30', 'Sopralluogo Novaform', 'Via Esempio 12, Roma'],
  ['14:00', 'Collaudo Arkadia', 'Da remoto'],
  ['16:30', 'Allineamento produzione', 'Reparto 2'],
]

function Agenda({ accent }) {
  return (
    <div className="overflow-hidden rounded-md border border-line bg-canvas">
      <Strumenti
        cerca="Cerca un impegno o una persona…"
        filtri={['Questa settimana', 'Tutto il team']}
        azione="Nuovo"
        accent={accent}
      />

      <div className="grid gap-2.5 p-2.5 lg:grid-cols-[1.7fr_1fr]">
        <div className="rounded-md border border-line p-2">
          <div className="grid grid-cols-[1.6rem_repeat(5,1fr)] gap-1">
            <span />
            {GIORNI.map((g, i) => (
              <span
                key={g}
                className={`rounded py-0.5 text-center text-[9px] font-medium ${
                  i === 2 ? 'text-fg' : 'text-fg-muted'
                }`}
                style={
                  i === 2
                    ? {
                        backgroundColor: `color-mix(in oklab, ${accent} 14%, transparent)`,
                      }
                    : undefined
                }
              >
                {g}
              </span>
            ))}

            {ORE.map((ora, riga) => (
              <span key={ora} className="contents">
                <span className="pt-0.5 text-right font-mono text-[8px] text-fg-subtle">{ora}</span>
                {GIORNI.map((g, colonna) => {
                  const evento = EVENTI.find(([c, r]) => c === colonna && r === riga)
                  return (
                    <span
                      key={g + ora}
                      className="min-h-[1.6rem] rounded border border-dashed border-line-muted p-px"
                    >
                      {evento && (
                        <span
                          className="flex h-full flex-col justify-center rounded px-1 py-0.5 text-[8.5px] leading-tight font-medium"
                          style={{
                            color: evento[4],
                            backgroundColor: `color-mix(in oklab, ${evento[4]} 12%, transparent)`,
                            borderLeft: `2px solid ${evento[4]}`,
                            minHeight: `${evento[2] * 1.6}rem`,
                          }}
                        >
                          {evento[3]}
                        </span>
                      )}
                    </span>
                  )
                })}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="rounded-md border border-line p-2.5">
            <p className="text-[10.5px] font-semibold text-fg">Marzo 2026</p>
            <div className="mt-1.5 grid grid-cols-7 gap-0.5">
              {Array.from({ length: 35 }).map((_, i) => {
                const giorno = i - 2
                const attivo = giorno === 11
                const pieno = [3, 5, 9, 11, 12, 17, 23].includes(giorno)
                return (
                  <span
                    key={i}
                    className={`flex aspect-square items-center justify-center rounded text-[8px] ${
                      attivo ? 'font-semibold text-white' : pieno ? 'text-fg' : 'text-fg-subtle'
                    }`}
                    style={
                      attivo
                        ? { backgroundColor: accent }
                        : pieno
                          ? {
                              backgroundColor: `color-mix(in oklab, ${accent} 12%, transparent)`,
                            }
                          : undefined
                    }
                  >
                    {giorno > 0 && giorno <= 31 ? giorno : ''}
                  </span>
                )
              })}
            </div>
          </div>

          <div className="rounded-md border border-line p-2.5">
            <p className="text-[10.5px] font-semibold text-fg">Oggi</p>
            <ul className="mt-2 space-y-1.5">
              {PROSSIMI.map(([ora, titolo, dove]) => (
                <li key={titolo} className="flex gap-2">
                  <span className="font-mono text-[9px] text-fg-subtle">{ora}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-[10px] font-medium text-fg">{titolo}</span>
                    <span className="block truncate text-[9px] text-fg-muted">{dove}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
   Chat: conversazione con fonti, azioni e cronologia
   ------------------------------------------------------------------ */

const CRONOLOGIA = [
  ['Condizioni di reso Novaform', 'oggi'],
  ['Scadenze contratti Q2', 'ieri'],
  ['Capitolato Officine V', '3 giorni fa'],
]

function Chat({ accent }) {
  return (
    <div className="overflow-hidden rounded-md border border-line bg-canvas">
      <div className="flex items-center gap-2 border-b border-line-muted px-3 py-2">
        <Icon name="sparkle" size={12} style={{ color: accent }} />
        <span className="text-[10.5px] font-semibold text-fg">Assistente sui documenti</span>
        <span className="ml-auto flex items-center gap-1 rounded-full border border-line px-1.5 py-0.5 text-[9px] text-fg-muted">
          <Icon name="lock" size={8} />
          permessi utente
        </span>
      </div>

      <div className="grid lg:grid-cols-[1fr_11rem]">
        <div className="min-w-0 p-2.5">
          <div className="space-y-2">
            <p className="ml-auto max-w-[85%] rounded-lg rounded-br-sm border border-line bg-canvas-subtle px-2.5 py-1.5 text-[10.5px] text-fg">
              Quali condizioni di reso abbiamo concordato con Novaform?
            </p>

            <div className="max-w-[92%] rounded-lg rounded-bl-sm border border-line px-2.5 py-2">
              <p className="text-[10.5px] leading-relaxed text-fg">
                Reso entro 30 giorni sui prodotti a catalogo, escluse le lavorazioni su misura. Le
                spese di rientro sono a carico del cliente sopra i 20 kg.
              </p>
              <ul className="mt-2 space-y-1 border-t border-line-muted pt-1.5">
                {[
                  ['Contratto Novaform 2024.pdf', 'art. 7'],
                  ['Allegato condizioni logistiche', 'p. 3'],
                ].map(([file, punto]) => (
                  <li key={file} className="flex items-center gap-1.5 font-mono text-[9px]">
                    <Icon name="file" size={9} className="shrink-0 text-fg-subtle" />
                    <span className="min-w-0 flex-1 truncate text-fg-muted">{file}</span>
                    <span style={{ color: accent }}>{punto}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex flex-wrap gap-1">
                {['Apri il contratto', 'Cerca casi simili', 'Copia risposta'].map((azione) => (
                  <span
                    key={azione}
                    className="rounded-md border border-line px-1.5 py-0.5 text-[9px] text-fg-muted"
                  >
                    {azione}
                  </span>
                ))}
              </div>
            </div>

            <p className="ml-auto max-w-[85%] rounded-lg rounded-br-sm border border-line bg-canvas-subtle px-2.5 py-1.5 text-[10.5px] text-fg">
              Ci sono commesse aperte in questa casistica?
            </p>

            <div className="flex items-center gap-1 px-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: accent, opacity: 0.3 + i * 0.25 }}
                />
              ))}
              <span className="ml-1 text-[9px] text-fg-subtle">sta cercando nei documenti…</span>
            </div>
          </div>

          <div className="mt-2.5 flex items-center gap-1.5 rounded-md border border-line px-2 py-1.5">
            <Icon name="plus" size={11} className="text-fg-subtle" />
            <span className="flex-1 truncate text-[10px] text-fg-subtle">
              Chiedi qualcosa ai tuoi documenti…
            </span>
            <span
              className="flex size-5 items-center justify-center rounded text-white"
              style={{ backgroundColor: accent }}
            >
              <Icon name="arrowRight" size={9} />
            </span>
          </div>
        </div>

        <div className="hidden border-l border-line-muted p-2.5 lg:block">
          <p className="text-[9px] font-semibold tracking-wide text-fg-subtle uppercase">
            Conversazioni
          </p>
          <ul className="mt-1.5 space-y-1">
            {CRONOLOGIA.map(([titolo, quando], i) => (
              <li
                key={titolo}
                className={`rounded px-1.5 py-1 ${i === 0 ? 'bg-canvas-subtle' : ''}`}
              >
                <span className="block truncate text-[9.5px] text-fg">{titolo}</span>
                <span className="block text-[8.5px] text-fg-subtle">{quando}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
   Terminale: postazione di reparto
   ------------------------------------------------------------------ */

const TASTI = [
  ['Avvio', 'play', true],
  ['Pausa', 'clock', false],
  ['Fermo macchina', 'dash', false],
  ['Pezzo conforme', 'check', false],
  ['Scarto', 'x', false],
  ['Fine lavorazione', 'verified', false],
]

const MACCHINE = [
  ['CNC-01', 'In lavorazione', 'var(--color-success)'],
  ['CNC-02', 'In attrezzaggio', 'var(--color-attention)'],
  ['PRE-03', 'Ferma', 'var(--color-danger)'],
]

function Terminale({ accent }) {
  return (
    <div className="overflow-hidden rounded-md border border-line bg-canvas">
      <div className="flex flex-wrap items-center gap-2 border-b border-line-muted px-3 py-2">
        <span className="font-mono text-[10px] text-fg-subtle">ODL-4417</span>
        <span className="text-[10.5px] font-medium text-fg">Profilo alluminio 40×40</span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-fg-muted">
          <Icon name="clock" size={10} />
          01:42:08
        </span>
      </div>

      <div className="grid gap-2.5 p-2.5 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-2.5">
          <div className="rounded-md border border-line p-2.5">
            <div className="flex items-center justify-between text-[9.5px] text-fg-muted">
              <span>Avanzamento lotto</span>
              <span className="font-mono text-fg">86 / 120 pz</span>
            </div>
            <span className="mt-1.5 block h-2 overflow-hidden rounded-full bg-line-muted">
              <span
                className="block h-full rounded-full"
                style={{ width: '72%', backgroundColor: accent }}
              />
            </span>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[
                ['Conformi', '84', 'var(--color-success)'],
                ['Scarti', '2', 'var(--color-danger)'],
                ['Ciclo medio', '48 s', 'var(--color-fg)'],
              ].map(([label, valore, tono]) => (
                <div key={label} className="rounded border border-line px-2 py-1.5">
                  <p className="text-[8.5px] text-fg-muted">{label}</p>
                  <p className="font-mono text-[12px] font-semibold" style={{ color: tono }}>
                    {valore}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {TASTI.map(([label, icona, attivo]) => (
              <span
                key={label}
                className="flex h-12 flex-col items-center justify-center gap-1 rounded-md border text-[9px] font-semibold"
                style={
                  attivo
                    ? {
                        borderColor: accent,
                        color: accent,
                        backgroundColor: `color-mix(in oklab, ${accent} 12%, transparent)`,
                      }
                    : {
                        borderColor: 'var(--color-line)',
                        color: 'var(--color-fg-muted)',
                      }
                }
              >
                <Icon name={icona} size={12} />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="rounded-md border border-line p-2.5">
            <p className="text-[10.5px] font-semibold text-fg">Stato macchine</p>
            <ul className="mt-2 space-y-1.5">
              {MACCHINE.map(([nome, stato, tono]) => (
                <li key={nome} className="flex items-center gap-1.5 text-[9.5px]">
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: tono }} />
                  <span className="font-mono text-fg-subtle">{nome}</span>
                  <span className="ml-auto" style={{ color: tono }}>
                    {stato}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-md border border-line p-2.5">
            <p className="text-[10.5px] font-semibold text-fg">Prossimi ordini</p>
            <ul className="mt-2 space-y-1.5">
              {[
                ['ODL-4418', 'Staffa d’aggancio', '240 pz'],
                ['ODL-4419', 'Piastra forata', '60 pz'],
              ].map(([codice, articolo, qta]) => (
                <li key={codice} className="flex items-center gap-1.5 text-[9.5px]">
                  <span className="font-mono text-fg-subtle">{codice}</span>
                  <span className="min-w-0 flex-1 truncate text-fg">{articolo}</span>
                  <span className="font-mono text-fg-muted">{qta}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
   Selettore
   ------------------------------------------------------------------ */

export default function AnteprimaModulo({ modulo, accent }) {
  const contenuto = {
    cruscotto: <Cruscotto accent={accent} />,
    form: <Scheda accent={accent} />,
    agenda: <Agenda accent={accent} />,
    chat: <Chat accent={accent} />,
    terminale: <Terminale accent={accent} />,
  }[modulo.kind] ?? <Tabella accent={accent} />

  return <div aria-hidden="true">{contenuto}</div>
}
