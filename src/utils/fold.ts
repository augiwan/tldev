// Credits: https://jsfiddle.net/jahroy/Rwr7q/18/
//
// Folds a string at a specified length, optionally attempting
// to insert newlines after whitespace characters.
//
// s          -  input string
// n          -  number of chars at which to separate lines
// useSpaces  -  if true, attempt to insert newlines at whitespace
// a          -  array used to build result
//
// Returns an array of strings that are no longer than n
// characters long.  If a is specified as an array, the lines
// found in s will be pushed onto the end of a.
//
// If s is huge and n is very small, this metho will have
// problems... StackOverflow.
//

export function fold(s: string, n: number, useSpaces: boolean = false, a: string[] = []): string[] {
  if (s.length <= n) {
    a.push(s);
    return a;
  }
  let line = s.substring(0, n);
  if (!useSpaces) {
    // insert newlines anywhere
    a.push(line);
    return fold(s.substring(n), n, useSpaces, a);
  } else {
    // attempt to insert newlines after whitespace
    const lastSpaceRgx = /\s(?!.*\s)/;
    const idx = line.search(lastSpaceRgx);
    const nextIdx = idx > 0 ? idx : n;
    a.push(line.substring(0, nextIdx));
    return fold(s.substring(nextIdx), n, useSpaces, a);
  }
}

// Regex version of fold function.

function foldRgx(s: string, n: number): string[] {
  const rgx = new RegExp(`.{0,${n}}`, "g");
  return s.match(rgx) || [];
}

