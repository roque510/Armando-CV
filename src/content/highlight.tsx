import type { ReactNode } from "react";
import type { CodeLang } from "./types";

type Tok = { cls: string; text: string };

const TS_KEYWORDS = new Set([
  "const", "let", "var", "function", "return", "if", "else", "for", "while",
  "await", "async", "import", "from", "export", "default", "type", "interface",
  "class", "extends", "implements", "new", "try", "catch", "finally", "throw",
  "switch", "case", "break", "continue", "of", "in", "typeof", "instanceof",
  "as", "enum", "public", "private", "readonly", "void", "null", "undefined",
  "true", "false", "this", "super", "yield", "do", "static", "get", "set",
]);

const TS_TYPES = new Set([
  "string", "number", "boolean", "Promise", "Record", "Array", "Partial",
  "Map", "Set", "Date", "unknown", "any", "never", "object", "bigint", "symbol",
]);

const PUNCT = /[{}()[\].,;:?<>=+\-*/%&|!~^]/;

function tokenizeTs(code: string): Tok[] {
  const toks: Tok[] = [];
  const n = code.length;
  let i = 0;
  const push = (cls: string, text: string) => toks.push({ cls, text });

  while (i < n) {
    const c = code[i];

    if (/\s/.test(c)) {
      let j = i + 1;
      while (j < n && /\s/.test(code[j])) j++;
      push("", code.slice(i, j));
      i = j;
      continue;
    }
    if (c === "/" && code[i + 1] === "/") {
      let j = i + 2;
      while (j < n && code[j] !== "\n") j++;
      push("tok-com", code.slice(i, j));
      i = j;
      continue;
    }
    if (c === "/" && code[i + 1] === "*") {
      let j = i + 2;
      while (j < n && !(code[j] === "*" && code[j + 1] === "/")) j++;
      j = Math.min(n, j + 2);
      push("tok-com", code.slice(i, j));
      i = j;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      let j = i + 1;
      while (j < n && code[j] !== c) {
        if (code[j] === "\\") j++;
        j++;
      }
      j = Math.min(n, j + 1);
      push("tok-str", code.slice(i, j));
      i = j;
      continue;
    }
    if (/[0-9]/.test(c)) {
      let j = i + 1;
      while (j < n && /[0-9._a-fxX]/.test(code[j])) j++;
      push("tok-num", code.slice(i, j));
      i = j;
      continue;
    }
    if (/[A-Za-z_$]/.test(c)) {
      let j = i + 1;
      while (j < n && /[A-Za-z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i, j);
      let k = j;
      while (k < n && /\s/.test(code[k])) k++;
      let cls = "";
      if (TS_KEYWORDS.has(word)) cls = "tok-kw";
      else if (TS_TYPES.has(word) || /^[A-Z]/.test(word)) cls = "tok-ty";
      else if (code[k] === "(") cls = "tok-fn";
      push(cls, word);
      i = j;
      continue;
    }
    if (PUNCT.test(c)) {
      let j = i + 1;
      while (j < n && PUNCT.test(code[j])) j++;
      push("tok-pn", code.slice(i, j));
      i = j;
      continue;
    }
    push("", c);
    i++;
  }
  return toks;
}

function tokenizeBash(code: string): Tok[] {
  const toks: Tok[] = [];
  const n = code.length;
  let i = 0;
  const push = (cls: string, text: string) => toks.push({ cls, text });

  while (i < n) {
    const c = code[i];
    if (c === "#") {
      let j = i + 1;
      while (j < n && code[j] !== "\n") j++;
      push("tok-com", code.slice(i, j));
      i = j;
      continue;
    }
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < n && code[j] !== c) j++;
      j = Math.min(n, j + 1);
      push("tok-str", code.slice(i, j));
      i = j;
      continue;
    }
    if (c === "-" && /[A-Za-z-]/.test(code[i + 1] ?? "")) {
      let j = i + 1;
      while (j < n && /[A-Za-z-]/.test(code[j])) j++;
      push("tok-pn", code.slice(i, j));
      i = j;
      continue;
    }
    let j = i + 1;
    while (j < n && code[j] !== "#" && code[j] !== '"' && code[j] !== "'" && code[j] !== "\n") j++;
    push("", code.slice(i, j));
    i = j;
  }
  return toks;
}

/** Highlight a code string into token-coloured spans matching the design tokens. */
export function highlight(code: string, lang: CodeLang = "ts"): ReactNode[] {
  const toks = lang === "bash" ? tokenizeBash(code) : tokenizeTs(code);
  return toks.map((tk, i) =>
    tk.cls ? (
      <span key={i} className={tk.cls}>
        {tk.text}
      </span>
    ) : (
      <span key={i}>{tk.text}</span>
    )
  );
}
