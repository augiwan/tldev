tldev
=================

*Too ~~lazy~~ busy; dev mode only.*

---
🧑‍💻 Always wanted to write good commit messages, but no time or patience?

✅ Use `tldev diff` to generate a well written commit message from all your code changes (`git diff`).

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

$ tldev help
```
<!-- usagestop -->
# Commands
<!-- commands -->
- [tldev](#tldev)
- [Usage](#usage)
- [Commands](#commands)
  - [`tldev diff`](#tldev-diff)
  - [`tldev help [COMMAND]`](#tldev-help-command)
<!-- - [`tldev plugins`](#tldev-plugins)
- [`tldev plugins add PLUGIN`](#tldev-plugins-add-plugin)
- [`tldev plugins:inspect PLUGIN...`](#tldev-pluginsinspect-plugin)
- [`tldev plugins install PLUGIN`](#tldev-plugins-install-plugin)
- [`tldev plugins link PATH`](#tldev-plugins-link-path)
- [`tldev plugins remove [PLUGIN]`](#tldev-plugins-remove-plugin)
- [`tldev plugins reset`](#tldev-plugins-reset)
- [`tldev plugins uninstall [PLUGIN]`](#tldev-plugins-uninstall-plugin)
- [`tldev plugins unlink [PLUGIN]`](#tldev-plugins-unlink-plugin)
- [`tldev plugins update`](#tldev-plugins-update) -->

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

<!-- ## `tldev plugins`

List installed plugins.

```
USAGE
  $ tldev plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ tldev plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.2/src/commands/plugins/index.ts)_

## `tldev plugins add PLUGIN`

Installs a plugin into tldev.

```
USAGE
  $ tldev plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into tldev.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the TLDEV_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the TLDEV_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ tldev plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ tldev plugins add myplugin

  Install a plugin from a github url.

    $ tldev plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ tldev plugins add someuser/someplugin
```

## `tldev plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ tldev plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ tldev plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.2/src/commands/plugins/inspect.ts)_

## `tldev plugins install PLUGIN`

Installs a plugin into tldev.

```
USAGE
  $ tldev plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into tldev.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the TLDEV_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the TLDEV_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ tldev plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ tldev plugins install myplugin

  Install a plugin from a github url.

    $ tldev plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ tldev plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.2/src/commands/plugins/install.ts)_

## `tldev plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ tldev plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ tldev plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.2/src/commands/plugins/link.ts)_

## `tldev plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ tldev plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ tldev plugins unlink
  $ tldev plugins remove

EXAMPLES
  $ tldev plugins remove myplugin
```

## `tldev plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ tldev plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.2/src/commands/plugins/reset.ts)_

## `tldev plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ tldev plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ tldev plugins unlink
  $ tldev plugins remove

EXAMPLES
  $ tldev plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.2/src/commands/plugins/uninstall.ts)_

## `tldev plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ tldev plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ tldev plugins unlink
  $ tldev plugins remove

EXAMPLES
  $ tldev plugins unlink myplugin
```

## `tldev plugins update`

Update installed plugins.

```
USAGE
  $ tldev plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.2/src/commands/plugins/update.ts)_ -->
<!-- commandsstop -->
