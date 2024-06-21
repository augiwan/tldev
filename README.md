tldev
=================

*Too ~~lazy~~ busy; dev only.*

[![Version](https://img.shields.io/npm/v/tldev.svg)](https://npmjs.org/package/tldev)
[![Downloads/week](https://img.shields.io/npm/dw/tldev.svg)](https://npmjs.org/package/tldev)

tldev is a collection of helpful tools for developers who are too ~~lazy~~ busy for anything other than writing code.

---

🧑‍💻 Wrote code in a hurry and not sure if its good enough?

✅ Use `tldev review FILE`  to get an expert AI code review.

```sh-session
$ tldev review src/app.js
```

![tldev code review](https://i.ibb.co/ts005zd/tldev-review.png)

---

🧑‍💻 Always wanted to write good commit messages, but no time or patience?

✅ Use `tldev diff` to generate a well written commit message from all your code changes (`git diff`).

```sh-session
$ tldev diff
=======================================================================
✅ tldev / Here's your freshly brewed commit message ☕️
=======================================================================

Exclude lock files and handle large diffs
-----------------------------------------------------------------------
- Improve main.js to exclude package manager lock files from git diff
- Update fold.js to use export syntax and remove CommonJS module.exports
- Update package.json: change main entry point, add clipboardy and
dedent-js dependencies, and mark project as a module
- Refactor OpenAI prompt and response handling for clarity
- Add .DS_Store to .gitignore to exclude macOS system files

=======================================================================
📋 Message also copied to clipboard, just paste!
=======================================================================
```

---

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
- [`tldev review FILE`](#tldev-review-file)
- [`tldev setup`](#tldev-setup)
- [`tldev help [COMMAND]`](#tldev-help-command)

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

<!-- commandsstop -->

---

# Telemetry

> To prioritize commands that have higher usage, I've set up Posthog to collect basic information about command runs (for now its just the name of the command). 

No personal data is collected other than a random uuid and some platform information.

You can see the event mechanism in [src/utils/events.ts](https://github.com/augiwan/tldev/blob/master/src/utils/events.ts) and an example track call in [src/commands/setup.ts](https://github.com/augiwan/tldev/blob/master/src/commands/setup.ts).

**Why platform info?**

I want to bundle as much functionality as possible for offline use, so information such as cpu and gpu counts and models can help analyze what portion of tldev users are capable of running AI models locally, and if it makes sense to bundle them along with this cli tool in the future.
