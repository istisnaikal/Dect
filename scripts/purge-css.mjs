// Per-page CSS without a dependency: every page is shipped only the rules that can ever apply
// to it. A style rule stays if, for at least one of its selectors, every class it requires
// exists in that page's HTML or can be added later by the site's own scripts. Anything that
// cannot be judged safely (:is, :where, :has) stays; classes inside :not() are not required;
// @keyframes stay only if a remaining rule animates with them. Works on minified CSS.

const skipString = (s, i) => {
  const q = s[i];
  for (i++; i < s.length && s[i] !== q; i++) if (s[i] === '\\') i++;
  return i;
};

/** Split `css` into top-level [prelude, body] blocks, honouring strings and nesting. */
function blocks(css) {
  const out = [];
  let i = 0;
  while (i < css.length) {
    let start = i;
    let depth = 0;
    // prelude: up to the first '{' or ';' at depth 0 (statements like @charset end with ';')
    for (; i < css.length; i++) {
      const ch = css[i];
      if (ch === '"' || ch === "'") i = skipString(css, i);
      else if (ch === '(' || ch === '[') depth++;
      else if (ch === ')' || ch === ']') depth--;
      else if (depth === 0 && (ch === '{' || ch === ';')) break;
    }
    if (i >= css.length) break;
    if (css[i] === ';') {
      out.push({ statement: css.slice(start, i + 1) });
      i++;
      continue;
    }
    const prelude = css.slice(start, i).trim();
    const open = ++i;
    let level = 1;
    for (; i < css.length && level; i++) {
      const ch = css[i];
      if (ch === '"' || ch === "'") i = skipString(css, i);
      else if (ch === '{') level++;
      else if (ch === '}') level--;
    }
    out.push({ prelude, body: css.slice(open, i - 1) });
  }
  return out;
}

/** Split a selector list on top-level commas. */
function selectors(list) {
  const out = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < list.length; i++) {
    const ch = list[i];
    if (ch === '"' || ch === "'") i = skipString(list, i);
    else if (ch === '(' || ch === '[') depth++;
    else if (ch === ')' || ch === ']') depth--;
    else if (ch === ',' && depth === 0) {
      out.push(list.slice(start, i));
      start = i + 1;
    }
  }
  out.push(list.slice(start));
  return out.map((s) => s.trim()).filter(Boolean);
}

/** Remove every `:not(...)` group (balanced), so the classes inside are not required. */
function dropNot(sel) {
  let out = '';
  for (let i = 0; i < sel.length; i++) {
    if (sel.startsWith(':not(', i)) {
      let depth = 0;
      for (i += 4; i < sel.length; i++) {
        if (sel[i] === '(') depth++;
        else if (sel[i] === ')' && --depth === 0) break;
      }
      continue;
    }
    out += sel[i];
  }
  return out;
}

function canMatch(sel, has) {
  if (/:(is|where|has)\(/.test(sel)) return true;
  const plain = dropNot(sel)
    .replace(/\[[^\]]*\]/g, '') // attribute selectors are not judged
    .replace(/(["']).*?\1/g, '');
  for (const m of plain.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) if (!has(m[1])) return false;
  return true;
}

function purge(css, has, kept) {
  let out = '';
  for (const b of blocks(css)) {
    if (b.statement) {
      out += b.statement;
      continue;
    }
    const p = b.prelude;
    if (/^@(media|supports|layer|container|document)\b/.test(p)) {
      const inner = purge(b.body, has, kept);
      if (inner) out += `${p}{${inner}}`;
    } else if (/^@(-webkit-)?keyframes\b/.test(p)) {
      kept.keyframes.push({ name: p.replace(/^@(-webkit-)?keyframes\s+/, '').trim(), text: `${p}{${b.body}}` });
      out += `\u0000KF:${kept.keyframes.length - 1}\u0000`;
    } else if (p.startsWith('@')) {
      out += `${p}{${b.body}}`; // @font-face, @property, @view-transition…
    } else if (selectors(p).some((s) => canMatch(s, has))) {
      out += `${p}{${b.body}}`;
    }
  }
  return out;
}

/**
 * @param {string} css     minified stylesheet
 * @param {Set<string>} classes  every class that can exist on the page
 */
export function purgeCss(css, classes) {
  const kept = { keyframes: [] };
  let out = purge(css, (c) => classes.has(c), kept);
  // Keyframes survive only if a remaining declaration animates with them.
  const used = new Set();
  const bare = out.replace(/\u0000KF:\d+\u0000/g, '');
  for (const m of bare.matchAll(/animation(?:-name)?\s*:\s*([^;}]+)/g)) for (const t of m[1].split(/[\s,]+/)) used.add(t);
  out = out.replace(/\u0000KF:(\d+)\u0000/g, (_, i) => (used.has(kept.keyframes[i].name) ? kept.keyframes[i].text : ''));
  return out;
}

/** Every class token in an HTML string (class attributes, quoted or not). */
export function htmlClasses(html) {
  const set = new Set();
  for (const m of html.matchAll(/\sclass=(?:"([^"]*)"|'([^']*)'|([^\s>"']+))/g))
    for (const c of (m[1] ?? m[2] ?? m[3]).split(/\s+/)) if (c) set.add(c);
  return set;
}

/** Every string literal in the site's scripts that could be a class name. */
export function scriptClasses(sources) {
  const set = new Set();
  for (const src of sources)
    for (const m of src.matchAll(/(["'`])([^"'`\n]{1,200}?)\1/g))
      for (const t of m[2].split(/[\s.,:>#()[\]=]+/)) if (/^-?[_a-zA-Z][\w-]*$/.test(t)) set.add(t);
  return set;
}
