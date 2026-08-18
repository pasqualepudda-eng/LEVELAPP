/**
 * "Lavora con noi": ruoli aperti e banca delle domande del test preliminare.
 *
 * Il test pesca 10 domande a caso dal fondo del ruolo scelto più quelle
 * trasversali, e mescola anche l'ordine delle risposte: due candidati non
 * vedono mai lo stesso test, e chi lo rifà non ritrova lo stesso ordine.
 *
 * `giusta` è l'indice della risposta corretta PRIMA del mescolamento.
 */

export const ruoli = [
  {
    id: 'front-end',
    label: 'Front-end',
    icon: 'browser',
    accent: 'var(--color-accent)',
    desc: 'React e TypeScript, interfacce accessibili e veloci.',
    cerchiamo: ['React + TypeScript', 'Accessibilità', 'Performance percepita'],
  },
  {
    id: 'back-end',
    label: 'Back-end',
    icon: 'database',
    accent: 'var(--color-orange)',
    desc: 'Rust, API e database: la parte che deve reggere.',
    cerchiamo: ['Rust o Node', 'SQL vero', 'API e integrazioni'],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    icon: 'mobile',
    accent: 'var(--color-purple)',
    desc: 'React Native, offline e pubblicazione sugli store.',
    cerchiamo: ['React Native', 'Sincronizzazione offline', 'Store e rilasci'],
  },
  {
    id: 'ai',
    label: 'AI & Dati',
    icon: 'sparkle',
    accent: 'var(--color-success)',
    desc: 'Bot, retrieval sui documenti e sistemi multi-modello.',
    cerchiamo: ['Python', 'RAG e valutazione', 'Orchestrazione di modelli'],
  },
  {
    id: 'design',
    label: 'Design di prodotto',
    icon: 'layers',
    accent: 'var(--color-pink)',
    desc: 'Interfacce per chi lavora otto ore dentro un gestionale.',
    cerchiamo: ['Design system', 'Flussi complessi', 'Accessibilità'],
  },
  {
    id: 'analisi',
    label: 'Analisi & Progetto',
    icon: 'workflow',
    accent: 'var(--color-attention)',
    desc: 'Capire i processi del cliente e tradurli in perimetro.',
    cerchiamo: ['Analisi dei processi', 'Scrittura chiara', 'Gestione del cliente'],
  },
]

/* ------------------------------------------------------------------
   Domande trasversali: entrano nel test di qualunque ruolo
   ------------------------------------------------------------------ */

const trasversali = [
  {
    d: 'Il cliente chiede una funzione che, come descritta, non sta nelle quattro settimane. Cosa fai?',
    opzioni: [
      'Riporti il perimetro e proponi la versione più piccola che risolve lo stesso problema, dicendo cosa resta fuori',
      'Accetti e recuperi facendo straordinari',
      'Rifiuti: il perimetro era firmato',
      'La aggiungi senza dirlo e ne parli alla consegna',
    ],
    giusta: 0,
    spiega:
      'Il mestiere è trovare la versione che entra nei tempi e dichiarare esplicitamente cosa resta fuori. Accettare in silenzio o rifiutare senza alternative sono i due modi per perdere il progetto.',
  },
  {
    d: 'In produzione un’operazione fallisce solo per alcuni utenti. Qual è il primo passo?',
    opzioni: [
      'Riprodurre il caso partendo dai log e dai dati di quegli utenti',
      'Fare subito una modifica in produzione e vedere se sparisce',
      'Chiedere agli utenti di riprovare più tardi',
      'Riavviare il servizio',
    ],
    giusta: 0,
    spiega:
      'Senza riproduzione si tira a indovinare. Log, dati reali e un caso minimo che fallisce sono la base; il riavvio nasconde il sintomo e perde le prove.',
  },
  {
    d: 'Durante una revisione del codice trovi una scelta che non condividi ma che funziona. Cosa scrivi?',
    opzioni: [
      'Il problema concreto che vedi, con l’alternativa e il perché; se non c’è un problema reale, lo segnali come preferenza',
      'Chiedi di riscrivere: non è il tuo stile',
      'Approvi senza commenti per non rallentare',
      'Riscrivi tu la parte senza dirlo',
    ],
    giusta: 0,
    spiega:
      'Una revisione utile distingue i difetti dalle preferenze e propone un’alternativa. Le altre tre strade producono attrito o codice che nessuno ha davvero letto.',
  },
  {
    d: 'Un requisito è ambiguo e il referente è irreperibile per due giorni. Come procedi?',
    opzioni: [
      'Scegli l’interpretazione più semplice da cambiare dopo, la annoti come assunzione e vai avanti sul resto',
      'Ti fermi finché non risponde',
      'Implementi tutte le interpretazioni possibili',
      'Decidi tu e non lo scrivi da nessuna parte',
    ],
    giusta: 0,
    spiega:
      'Si sblocca il lavoro scegliendo la strada meno costosa da correggere e mettendo l’assunzione per iscritto, così la verifica è di due minuti quando il referente torna.',
  },
  {
    d: 'Cosa rende una stima onesta?',
    opzioni: [
      'Un perimetro definito, le assunzioni dichiarate e i rischi che possono farla saltare',
      'Un numero singolo, il più basso possibile',
      'Il tempo che il cliente si aspetta',
      'La media delle stime del team',
    ],
    giusta: 0,
    spiega:
      'Una stima senza perimetro e senza assunzioni non è una stima: è un auspicio. I rischi vanno detti prima, non dopo.',
  },
  {
    d: 'Il giorno del go-live la migrazione dei dati mostra 40 record incoerenti su 30.000. Cosa fai?',
    opzioni: [
      'Fermi il go-live sui soli dati coinvolti, li isoli e li correggi con il cliente, poi prosegui',
      'Vai in produzione: 40 su 30.000 è statisticamente irrilevante',
      'Annulli tutto e riprogrammi il go-live',
      'Li cancelli per sbloccare la procedura',
    ],
    giusta: 0,
    spiega:
      'Quaranta record sbagliati diventano quaranta telefonate. Si isolano, si correggono con chi conosce il dato e si prosegue: non serve buttare via un go-live intero.',
  },
]

/* ------------------------------------------------------------------
   Domande per ruolo
   ------------------------------------------------------------------ */

const perRuolo = {
  'front-end': [
    {
      d: 'Un `useEffect` senza array di dipendenze cosa fa?',
      opzioni: [
        'Viene eseguito dopo ogni render',
        'Viene eseguito una sola volta al montaggio',
        'Non viene mai eseguito',
        'Viene eseguito solo quando cambia lo stato locale',
      ],
      giusta: 0,
      spiega: 'Senza array l’effetto gira a ogni render. L’array vuoto `[]` è quello che lo limita al montaggio.',
    },
    {
      d: 'Perché usare l’indice dell’array come `key` in una lista è rischioso?',
      opzioni: [
        'Se gli elementi vengono riordinati o inseriti in mezzo, React associa lo stato alla posizione sbagliata',
        'Rende il rendering più lento in ogni caso',
        'React lancia un errore in produzione',
        'Impedisce di usare gli hook dentro la lista',
      ],
      giusta: 0,
      spiega: 'La key identifica l’elemento fra un render e l’altro: con l’indice, un inserimento in testa fa “scivolare” stato e componenti.',
    },
    {
      d: 'In TypeScript, qual è la differenza pratica tra `unknown` e `any`?',
      opzioni: [
        '`unknown` obbliga a restringere il tipo prima di usarlo, `any` disattiva i controlli',
        'Sono sinonimi',
        '`unknown` esiste solo nei file di dichiarazione',
        '`any` è più sicuro perché è esplicito',
      ],
      giusta: 0,
      spiega: '`unknown` è il tipo onesto per i dati che arrivano da fuori: il compilatore ti costringe a verificarli.',
    },
    {
      d: 'Un testo dentro un contenitore flex non viene troncato con l’ellissi. La causa più probabile?',
      opzioni: [
        'L’elemento flex ha `min-width: auto` e non si restringe: serve `min-width: 0`',
        'Manca `text-overflow: clip`',
        'Il contenitore non ha `display: block`',
        '`overflow: hidden` non funziona dentro flex',
      ],
      giusta: 0,
      spiega: 'È il classico: gli elementi flex non scendono sotto la dimensione del contenuto finché non si azzera `min-width`.',
    },
    {
      d: 'Cosa contribuisce di più al CLS (spostamento del layout)?',
      opzioni: [
        'Immagini e riquadri inseriti senza dimensioni riservate',
        'Font di sistema',
        'Troppi file CSS',
        'Le animazioni di trasformazione',
      ],
      giusta: 0,
      spiega: 'Quando l’immagine arriva e “spinge” il contenuto, il layout salta. Riservare lo spazio in anticipo lo evita.',
    },
    {
      d: 'Un `<div>` con `onClick` che apre un menu: cosa manca per essere accessibile?',
      opzioni: [
        'Essere un elemento interattivo vero (o avere ruolo, focus da tastiera e gestione di Invio/Spazio)',
        'Un `title` descrittivo',
        'Un `tabindex="-1"`',
        'Un `aria-hidden` sul menu',
      ],
      giusta: 0,
      spiega: 'Chi naviga da tastiera non può cliccare: senza focus e senza gestione dei tasti, quella funzione semplicemente non esiste.',
    },
    {
      d: 'Quando conviene `useMemo`?',
      opzioni: [
        'Quando il calcolo è costoso o il risultato è una dipendenza di altri hook che altrimenti si invaliderebbero',
        'Sempre, su ogni valore derivato',
        'Solo dentro i componenti di classe',
        'Per evitare di scrivere `useEffect`',
      ],
      giusta: 0,
      spiega: 'Memoizzare tutto costa memoria e confonde: serve dove c’è un calcolo pesante o una dipendenza da stabilizzare.',
    },
    {
      d: 'Cosa distingue debounce da throttle?',
      opzioni: [
        'Il debounce aspetta la pausa e poi esegue una volta; il throttle esegue a intervalli regolari durante l’attività',
        'Sono la stessa cosa con nomi diversi',
        'Il debounce vale solo per lo scroll',
        'Il throttle annulla del tutto gli eventi in eccesso',
      ],
      giusta: 0,
      spiega: 'Ricerca mentre si digita → debounce. Aggiornamento durante lo scroll → throttle.',
    },
    {
      d: 'Cosa causa più spesso un errore di idratazione in una pagina renderizzata sul server?',
      opzioni: [
        'Markup che dipende da qualcosa disponibile solo nel browser (data, dimensioni, localStorage)',
        'L’uso di CSS-in-JS',
        'Un componente troppo grande',
        'Le immagini remote',
      ],
      giusta: 0,
      spiega: 'Se server e browser generano markup diverso, React se ne accorge in idratazione. Quei valori vanno letti dopo il primo render.',
    },
    {
      d: 'Il modo più affidabile per non far scattare il layout quando compare una barra di scorrimento?',
      opzioni: [
        'Riservare lo spazio con `scrollbar-gutter: stable`',
        'Nascondere sempre la barra',
        'Usare `position: fixed` sul contenitore',
        'Impostare `overflow: hidden` sul body',
      ],
      giusta: 0,
      spiega: '`scrollbar-gutter` riserva lo spazio a prescindere; nascondere la barra toglie un’informazione a chi naviga.',
    },
    {
      d: 'Perché il codice diviso in bundle separati (code splitting) può peggiorare le cose se fatto male?',
      opzioni: [
        'Troppi frammenti piccoli aggiungono richieste e attese a cascata',
        'Aumenta sempre la dimensione totale',
        'Rompe le sourcemap',
        'Impedisce la cache del browser',
      ],
      giusta: 0,
      spiega: 'Il taglio si fa sui confini reali (rotte, componenti pesanti), non su ogni file: le cascate di richieste costano più del risparmio.',
    },
    {
      d: 'Un form controllato perde un carattere ogni tanto mentre si digita velocemente. Sospetto principale?',
      opzioni: [
        'Il valore viene rimandato indietro da uno stato aggiornato in modo asincrono o da una normalizzazione a ogni battuta',
        'Il browser è troppo lento',
        'Manca `autocomplete="off"`',
        'L’input dovrebbe essere non controllato per forza',
      ],
      giusta: 0,
      spiega: 'Se il valore mostrato torna da uno stato che arriva in ritardo, le battute rapide vengono sovrascritte.',
    },
  ],

  'back-end': [
    {
      d: 'In Rust, cosa impedisce al compilatore di accettare due riferimenti mutabili contemporanei allo stesso dato?',
      opzioni: [
        'La regola del prestito: un solo riferimento mutabile per volta, per evitare corse ai dati',
        'Il garbage collector',
        'Il tipo `Option`',
        'La macro `unsafe`',
      ],
      giusta: 0,
      spiega: 'È il cuore del borrow checker: alias e mutabilità insieme sono la sorgente classica dei bug di concorrenza.',
    },
    {
      d: 'Perché `Option<T>` è preferibile a un valore nullo?',
      opzioni: [
        'Il compilatore obbliga a gestire il caso “assente” prima di usare il valore',
        'Occupa meno memoria',
        'È più veloce da serializzare',
        'Permette di evitare i tipi generici',
      ],
      giusta: 0,
      spiega: 'L’assenza diventa parte del tipo: il caso non gestito non compila, invece di esplodere di notte.',
    },
    {
      d: 'Una query filtra su `WHERE lower(email) = $1` e l’indice su `email` non viene usato. Perché?',
      opzioni: [
        'La funzione applicata alla colonna impedisce l’uso dell’indice: serve un indice sull’espressione',
        'Gli indici non funzionano sulle colonne di testo',
        'Manca un `ORDER BY`',
        'La tabella è troppo piccola',
      ],
      giusta: 0,
      spiega: 'Indicizzare `lower(email)` (o normalizzare in scrittura) rimette in gioco l’indice.',
    },
    {
      d: 'Cos’è il problema N+1 e come si riconosce?',
      opzioni: [
        'Una query per la lista e una per ogni elemento: nei log compaiono centinaia di query quasi identiche',
        'Una query che restituisce troppe colonne',
        'Un indice mancante sulla chiave primaria',
        'Una transazione troppo lunga',
      ],
      giusta: 0,
      spiega: 'Si risolve con una join o un caricamento in blocco: è la causa più comune delle liste lente.',
    },
    {
      d: 'Un’API di pagamento viene chiamata due volte per un errore di rete. Cosa evita il doppio addebito?',
      opzioni: [
        'Una chiave di idempotenza fornita dal chiamante e registrata dal servizio',
        'Un timeout più lungo',
        'Usare PUT invece di POST',
        'Un retry automatico più aggressivo',
      ],
      giusta: 0,
      spiega: 'Con la chiave di idempotenza la seconda chiamata restituisce l’esito della prima invece di crearne un’altra.',
    },
    {
      d: 'Aggiungi una colonna `NOT NULL` a una tabella con milioni di righe in produzione. Come procedi?',
      opzioni: [
        'Aggiungi la colonna nullable, riempi a blocchi, poi imponi il vincolo',
        'Aggiungi direttamente la colonna con il vincolo',
        'Blocchi la tabella e ricrei tutto',
        'Fai la modifica solo in lettura',
      ],
      giusta: 0,
      spiega: 'Il vincolo immediato richiede una riscrittura con lock lunghi: a blocchi si resta operativi.',
    },
    {
      d: 'Qual è lo svantaggio operativo dei token JWT senza stato rispetto alle sessioni?',
      opzioni: [
        'Non si revocano prima della scadenza senza aggiungere una lista di revoca',
        'Non possono contenere dati',
        'Non funzionano su HTTPS',
        'Richiedono sempre i cookie',
      ],
      giusta: 0,
      spiega: 'Se un token viene sottratto resta valido fino alla scadenza: servono durate brevi e un meccanismo di revoca.',
    },
    {
      d: 'Due processi si bloccano a vicenda su due righe. Come si riduce il rischio?',
      opzioni: [
        'Acquisire i lock sempre nello stesso ordine e tenere le transazioni corte',
        'Aumentare il timeout',
        'Usare più connessioni',
        'Disattivare le transazioni',
      ],
      giusta: 0,
      spiega: 'L’ordine coerente elimina il ciclo di attesa; transazioni brevi riducono la finestra in cui può succedere.',
    },
    {
      d: 'Cosa significa che un backup “esiste” ma non è verificato?',
      opzioni: [
        'Che non hai ancora provato a ripristinarlo: finché il restore non è testato, non è un backup',
        'Che è più vecchio di 24 ore',
        'Che non è cifrato',
        'Che sta sullo stesso server',
      ],
      giusta: 0,
      spiega: 'Il valore di un backup è il ripristino riuscito. La prova va fatta periodicamente, non il giorno del disastro.',
    },
    {
      d: 'Quando ha senso una coda di messaggi invece di una chiamata sincrona?',
      opzioni: [
        'Quando il lavoro può essere differito e il chiamante non deve aspettarne l’esito',
        'Sempre: è più moderno',
        'Solo per inviare email',
        'Quando il database è lento',
      ],
      giusta: 0,
      spiega: 'La coda disaccoppia e assorbe i picchi, ma aggiunge ritardi e casi di ritentativo: si usa dove serve davvero.',
    },
    {
      d: 'In un’API pubblica, come limiti l’abuso senza penalizzare i clienti onesti?',
      opzioni: [
        'Limiti per chiave e per finestra temporale, con risposte 429 e header che dicono quando riprovare',
        'Bloccando gli IP sospetti a mano',
        'Riducendo il timeout del server',
        'Restituendo 500 quando il traffico è alto',
      ],
      giusta: 0,
      spiega: 'Un limite dichiarato e leggibile permette al client di adattarsi; un 500 lo fa solo ritentare peggio.',
    },
    {
      d: 'Come gestisci un errore atteso in Rust dentro una funzione che può fallire?',
      opzioni: [
        'Restituendo `Result` e propagando con `?`, lasciando decidere al chiamante',
        'Con `panic!`, così si nota subito',
        'Ignorandolo con `unwrap()`',
        'Scrivendolo nei log e restituendo un valore di default',
      ],
      giusta: 0,
      spiega: '`Result` rende l’errore parte della firma. `unwrap()` in produzione è un incidente in attesa di succedere.',
    },
  ],

  mobile: [
    {
      d: 'Un rapportino viene compilato senza rete e sincronizzato più tardi. Qual è il problema da progettare per primo?',
      opzioni: [
        'La risoluzione dei conflitti quando il dato è cambiato anche sul server',
        'Il colore dell’indicatore di stato',
        'La compressione del payload',
        'Il numero di tentativi di invio',
      ],
      giusta: 0,
      spiega: 'La coda è la parte facile: le regole di conflitto (chi vince, cosa si mostra all’utente) sono la parte che decide se il sistema è affidabile.',
    },
    {
      d: 'Dove NON vanno salvati i token di autenticazione in un’app mobile?',
      opzioni: [
        'In un archivio locale non cifrato come le preferenze o AsyncStorage',
        'Nel portachiavi di sistema (Keychain / Keystore)',
        'In memoria per la durata della sessione',
        'In un archivio cifrato dedicato',
      ],
      giusta: 0,
      spiega: 'Su dispositivo compromesso o con backup non cifrati, un archivio in chiaro consegna la sessione a chiunque.',
    },
    {
      d: 'Una lista di 2.000 elementi rende l’app scattosa. Prima mossa?',
      opzioni: [
        'Usare una lista virtualizzata che monta solo gli elementi visibili',
        'Ridurre la dimensione del font',
        'Caricare tutto in memoria all’avvio',
        'Disattivare le animazioni di sistema',
      ],
      giusta: 0,
      spiega: 'Montare duemila componenti è il problema: la virtualizzazione ne tiene vivi una decina.',
    },
    {
      d: 'Gli aggiornamenti over-the-air non possono includere...',
      opzioni: [
        'Modifiche al codice nativo o alle dipendenze native',
        'Correzioni ai testi',
        'Modifiche alla logica JavaScript',
        'Nuove schermate costruite con componenti esistenti',
      ],
      giusta: 0,
      spiega: 'Tutto ciò che tocca il binario nativo richiede una nuova build e il passaggio dagli store.',
    },
    {
      d: 'La geolocalizzazione in background scarica la batteria. Cosa la riduce di più?',
      opzioni: [
        'Abbassare frequenza e precisione richieste e fermare il tracciamento quando il servizio non è attivo',
        'Aumentare la cache delle mappe',
        'Chiedere il permesso una sola volta',
        'Usare solo il GPS e mai la rete',
      ],
      giusta: 0,
      spiega: 'La precisione massima continua è la voce di consumo principale: si alza solo quando serve davvero.',
    },
    {
      d: 'Un permesso viene negato la prima volta. Cosa deve fare l’app?',
      opzioni: [
        'Spiegare a cosa serve e offrire un percorso alternativo o il rimando alle impostazioni',
        'Richiederlo in ciclo finché non viene concesso',
        'Chiudersi',
        'Fingere che sia stato concesso',
      ],
      giusta: 0,
      spiega: 'Insistere è il modo migliore per farsi disinstallare — e su iOS il secondo prompt spesso non compare nemmeno.',
    },
    {
      d: 'Motivo frequente di rifiuto in fase di revisione sugli store?',
      opzioni: [
        'Funzioni non provabili dal revisore o account di prova mancante',
        'Uso di React Native',
        'Icona troppo colorata',
        'Troppe schermate',
      ],
      giusta: 0,
      spiega: 'Se il revisore non riesce a entrare o a vedere la funzione dichiarata, l’app torna indietro.',
    },
    {
      d: 'A cosa serve un deep link ben progettato?',
      opzioni: [
        'Portare l’utente al contenuto esatto anche ad app chiusa, gestendo il caso “non installata”',
        'Ridurre la dimensione del bundle',
        'Evitare le notifiche push',
        'Sostituire il menu di navigazione',
      ],
      giusta: 0,
      spiega: 'Il link deve funzionare anche a freddo: senza fallback sul web o sullo store, l’utente si perde.',
    },
    {
      d: 'Le notifiche push non arrivano più a una parte degli utenti. Prima ipotesi?',
      opzioni: [
        'Token scaduti o cambiati e mai aggiornati sul server',
        'Il server invia troppo velocemente',
        'Il testo è troppo lungo',
        'Gli utenti hanno cambiato lingua',
      ],
      giusta: 0,
      spiega: 'I token cambiano con reinstallazioni e aggiornamenti: vanno rinfrescati a ogni avvio e ripuliti quando il servizio li segnala non validi.',
    },
    {
      d: 'Perché provare l’app solo sul simulatore non basta?',
      opzioni: [
        'Prestazioni, fotocamera, permessi, rete instabile e consumo si comportano diversamente sul dispositivo',
        'Il simulatore non supporta il debug',
        'Le build sono diverse',
        'Non è possibile installare dipendenze',
      ],
      giusta: 0,
      spiega: 'Il simulatore gira su un computer potente con rete perfetta: nasconde proprio i problemi che poi si presentano in campo.',
    },
    {
      d: 'Numero di versione e numero di build servono a cose diverse. Quale?',
      opzioni: [
        'La versione la legge l’utente, il numero di build identifica il caricamento sullo store e deve crescere sempre',
        'Sono intercambiabili',
        'Il numero di build lo assegna il sistema operativo',
        'La versione serve solo per Android',
      ],
      giusta: 0,
      spiega: 'Riusare un numero di build fa rifiutare il caricamento: sono due contatori con due scopi.',
    },
    {
      d: 'Un unico codebase per iOS e Android: qual è il rischio da tenere sotto controllo?',
      opzioni: [
        'Dare per scontato che ciò che funziona su una piattaforma funzioni sull’altra, senza provarlo',
        'Non poter usare le API native',
        'Dover scrivere due interfacce',
        'Perdere le notifiche push',
      ],
      giusta: 0,
      spiega: 'Permessi, tastiere, aree sicure e comportamenti di sistema divergono: il codice è uno, le prove restano due.',
    },
  ],

  ai: [
    {
      d: 'Perché un assistente su documenti aziendali deve citare la fonte?',
      opzioni: [
        'Perché rende verificabile la risposta e permette di accorgersi quando il modello sta inventando',
        'Perché lo richiede la legge in ogni caso',
        'Per riempire lo spazio nell’interfaccia',
        'Perché migliora la velocità di risposta',
      ],
      giusta: 0,
      spiega: 'Senza fonte nessuno può controllare, e un assistente non verificabile smette presto di essere usato.',
    },
    {
      d: 'Nel recupero dei documenti, cosa succede se i frammenti sono troppo grandi?',
      opzioni: [
        'Il contesto si riempie di testo irrilevante e la risposta peggiora',
        'La ricerca diventa più precisa',
        'Si riducono i costi',
        'Il modello risponde più velocemente',
      ],
      giusta: 0,
      spiega: 'Frammenti enormi diluiscono il segnale: si cerca la dimensione che tiene insieme un concetto, non un capitolo.',
    },
    {
      d: 'Quando la ricerca per similarità semantica fallisce in modo tipico?',
      opzioni: [
        'Con codici, sigle e numeri esatti, dove serve anche una ricerca testuale classica',
        'Con le domande lunghe',
        'Con i documenti in italiano',
        'Quando ci sono meno di mille documenti',
      ],
      giusta: 0,
      spiega: 'Per “DDT 2024-118” l’embedding non aiuta: le soluzioni serie combinano ricerca semantica e testuale.',
    },
    {
      d: 'Un utente chiede all’assistente dati che il suo ruolo non può vedere. Dove va applicato il controllo?',
      opzioni: [
        'Nel recupero: si cerca solo tra i documenti che quell’utente può già vedere',
        'Nel prompt, chiedendo al modello di non rispondere',
        'Nell’interfaccia, nascondendo la risposta',
        'Nei log, segnalando l’accesso',
      ],
      giusta: 0,
      spiega: 'Se il dato entra nel contesto è già uscito. Il filtro sta prima del modello, non dopo.',
    },
    {
      d: 'Cos’è un’iniezione di prompt tramite documento?',
      opzioni: [
        'Un testo dentro un documento indicizzato che impartisce istruzioni al modello',
        'Una query SQL malformata',
        'Un allegato troppo grande',
        'Un errore di codifica dei caratteri',
      ],
      giusta: 0,
      spiega: 'Il contenuto recuperato va trattato come dato non fidato, mai come istruzione: separazione dei ruoli e azioni sempre confermate.',
    },
    {
      d: 'Come si misura se un assistente è migliorato dopo una modifica?',
      opzioni: [
        'Con un insieme fisso di domande reali e risposte attese, valutato prima e dopo',
        'Provando qualche domanda a mano',
        'Guardando la lunghezza delle risposte',
        'Contando le richieste al giorno',
      ],
      giusta: 0,
      spiega: 'Senza un insieme di riferimento stabile ogni modifica è un’opinione: è l’unico modo per accorgersi delle regressioni.',
    },
    {
      d: 'In un sistema con più modelli, perché usarne uno piccolo per lo smistamento?',
      opzioni: [
        'Perché capire di cosa si parla costa poco e riserva il modello grande ai passaggi che lo meritano',
        'Perché i modelli piccoli sbagliano meno',
        'Perché elimina la necessità di valutare',
        'Perché non richiede prompt',
      ],
      giusta: 0,
      spiega: 'È la scelta che tiene insieme latenza e costo senza rinunciare alla qualità dove serve.',
    },
    {
      d: 'Quando conviene addestrare un modello su misura invece di usare il recupero dei documenti?',
      opzioni: [
        'Quando serve un formato o uno stile molto specifico e stabile, non quando servono informazioni aggiornate',
        'Sempre: le risposte sono migliori',
        'Quando i documenti sono più di mille',
        'Quando serve citare le fonti',
      ],
      giusta: 0,
      spiega: 'La conoscenza che cambia si recupera; l’addestramento si usa per il comportamento, ed è più costoso da mantenere.',
    },
    {
      d: 'Cosa deve fare un bot quando la domanda esce dal suo perimetro?',
      opzioni: [
        'Dirlo esplicitamente e passare a una persona con il contesto raccolto',
        'Inventare una risposta plausibile',
        'Chiedere di riformulare finché non capisce',
        'Rispondere con un link generico',
      ],
      giusta: 0,
      spiega: 'Il “non lo so” con passaggio all’operatore è la funzione che rende un bot utilizzabile in assistenza.',
    },
    {
      d: 'Perché la temperatura alta è rischiosa in un assistente su dati aziendali?',
      opzioni: [
        'Aumenta la variabilità: la stessa domanda ottiene risposte diverse, difficili da verificare e da valutare',
        'Rallenta la generazione',
        'Aumenta i costi in modo proporzionale',
        'Impedisce l’uso delle fonti',
      ],
      giusta: 0,
      spiega: 'Su compiti fattuali si tiene bassa: la creatività qui è un difetto, non un pregio.',
    },
    {
      d: 'Un’automazione AI deve modificare dati nel gestionale. Come si progetta?',
      opzioni: [
        'Il modello propone, una persona conferma, e ogni azione resta tracciata',
        'Il modello esegue e avvisa dopo',
        'Il modello esegue solo di notte',
        'Il modello esegue con un limite di operazioni al giorno',
      ],
      giusta: 0,
      spiega: 'Sulle azioni irreversibili la conferma umana e la traccia sono il minimo sindacale.',
    },
    {
      d: 'I log delle conversazioni contengono dati personali. Cosa prevedi?',
      opzioni: [
        'Minimizzazione, tempi di conservazione dichiarati e possibilità di cancellazione',
        'Conservazione illimitata per migliorare il servizio',
        'Nessun log, così non c’è problema',
        'Log solo delle risposte del modello',
      ],
      giusta: 0,
      spiega: 'Senza log non si migliora e non si indaga; con log eterni si crea un rischio. La via è conservare poco, per un tempo dichiarato.',
    },
  ],

  design: [
    {
      d: 'Qual è il rapporto di contrasto minimo per il testo normale secondo le WCAG di livello AA?',
      opzioni: ['4,5:1', '2:1', '3:1', '7:1'],
      giusta: 0,
      spiega: '3:1 vale per il testo grande, 7:1 è il livello AAA. Su un gestionale usato otto ore al giorno è la differenza tra leggibile e faticoso.',
    },
    {
      d: 'Dove va mostrato l’errore di un campo in un form lungo?',
      opzioni: [
        'Accanto al campo, con il testo che dice come correggerlo, e il focus portato lì',
        'In un avviso in cima alla pagina',
        'In una finestra modale al salvataggio',
        'Solo con il bordo rosso',
      ],
      giusta: 0,
      spiega: 'L’errore va dove sta il problema e deve dire cosa fare: il bordo rosso da solo non è un messaggio.',
    },
    {
      d: 'Dimensione minima consigliata per un bersaglio da toccare?',
      opzioni: ['Circa 44×44 px', 'Circa 20×20 px', 'Circa 30×30 px', 'Non esiste un minimo'],
      giusta: 0,
      spiega: 'È la misura che regge il dito medio di un adulto: sotto, gli errori di tocco diventano sistematici.',
    },
    {
      d: 'Perché in un design system si usano i token invece dei valori diretti?',
      opzioni: [
        'Perché il significato resta stabile mentre il valore può cambiare (temi, contrasto, rebrand) in un punto solo',
        'Perché i file pesano meno',
        'Perché lo richiedono gli strumenti di design',
        'Perché evitano di scrivere CSS',
      ],
      giusta: 0,
      spiega: '“Superficie in rilievo” resta valido in chiaro e in scuro; `#f6f8fa` no.',
    },
    {
      d: 'Come si progetta un tema scuro fatto bene?',
      opzioni: [
        'Ridefinendo i token con valori pensati per il fondo scuro, non invertendo i colori',
        'Applicando un filtro di inversione',
        'Abbassando la luminosità di tutta la pagina',
        'Usando il grigio al posto del nero',
      ],
      giusta: 0,
      spiega: 'L’inversione rovina immagini, ombre e gerarchia: i colori del tema scuro sono una scala a parte.',
    },
    {
      d: 'A cosa serve uno stato vuoto ben progettato?',
      opzioni: [
        'A spiegare cosa comparirà lì e a offrire la prima azione da compiere',
        'A riempire lo spazio con un’illustrazione',
        'A nascondere il fatto che non ci sono dati',
        'A mostrare un messaggio di errore',
      ],
      giusta: 0,
      spiega: 'La schermata vuota è il primo incontro con la funzione: se non dice cosa fare, la funzione resta inutilizzata.',
    },
    {
      d: 'Quando uno scheletro di caricamento è preferibile a uno spinner?',
      opzioni: [
        'Quando la struttura del contenuto è nota e l’attesa è breve: riduce lo spostamento percepito',
        'Sempre',
        'Solo per le immagini',
        'Quando l’attesa supera i dieci secondi',
      ],
      giusta: 0,
      spiega: 'Sulle attese lunghe o indeterminate serve un indicatore con contesto, non un finto contenuto che non arriva mai.',
    },
    {
      d: 'Come si scrive l’etichetta di un pulsante?',
      opzioni: [
        'Con il verbo dell’azione che compie: “Invia la richiesta”, non “Ok”',
        'Il più corta possibile',
        'Tutta maiuscola per farla notare',
        'Uguale al titolo della pagina',
      ],
      giusta: 0,
      spiega: 'Chi legge deve sapere cosa succede prima di premere, soprattutto nei dialoghi di conferma.',
    },
    {
      d: 'Quando una finestra modale è la scelta sbagliata?',
      opzioni: [
        'Quando il compito è lungo, richiede dati da altre schermate o va ripreso più tardi',
        'Quando serve una conferma',
        'Quando c’è un solo campo',
        'Quando l’azione è distruttiva',
      ],
      giusta: 0,
      spiega: 'La modale blocca il contesto: per un compito articolato serve una pagina con indirizzo proprio, che si possa lasciare e riprendere.',
    },
    {
      d: 'L’anello di focus visibile va rimosso perché “sporca” il design?',
      opzioni: [
        'No: si può ridisegnare, ma deve restare visibile per chi naviga da tastiera',
        'Sì, se il sito è solo per desktop',
        'Sì, tanto quasi nessuno usa la tastiera',
        'Solo sui campi di testo',
      ],
      giusta: 0,
      spiega: 'Senza focus visibile la navigazione da tastiera diventa cieca. Si stilizza, non si toglie.',
    },
    {
      d: 'In una tabella densa, come si guida l’occhio senza aggiungere rumore?',
      opzioni: [
        'Con allineamenti coerenti, numeri a destra e spaziature regolari, prima che con colori e bordi',
        'Alternando i colori di sfondo su ogni riga',
        'Aumentando lo spessore dei bordi',
        'Usando un colore diverso per ogni colonna',
      ],
      giusta: 0,
      spiega: 'Allineamento e ritmo fanno il lavoro; il colore va tenuto per quello che deve saltare all’occhio davvero.',
    },
    {
      d: 'Quanto conta la gerarchia tipografica in un gestionale?',
      opzioni: [
        'È lo strumento principale per far capire cosa guardare prima, molto più delle icone',
        'Poco: contano solo i colori',
        'Solo nelle pagine di marketing',
        'Serve unicamente per la stampa',
      ],
      giusta: 0,
      spiega: 'Dimensione, peso e spazio dicono cosa conta. In una schermata operativa è la differenza tra orientarsi e cercare.',
    },
  ],

  analisi: [
    {
      d: 'Prima riunione con un cliente che chiede “un gestionale”. Da cosa parti?',
      opzioni: [
        'Da come lavorano oggi e da dove perdono tempo, non dalle funzioni che chiedono',
        'Dall’elenco delle funzioni desiderate',
        'Dalla scelta delle tecnologie',
        'Dal preventivo',
      ],
      giusta: 0,
      spiega: 'La lista delle funzioni è già una soluzione, spesso copiata da un altro software: il valore sta nel problema che c’è sotto.',
    },
    {
      d: 'Il referente descrive una procedura, ma gli operativi ne seguono un’altra. Cosa scrivi nell’analisi?',
      opzioni: [
        'Quella reale, segnalando la differenza: il software deve funzionare sul processo vero',
        'Quella ufficiale, perché è approvata',
        'Una media delle due',
        'Nessuna delle due: chiedi al cliente di decidere e aspetti',
      ],
      giusta: 0,
      spiega: 'Il software costruito sulla procedura teorica viene aggirato il primo giorno. La differenza va portata a galla, non nascosta.',
    },
    {
      d: 'Cosa rende utile un perimetro scritto?',
      opzioni: [
        'Dire con chiarezza anche cosa NON entra nel primo rilascio',
        'Elencare tutte le funzioni possibili',
        'Essere il più breve possibile',
        'Usare un linguaggio tecnico preciso',
      ],
      giusta: 0,
      spiega: 'Le sorprese nascono da ciò che ognuno dava per scontato. L’elenco delle esclusioni vale quanto quello delle inclusioni.',
    },
    {
      d: 'Come stabilisci quale modulo rilasciare per primo?',
      opzioni: [
        'Quello che elimina più tempo perso o più errori, ed è misurabile in fretta',
        'Quello più semplice da sviluppare',
        'Quello che chiede il direttore',
        'Quello che tocca più reparti insieme',
      ],
      giusta: 0,
      spiega: 'Il primo rilascio deve dimostrare qualcosa: si sceglie dove il beneficio si vede e si misura entro poche settimane.',
    },
    {
      d: 'Un utente chiave è ostile al nuovo sistema. Come lo gestisci?',
      opzioni: [
        'Lo coinvolgi presto: spesso l’ostilità nasce da un dettaglio operativo che nessuno gli ha chiesto',
        'Lo eviti e parli solo con la direzione',
        'Aspetti che il sistema vada in produzione',
        'Chiedi che venga sostituito nel gruppo di lavoro',
      ],
      giusta: 0,
      spiega: 'Chi conosce le eccezioni del processo è la persona che ti evita tre settimane di rilavorazione.',
    },
    {
      d: 'Cosa deve contenere una richiesta di modifica ben scritta?',
      opzioni: [
        'Il comportamento atteso, quello osservato e come riprodurlo',
        'Uno screenshot',
        'La priorità dichiarata dal cliente',
        'Il nome di chi l’ha segnalata',
      ],
      giusta: 0,
      spiega: 'Senza riproduzione si perde più tempo a capire che a correggere.',
    },
    {
      d: 'La demo di fine sprint a chi va mostrata?',
      opzioni: [
        'A chi userà il software tutti i giorni, non solo a chi lo ha comprato',
        'Solo alla direzione',
        'Solo al referente tecnico',
        'A nessuno finché non è completo',
      ],
      giusta: 0,
      spiega: 'Il ritorno utile arriva da chi ci lavorerà: la direzione vede il progetto, gli operativi vedono i problemi.',
    },
    {
      d: 'Il cliente chiede una funzione “come ce l’ha il concorrente”. Cosa fai?',
      opzioni: [
        'Chiedi quale problema risolverebbe da loro: spesso la stessa funzione lì serve a un processo diverso',
        'La implementi uguale',
        'Rispondi che non è nel perimetro',
        'Proponi qualcosa di più avanzato',
      ],
      giusta: 0,
      spiega: 'Copiare una funzione senza il processo che la giustifica è il modo più rapido per aggiungere peso inutile.',
    },
    {
      d: 'Come tratti i dati da migrare in fase di analisi?',
      opzioni: [
        'Li guardi presto: qualità, duplicati e campi usati diversamente decidono metà del progetto',
        'Li rimandi alla fine, è un problema tecnico',
        'Li affidi al cliente',
        'Li ricrei da zero',
      ],
      giusta: 0,
      spiega: 'La migrazione scoperta a fine progetto è la causa più frequente dei go-live rimandati.',
    },
    {
      d: 'Cosa consegni al cliente alla fine dell’analisi?',
      opzioni: [
        'Perimetro, assunzioni, rischi e piano dei rilasci, in un linguaggio che sappia leggere',
        'Il diagramma del database',
        'Un preventivo dettagliato per ogni schermata',
        'I mockup di tutte le pagine',
      ],
      giusta: 0,
      spiega: 'L’analisi serve a decidere insieme: se il documento è leggibile solo da un tecnico, non ha fatto il suo lavoro.',
    },
    {
      d: 'Il progetto è in ritardo di una settimana. Quando lo dici al cliente?',
      opzioni: [
        'Appena lo sai, con la nuova data e cosa proponi di fare',
        'Alla consegna',
        'Alla riunione successiva già programmata',
        'Solo se il cliente lo chiede',
      ],
      giusta: 0,
      spiega: 'Un ritardo comunicato subito è un problema di programma; comunicato tardi diventa un problema di fiducia.',
    },
    {
      d: 'Come riconosci che un requisito è in realtà due requisiti?',
      opzioni: [
        'Quando non riesci a descrivere il risultato atteso con una sola frase verificabile',
        'Quando richiede più di un giorno di lavoro',
        'Quando tocca due tabelle',
        'Quando lo chiedono due persone diverse',
      ],
      giusta: 0,
      spiega: 'Se servono due criteri di accettazione, sono due lavori: separarli rende stima e verifica possibili.',
    },
  ],
}

/** Domande disponibili per un ruolo: specifiche più trasversali. */
export function fondoDomande(ruoloId) {
  return [...(perRuolo[ruoloId] ?? []), ...trasversali]
}

export const PASSI_TEST = 10

/* ------------------------------------------------------------------
   Domande finali del modulo di candidatura
   ------------------------------------------------------------------ */

export const domandeCandidatura = [
  {
    name: 'seniority',
    label: 'Anni di esperienza sul ruolo',
    tipo: 'select',
    opzioni: ['Meno di 1', '1–3', '3–5', '5–8', 'Più di 8'],
  },
  {
    name: 'disponibilita',
    label: 'Da quando saresti disponibile',
    tipo: 'select',
    opzioni: ['Subito', 'Entro un mese', 'Entro tre mesi', 'Sto solo guardando'],
  },
  {
    name: 'modalita',
    label: 'Come preferisci lavorare',
    tipo: 'select',
    opzioni: ['In sede', 'Ibrido', 'Da remoto'],
  },
  {
    name: 'progetto',
    label: 'Un progetto di cui vai fiero, e il tuo ruolo dentro',
    tipo: 'textarea',
    placeholder: 'Cosa hai costruito, con chi, e qual è la parte che hai fatto tu…',
    obbligatorio: true,
  },
  {
    name: 'difficile',
    label: 'Il problema tecnico più difficile che hai risolto negli ultimi due anni',
    tipo: 'textarea',
    placeholder: 'Cosa non funzionava, come ci sei arrivato, cosa hai imparato…',
    obbligatorio: true,
  },
  {
    name: 'link',
    label: 'GitHub, portfolio o LinkedIn',
    tipo: 'text',
    placeholder: 'https://…',
  },
]
