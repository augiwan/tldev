tldev
=================

*Too ~~lazy~~ busy; dev mode only.*

---
🧑‍💻 Always wanted to write good commit messages, but no time or patience?

✅ Use `tldev diff` to generate a well written commit message from all your code changes (`git diff`).

---

🧑‍💻 Wrote code in a hurry and not sure if its good enough?

✅ Use `tldev review FILE`  to get an expert code review.

![tldev code review](https://i.ibb.co/ts005zd/tldev-review.png)

---


[![Version](https://img.shields.io/npm/v/tldev.svg)](https://npmjs.org/package/tldev)
[![Downloads/week](https://img.shields.io/npm/dw/tldev.svg)](https://npmjs.org/package/tldev)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g tldev

$ tldev diff
=======================================================================
✅ tldev / Here's your freshly brewed commit message ☕️
=======================================================================

TLDEV: Changed README.md
-----------------------------------------------------------------------
- Updated README.md to reflect new tldev features
- Added detailed descriptions of tldev commands
- Improved plugin management and installation


=======================================================================
📋 Message also copied to clipboard, just paste!
=======================================================================

$ tldev review src/app.js
=======================================================================
✅ tldev / Code review done, opening... ☕️
=======================================================================

$ tldev help
```
<!-- usagestop -->
# Commands
<!-- commands -->
- [`tldev diff`](#tldev-diff)
- [`tldev help [COMMAND]`](#tldev-help-command)
- [`tldev review FILE`](#tldev-review-file)
- [`tldev setup`](#tldev-setup)

## `tldev diff`

Generate a well written commit message from your git diff

```
USAGE
  $ tldev diff

DESCRIPTION
  Generate a well written commit message from your git diff

EXAMPLES
  $ tldev diff
```

## `tldev help [COMMAND]`

Display help for tldev.

```
USAGE
  $ tldev help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for tldev.
```


## `tldev review FILE`

Get your code reviewed by an expert AI

```
USAGE
  $ tldev review FILE [-r]

ARGUMENTS
  FILE  File to review

DESCRIPTION
  Get your code reviewed by an expert AI

EXAMPLES
  $ tldev review
```

## `tldev setup`

Set up tldev

```
USAGE
  $ tldev setup

DESCRIPTION
  Set up tldev

EXAMPLES
  $ tldev setup
```

<!-- commandsstop -->
