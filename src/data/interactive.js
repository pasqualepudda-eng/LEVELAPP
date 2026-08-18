/**
 * Contenuti dei giochi della pagina interattiva.
 *
 * Punteggi e progressi vivono solo nello stato di React: non tocchiamo
 * localStorage, quindi a ogni ricaricamento si riparte da zero.
 */

/* ------------------------------------------------------------------
   Gioco 1 — Trova il bug
   ------------------------------------------------------------------ */

/**
 * Sei round di Rust in difficoltà crescente: i frammenti si allungano e il
 * difetto si nasconde sempre meglio. Nessuno di questi è un errore di sintassi
 * — compilano tutti, e sbagliano a runtime o in silenzio.
 */
export const bugRounds = [
  {
    livello: 'riscaldamento',
    filename: 'anagrafiche.rs',
    lines: [
      'use std::collections::HashSet;',
      '',
      '/// Ripulisce i codici articolo importati dal vecchio gestionale.',
      'pub fn codici_unici(righe: Vec<Riga>) -> Vec<String> {',
      '    let mut codici: Vec<String> = righe',
      '        .into_iter()',
      '        .map(|r| r.codice.trim().to_uppercase())',
      '        .collect();',
      '',
      '    codici.dedup();',
      '',
      '    codici',
      '}',
    ],
    buggy: 9,
    explanation:
      '`dedup` rimuove solo i duplicati **consecutivi**: su un elenco non ordinato ne lascia passare la maggior parte, e l’import prosegue con codici ripetuti. O si ordina prima (`sort_unstable` + `dedup`), o si passa da un `HashSet` — che infatti è già importato e mai usato, altro indizio.',
  },
  {
    livello: 'facile',
    filename: 'turni.rs',
    lines: [
      'pub struct Turno {',
      '    pub inizio: u32, // minuti dalla mezzanotte',
      '    pub fine: u32,',
      '}',
      '',
      'impl Turno {',
      '    /// Durata del turno in minuti.',
      '    pub fn durata(&self) -> u32 {',
      '        self.fine - self.inizio',
      '    }',
      '',
      '    pub fn copre(&self, minuto: u32) -> bool {',
      '        minuto >= self.inizio && minuto < self.fine',
      '    }',
      '}',
    ],
    buggy: 8,
    explanation:
      'Il turno di notte finisce dopo la mezzanotte: `fine` (06:00 → 360) è minore di `inizio` (22:00 → 1320) e la sottrazione fra `u32` va sotto zero. In debug è un panico, in release il valore si avvolge e la durata diventa oltre quattro milioni di minuti — che poi finiscono nel consuntivo. Serve la gestione del giorno successivo, con `checked_sub` o aritmetica sui minuti totali.',
  },
  {
    livello: 'medio',
    filename: 'ricerca.rs',
    lines: [
      'pub struct Commessa {',
      '    pub codice: String,',
      '    pub apertura: NaiveDate,',
      '}',
      '',
      '/// Le commesse arrivano dal database ordinate per data di apertura.',
      'pub fn trova(commesse: &[Commessa], codice: &str) -> Option<usize> {',
      '    let esito = commesse.binary_search_by(|c| c.codice.as_str().cmp(codice));',
      '',
      '    match esito {',
      '        Ok(i) => Some(i),',
      '        Err(_) => None,',
      '    }',
      '}',
      '',
      '// chiamata:',
      '// let i = trova(&commesse_per_data, "CM-2419");',
    ],
    buggy: 7,
    explanation:
      'La ricerca binaria richiede che la sequenza sia ordinata **secondo lo stesso criterio** del confronto. Qui le commesse arrivano ordinate per data ma si cerca per codice: il risultato non è casuale in modo evidente, è casuale in modo subdolo — a volte trova, a volte no, e cambia quando cambiano i dati. O si ordina per codice, o si scorre con `iter().position(...)`.',
  },
  {
    livello: 'difficile',
    filename: 'importazione.rs',
    lines: [
      'use tokio::task::JoinSet;',
      '',
      '/// Importa i documenti di un cliente, uno per fornitore.',
      'pub async fn importa(fornitori: Vec<Fornitore>, db: Arc<Db>) -> Result<usize> {',
      '    let mut set = JoinSet::new();',
      '',
      '    for f in fornitori {',
      '        let db = db.clone();',
      '        set.spawn(async move {',
      '            let righe = scarica(&f).await?;',
      '            let n = righe.len();',
      '            std::thread::sleep(Duration::from_millis(200));',
      '            db.inserisci(righe).await?;',
      '            Ok::<usize, Error>(n)',
      '        });',
      '    }',
      '',
      '    let mut totale = 0;',
      '    while let Some(esito) = set.join_next().await {',
      '        totale += esito??;',
      '    }',
      '',
      '    Ok(totale)',
      '}',
    ],
    buggy: 11,
    explanation:
      '`std::thread::sleep` blocca il **thread del runtime**, non solo questo task: mentre aspetta, tutti gli altri task assegnati a quel thread restano fermi. Con qualche fornitore in parallelo l’intera importazione si serializza e le richieste in arrivo sul server smettono di essere servite. In codice asincrono si usa `tokio::time::sleep(...).await`, che restituisce il thread all’esecutore.',
  },
  {
    livello: 'cattivo',
    filename: 'magazzino.rs',
    lines: [
      '/// Scarica dal magazzino la quantità di una riga d’ordine.',
      'pub async fn scarica(pool: &PgPool, id: i64, qta: i32) -> Result<()> {',
      '    let mut tx = pool.begin().await?;',
      '',
      '    let attuale: i32 = sqlx::query_scalar(',
      '        "SELECT giacenza FROM articoli WHERE id = $1",',
      '    )',
      '    .bind(id)',
      '    .fetch_one(&mut *tx)',
      '    .await?;',
      '',
      '    if attuale < qta {',
      '        return Err(Error::GiacenzaInsufficiente);',
      '    }',
      '',
      '    sqlx::query("UPDATE articoli SET giacenza = $1 WHERE id = $2")',
      '        .bind(attuale - qta)',
      '        .bind(id)',
      '        .execute(&mut *tx)',
      '        .await?;',
      '',
      '    tx.commit().await?;',
      '    Ok(())',
      '}',
    ],
    buggy: 16,
    explanation:
      'È un aggiornamento perso: si legge la giacenza, si calcola in memoria e si riscrive un valore assoluto. Due scarichi in parallelo leggono lo stesso `attuale` e il secondo cancella l’effetto del primo — il magazzino va in negativo senza che nessuna riga risulti sbagliata. La scrittura deve essere relativa e atomica: `SET giacenza = giacenza - $1 WHERE id = $2 AND giacenza >= $1`, controllando le righe toccate.',
  },
  {
    livello: 'da incubo',
    filename: 'listini.rs',
    lines: [
      'use std::collections::HashMap;',
      'use std::sync::Mutex;',
      '',
      'pub struct Listini {',
      '    cache: Mutex<HashMap<String, Prezzo>>,',
      '    db: Db,',
      '}',
      '',
      'impl Listini {',
      '    /// Prezzo di un articolo per uno specifico cliente.',
      '    pub fn prezzo(&self, articolo: &str, cliente: &Cliente) -> Result<Prezzo> {',
      '        let mut cache = self.cache.lock().unwrap();',
      '',
      '        let chiave = articolo.to_string();',
      '',
      '        if let Some(p) = cache.get(&chiave) {',
      '            return Ok(p.clone());',
      '        }',
      '',
      '        let prezzo = self.db.prezzo_per(articolo, cliente.id)?;',
      '        cache.insert(chiave, prezzo.clone());',
      '',
      '        Ok(prezzo)',
      '    }',
      '}',
      '',
      '// Ogni cliente ha il proprio listino e i propri sconti.',
    ],
    buggy: 13,
    explanation:
      'La chiave della cache contiene solo l’articolo, ma il prezzo dipende **anche dal cliente**: il primo che chiede un articolo riempie la cache, e da lì in poi tutti gli altri clienti si vedono restituire il suo prezzo — sconti riservati compresi. Non è un errore che si nota nei test con un cliente solo, ed è di quelli che si scoprono da una telefonata. La chiave deve includere l’identificativo del cliente (o la cache va tenuta per cliente).',
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
