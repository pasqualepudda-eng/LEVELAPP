import { company } from '../../data/content'
import MarchioStampa from './MarchioStampa'
import { conti, dataIt, euro, rigaImponibile, scadenza } from '../../lib/preventivi'

/**
 * Il foglio che il cliente riceve.
 *
 * Vive in due posti contemporaneamente: nell'anteprima a fianco dell'editor —
 * dove si aggiorna a ogni tasto, così quello che vedi è quello che stampi — e
 * nel blocco nascosto che diventa la pagina in stampa. È lo stesso componente,
 * quindi non possono divergere.
 */
export default function FoglioPreventivo({ preventivo }) {
  const { imponibile, iva, totale } = conti(preventivo)

  return (
    <>
      <header className="foglio-testa">
        <div>
          {/* Segno vettoriale, non il PNG: il file originale è bianco e in
              stampa il filtro che lo invertiva viene scartato — restava un
              marchio bianco su carta bianca. */}
          <div className="foglio-marchio">
            <MarchioStampa size={22} />
            <span className="foglio-nome">{company.name}</span>
          </div>
          <p className="foglio-piccolo">{company.email}</p>
          <p className="foglio-piccolo">{company.phone}</p>
        </div>
        <div className="foglio-destra">
          <h1>Preventivo {preventivo.numero}</h1>
          <p className="foglio-piccolo">Emesso il {dataIt(preventivo.creato)}</p>
          <p className="foglio-piccolo">Valido fino al {dataIt(scadenza(preventivo))}</p>
        </div>
      </header>

      <section className="foglio-blocco">
        <h2>Destinatario</h2>
        <p className="foglio-forte">{preventivo.cliente.azienda || '—'}</p>
        {preventivo.cliente.referente && <p>{preventivo.cliente.referente}</p>}
        {preventivo.cliente.indirizzo && <p>{preventivo.cliente.indirizzo}</p>}
        {(preventivo.cliente.cap || preventivo.cliente.citta) && (
          <p>
            {[preventivo.cliente.cap, preventivo.cliente.citta].filter(Boolean).join(' ')}
            {preventivo.cliente.provincia && ` (${preventivo.cliente.provincia})`}
          </p>
        )}
        {preventivo.cliente.piva && <p>P. IVA {preventivo.cliente.piva}</p>}
        {preventivo.cliente.codiceFiscale &&
          preventivo.cliente.codiceFiscale !== preventivo.cliente.piva && (
            <p>C.F. {preventivo.cliente.codiceFiscale}</p>
          )}
        {preventivo.cliente.pec && <p>PEC {preventivo.cliente.pec}</p>}
        {preventivo.cliente.email && <p>{preventivo.cliente.email}</p>}
        {preventivo.cliente.telefono && <p>{preventivo.cliente.telefono}</p>}
      </section>

      {preventivo.oggetto && (
        <section className="foglio-blocco">
          <h2>Oggetto</h2>
          <p className="foglio-forte">{preventivo.oggetto}</p>
          <p>Consegna: {preventivo.consegna}</p>
        </section>
      )}

      <table className="foglio-tabella">
        <thead>
          <tr>
            <th>Voce</th>
            <th className="num">Q.tà</th>
            <th className="num">Prezzo</th>
            <th className="num">Sconto</th>
            <th className="num">Importo</th>
          </tr>
        </thead>
        <tbody>
          {preventivo.voci.length === 0 ? (
            <tr>
              <td colSpan="5" className="foglio-vuoto">
                Nessuna voce inserita.
              </td>
            </tr>
          ) : (
            preventivo.voci.map((v) => (
              <tr key={v.id}>
                <td>
                  <span className="foglio-forte">{v.descrizione || 'Voce'}</span>
                  {v.dettaglio && <span className="foglio-dettaglio">{v.dettaglio}</span>}
                </td>
                <td className="num">{v.quantita}</td>
                <td className="num">{euro(v.prezzo)}</td>
                <td className="num">{Number(v.sconto) > 0 ? `${v.sconto}%` : '—'}</td>
                <td className="num">{euro(rigaImponibile(v))}</td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Imponibile</td>
            <td className="num">{euro(imponibile)}</td>
          </tr>
          <tr>
            <td colSpan="4">IVA {preventivo.iva}%</td>
            <td className="num">{euro(iva)}</td>
          </tr>
          <tr className="foglio-totale">
            <td colSpan="4">Totale</td>
            <td className="num">{euro(totale)}</td>
          </tr>
        </tfoot>
      </table>

      {preventivo.note && (
        <section className="foglio-blocco">
          <h2>Note</h2>
          <p>{preventivo.note}</p>
        </section>
      )}

      <section className="foglio-blocco">
        <h2>Condizioni</h2>
        <p>{preventivo.condizioni}</p>
      </section>

      <footer className="foglio-piede">
        {company.name} · {company.email} · documento generato il{' '}
        {dataIt(new Date().toISOString())}
      </footer>
    </>
  )
}
