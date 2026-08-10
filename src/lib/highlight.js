/**
 * Evidenziazione minima della sintassi, condivisa dalla finestra di codice e
 * dal gioco "trova il bug". Un solo passaggio di regex, alternanze in ordine
 * di priorità: commenti, stringhe, parole chiave, chiamate di funzione, numeri.
 *
 * I colori sono token, quindi seguono il tema chiaro/scuro come l'editor di
 * GitHub.
 */

export const TOKEN_COLORS = {
  comment: 'var(--color-code-comment)',
  string: 'var(--color-code-string)',
  keyword: 'var(--color-code-keyword)',
  fn: 'var(--color-code-fn)',
  number: 'var(--color-code-number)',
  tag: 'var(--color-code-tag)',
  plain: 'var(--color-code-plain)',
}

const KEYWORDS =
  'const|let|var|await|async|function|return|import|from|export|default|new|if|else|for|while|class|extends|type|interface|public|private|def|self|try|catch|throw|with|fn|pub|impl|match|use|mut'

const TOKEN = new RegExp(
  [
    '(?<comment>\\/\\/[^\\n]*|#[^\\n]*)',
    '(?<string>"[^"]*"|\'[^\']*\'|`[^`]*`)',
    `(?<keyword>\\b(?:${KEYWORDS})\\b)`,
    '(?<fn>\\b[A-Za-z_$][\\w$]*(?=\\())',
    '(?<number>\\b\\d+(?:\\.\\d+)?\\b)',
  ].join('|'),
  'g',
)

/** Spezza una riga in token `{ text, kind }`. */
export function tokenize(line) {
  const out = []
  let last = 0
  TOKEN.lastIndex = 0

  let match
  while ((match = TOKEN.exec(line)) !== null) {
    if (match.index > last) out.push({ text: line.slice(last, match.index), kind: 'plain' })
    const kind = Object.keys(match.groups).find((k) => match.groups[k] != null)
    out.push({ text: match[0], kind })
    last = match.index + match[0].length
  }
  if (last < line.length) out.push({ text: line.slice(last), kind: 'plain' })

  return out
}
