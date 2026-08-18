/**
 * Documenti legali del sito.
 *
 * Sono scritti su come il sito funziona davvero, non su un modello generico:
 * qui non c'è un back-end che raccoglie i moduli, non ci sono cookie di
 * profilazione, e l'unica cosa che resta nel browser è la preferenza di tema.
 * Le uniche richieste verso terzi sono quelle dei caratteri tipografici.
 *
 * TODO prima della pubblicazione: sede legale e registro di iscrizione della
 * società, indirizzo PEC, foro competente nella sezione "Legge applicabile" dei
 * termini, ed eventuale responsabile della protezione dei dati.
 *
 * Ogni sezione è fatta di blocchi: `p` (paragrafo), `elenco`, `nota`
 * (riquadro evidenziato) e `tabella` (intestazioni + righe).
 */

export const aggiornamento = '18 agosto 2026'

const p = (testo) => ({ tipo: 'p', testo })
const elenco = (voci) => ({ tipo: 'elenco', voci })
const nota = (titolo, testo) => ({ tipo: 'nota', titolo, testo })
const tabella = (intestazioni, righe) => ({ tipo: 'tabella', intestazioni, righe })

/* ------------------------------------------------------------------
   Privacy policy
   ------------------------------------------------------------------ */

const privacy = {
  slug: 'privacy',
  numero: '01',
  titolo: 'Privacy policy',
  occhiello: 'Trattamento dei dati personali',
  sommario:
    'Che dati raccogliamo, quando li raccogliamo e cosa puoi chiederci di farne. Il sito è una vetrina: la maggior parte dei dati arriva solo se ci scrivi tu.',
  versione: '1.0',
  sezioni: [
    {
      id: 'titolare',
      titolo: 'Chi tratta i tuoi dati',
      blocchi: [
        p(
          'Il titolare del trattamento è LevelApp LLC, la società che sviluppa e gestisce questo sito. Per qualsiasi richiesta sui tuoi dati puoi scrivere all’indirizzo di posta indicato nella pagina Contatti: rispondiamo noi, non un servizio esterno.',
        ),
        nota(
          'Da completare',
          'I riferimenti identificativi completi della società — sede legale, registro di iscrizione ed eventuale responsabile della protezione dei dati — vanno inseriti qui prima della pubblicazione del sito.',
        ),
      ],
    },
    {
      id: 'quali-dati',
      titolo: 'Quali dati raccogliamo',
      blocchi: [
        p(
          'Non ti chiediamo di registrarti e non profiliamo chi naviga. I dati personali entrano in gioco in tre casi: quando ci contatti, quando ti candidi e quando il tuo browser chiede al nostro hosting le pagine del sito.',
        ),
        tabella(
          ['Dato', 'Quando', 'Da chi arriva'],
          [
            ['Nome, email, telefono, messaggio', 'Quando ci scrivi per un progetto o apri una richiesta di assistenza', 'Da te'],
            ['Curriculum, risposte al test, dati della candidatura', 'Quando ti candidi da “Lavora con noi”', 'Da te'],
            ['Indirizzo email', 'Se chiedi di essere ricontattato dal modulo rapido', 'Da te'],
            ['Indirizzo IP, data e ora, pagina richiesta, browser', 'A ogni visita, nei registri tecnici del server che ospita il sito', 'Automaticamente'],
          ],
        ),
      ],
    },
    {
      id: 'come-arrivano',
      titolo: 'Come ci arrivano davvero',
      blocchi: [
        p(
          'È la parte che quasi nessuno dichiara, e nel nostro caso cambia tutto: i moduli di questo sito non trasmettono nulla a un nostro server. Compilandoli prepari un messaggio che parte dal tuo programma di posta, oppure ti vengono mostrati i recapiti diretti per scriverci.',
        ),
        p(
          'La conseguenza pratica è che, finché non premi invio nel tuo client di posta, quello che hai scritto resta sul tuo dispositivo. Il trattamento comincia quando riceviamo la tua email.',
        ),
        nota(
          'Test di “Lavora con noi”',
          'Le risposte del test non vengono salvate da nessuna parte: restano nella pagina finché non la ricarichi. Se decidi di candidarti vengono riportate nel messaggio che invii, così vedi esattamente cosa ci arriva.',
        ),
      ],
    },
    {
      id: 'finalita',
      titolo: 'Perché li trattiamo',
      blocchi: [
        tabella(
          ['Finalità', 'Base giuridica', 'Conservazione'],
          [
            ['Rispondere alle richieste e preparare un preventivo', 'Misure precontrattuali su tua richiesta', '24 mesi dall’ultimo contatto'],
            ['Gestire il rapporto con i clienti e l’assistenza', 'Esecuzione del contratto', 'Durata del contratto e 10 anni per gli obblighi di legge'],
            ['Valutare le candidature', 'Misure precontrattuali su tua richiesta', '12 mesi, salvo tuo consenso a conservarle più a lungo'],
            ['Sicurezza e diagnostica del sito', 'Legittimo interesse a mantenerlo funzionante', 'Registri tecnici: massimo 12 mesi'],
          ],
        ),
      ],
    },
    {
      id: 'condivisione',
      titolo: 'Con chi li condividiamo',
      blocchi: [
        p(
          'Non vendiamo dati e non li cediamo per finalità pubblicitarie. Li conoscono solo i fornitori che ci servono per lavorare, ognuno con il proprio contratto:',
        ),
        elenco([
          'Chi ospita il sito e la posta aziendale.',
          'Chi fornisce i caratteri tipografici delle pagine (vedi la sezione dedicata nella Cookie policy).',
          'Consulenti e professionisti, quando la legge lo richiede.',
        ]),
        p(
          'Sui progetti dei clienti vale una regola che teniamo anche nei contratti: i dati che stanno dentro il software che sviluppiamo restano dei clienti, sulla loro infrastruttura, e non li usiamo per addestrare nulla.',
        ),
      ],
    },
    {
      id: 'trasferimenti',
      titolo: 'Trasferimenti fuori dall’Unione europea',
      blocchi: [
        p(
          'I caratteri tipografici del sito vengono richiesti a un fornitore statunitense: la richiesta comporta la comunicazione del tuo indirizzo IP verso gli Stati Uniti, sulla base delle garanzie previste dalla normativa europea. Le elaborazioni dei progetti dei clienti, comprese quelle di intelligenza artificiale, restano invece su infrastruttura europea.',
        ),
      ],
    },
    {
      id: 'diritti',
      titolo: 'I tuoi diritti',
      blocchi: [
        p('Puoi chiederci in qualsiasi momento, scrivendo alla nostra email:'),
        elenco([
          'di sapere quali dati abbiamo su di te e di riceverne copia;',
          'di correggerli o completarli;',
          'di cancellarli, quando non abbiamo un obbligo di conservarli;',
          'di limitarne o di opporti al trattamento;',
          'di riceverli in un formato leggibile da un altro sistema.',
        ]),
        p(
          'Rispondiamo entro un mese. Se pensi che qualcosa non vada, puoi rivolgerti all’autorità di controllo competente per la protezione dei dati personali.',
        ),
      ],
    },
    {
      id: 'sicurezza',
      titolo: 'Come li teniamo al sicuro',
      blocchi: [
        p(
          'Accessi personali e limitati a chi lavora sulla richiesta, connessioni cifrate, aggiornamenti regolari e copie di sicurezza. Se dovesse verificarsi una violazione che ti riguarda, te lo diciamo e lo comunichiamo all’autorità nei tempi previsti.',
        ),
      ],
    },
    {
      id: 'modifiche',
      titolo: 'Modifiche a questo documento',
      blocchi: [
        p(
          'Se cambiamo qualcosa di sostanziale — un nuovo strumento, una nuova finalità — aggiorniamo questa pagina e la data in alto. Le versioni precedenti restano disponibili su richiesta.',
        ),
      ],
    },
  ],
}

/* ------------------------------------------------------------------
   Cookie policy
   ------------------------------------------------------------------ */

const cookie = {
  slug: 'cookie',
  numero: '02',
  titolo: 'Cookie policy',
  occhiello: 'Cosa resta nel tuo browser',
  sommario:
    'Questo sito non usa cookie di profilazione, non ha strumenti di analisi e non mostra banner di consenso, perché non c’è niente per cui chiedertelo.',
  versione: '1.0',
  sezioni: [
    {
      id: 'in-breve',
      titolo: 'In breve',
      blocchi: [
        nota(
          'Nessun cookie di tracciamento',
          'Non installiamo cookie di profilazione, non usiamo pixel pubblicitari e non misuriamo il tuo comportamento con strumenti di analisi. L’unica cosa che salviamo è la preferenza di tema, e serve solo a non farti ritrovare il sito chiaro se lo avevi messo scuro.',
        ),
      ],
    },
    {
      id: 'cosa-salviamo',
      titolo: 'Cosa salviamo davvero',
      blocchi: [
        tabella(
          ['Nome', 'Tipo', 'Scopo', 'Durata'],
          [
            ['levelapp:color-mode', 'Archiviazione locale (non è un cookie)', 'Ricorda se preferisci il tema chiaro, scuro o automatico', 'Finché non svuoti i dati del browser'],
          ],
        ),
        p(
          'Non viene inviata a nessun server: resta nel tuo browser e non ci dice chi sei. Cancellandola, il sito torna semplicemente a seguire l’impostazione del tuo sistema.',
        ),
      ],
    },
    {
      id: 'terze-parti',
      titolo: 'Richieste verso terzi',
      blocchi: [
        p(
          'Le pagine caricano i caratteri tipografici da un servizio esterno (Google Fonts). Quel servizio non imposta cookie sul sito, ma per consegnare il file riceve il tuo indirizzo IP e i dati tecnici del browser: è l’unica connessione verso terzi che il sito compie.',
        ),
        p(
          'Non ci sono video incorporati, mappe, widget social, chat esterne o iframe pubblicitari: le sezioni interattive — il terminale, i giochi, il test delle candidature — girano interamente nel tuo browser.',
        ),
      ],
    },
    {
      id: 'gestione',
      titolo: 'Come cancellarla o impedirla',
      blocchi: [
        elenco([
          'Dalle impostazioni del browser, alla voce dati dei siti o privacy, puoi cancellare l’archiviazione locale di questo sito.',
          'La navigazione in incognito non conserva nulla al termine della sessione.',
          'Bloccando le richieste a fonts.googleapis.com il sito resta perfettamente leggibile: cambia soltanto il carattere tipografico.',
        ]),
      ],
    },
    {
      id: 'se-cambia',
      titolo: 'Se un domani cambierà',
      blocchi: [
        p(
          'Se introdurremo strumenti di analisi o di marketing, prima di attivarli comparirà una richiesta di consenso e questa pagina sarà aggiornata con l’elenco completo. Fino ad allora, non c’è niente da accettare.',
        ),
      ],
    },
  ],
}

/* ------------------------------------------------------------------
   Termini e condizioni
   ------------------------------------------------------------------ */

const termini = {
  slug: 'termini',
  numero: '03',
  titolo: 'Termini e condizioni',
  occhiello: 'Regole d’uso del sito',
  sommario:
    'Cosa puoi fare con i contenuti di questo sito, che valore hanno le informazioni che ci trovi e come si passa da una pagina web a un contratto vero.',
  versione: '1.0',
  sezioni: [
    {
      id: 'oggetto',
      titolo: 'Oggetto',
      blocchi: [
        p(
          'Queste condizioni regolano l’uso del sito di LevelApp LLC. Navigandolo le accetti. Il sito presenta i nostri servizi: non vende nulla online, non permette di registrarsi e non dà accesso ad alcuna area riservata.',
        ),
      ],
    },
    {
      id: 'contenuti',
      titolo: 'Contenuti e proprietà intellettuale',
      blocchi: [
        p(
          'Testi, immagini, marchio, illustrazioni e codice di questo sito sono nostri o di chi ce ne ha concesso l’uso. Puoi leggerli, stamparli e citarli indicando la fonte; non puoi ripubblicarli come tuoi, rivenderli o usarli per costruire un servizio concorrente.',
        ),
        p(
          'I marchi dei clienti e dei partner citati appartengono ai rispettivi titolari e compaiono qui con il loro consenso, per raccontare il lavoro svolto.',
        ),
      ],
    },
    {
      id: 'informazioni',
      titolo: 'Che valore hanno le informazioni pubblicate',
      blocchi: [
        p(
          'Le descrizioni dei servizi, le tecnologie e i tempi indicati — a partire dalle quattro settimane, che è il nostro standard di lavoro — sono informazioni di carattere generale, non una proposta contrattuale vincolante.',
        ),
        p(
          'Il perimetro di un progetto, la data di rilascio e le condizioni economiche nascono dopo l’analisi e vivono nel contratto che firmiamo: è quello, e solo quello, a fare fede.',
        ),
      ],
    },
    {
      id: 'progetti',
      titolo: 'Il software che sviluppiamo',
      blocchi: [
        p(
          'Quando lavoriamo per un cliente, il risultato è suo: codice sorgente, dati e infrastruttura restano intestati alla sua azienda, senza vincoli di esclusiva verso di noi. È una regola che teniamo anche quando un rapporto finisce.',
        ),
        p(
          'I casi raccontati nella sezione Progetti sono pubblicati con l’autorizzazione dei clienti. Alcuni numeri sono arrotondati o omessi quando riguardano informazioni riservate.',
        ),
      ],
    },
    {
      id: 'candidature',
      titolo: 'Candidature e test',
      blocchi: [
        p(
          'Il test preliminare di “Lavora con noi” serve a farci un’idea del mestiere di chi si candida. Il punteggio non è una graduatoria, non viene conservato e non crea alcun obbligo di assunzione né alcuna promessa di risposta in tempi determinati.',
        ),
      ],
    },
    {
      id: 'disponibilita',
      titolo: 'Disponibilità del sito e responsabilità',
      blocchi: [
        p(
          'Facciamo il possibile perché il sito sia sempre raggiungibile e aggiornato, ma può essere sospeso per manutenzione o per cause fuori dal nostro controllo. Non rispondiamo dei danni derivanti da decisioni prese sulla sola base delle informazioni pubblicate qui, né dei contenuti dei siti esterni a cui rimandiamo.',
        ),
      ],
    },
    {
      id: 'legge',
      titolo: 'Legge applicabile',
      blocchi: [
        nota(
          'Da completare',
          'La legge applicabile e il foro competente vanno indicati qui in coerenza con la sede della società, insieme all’eventuale clausola per i consumatori.',
        ),
      ],
    },
    {
      id: 'aggiornamenti',
      titolo: 'Aggiornamenti',
      blocchi: [
        p(
          'Possiamo modificare queste condizioni: la versione valida è quella pubblicata su questa pagina, con la data di aggiornamento in alto.',
        ),
      ],
    },
  ],
}

export const documenti = [privacy, cookie, termini]

export const trovaDocumento = (slug) => documenti.find((d) => d.slug === slug)
