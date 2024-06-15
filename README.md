# tldev

*Too ~~lazy~~ busy; dev mode only.*

---

🧑‍💻 Always wanted to write good commit messages, but no time or patience?

✅ Use `tldev commit` to generate a well written commit message from all your code changes (`git diff`).

---

## Commands

### `tldev commit`

Write a commit message from your git diff, following all the best practices mentioned in [How to Write a Git Commit Message](https://cbea.ms/git-commit/).

⚠️ **Note:** This only picks up changes output by `git diff` so it won't show changes that are not staged yet.


When you're ready to commit your changes to git, run this in your project directory:

```
$ tldev commit
=======================================================================
✅ tldev / Here's your freshly brewed commit message ☕️
=======================================================================

Simplify serialize.h's exception handling
-----------------------------------------------------------------------
- Remove the 'state' and 'exceptmask' from serialize.h's stream
  implementations, as well as related methods.
- Add 'exceptmask' to the serialize.h's stream implementation.

=======================================================================
📋 Message also copied to clipboard, just paste!
=======================================================================
```

The first line is the subject and the rest is the body. Feel free to edit it as you please. 

## About tldev

tldev is a collection of helpful tools for developers who are too ~~lazy~~ busy to do anything other than writing code. With AI &trade;.

⚠️ **Note:** tldev uses OpenAI. Please make sure you have the `OPENAI_API_KEY` env variable set. It uses your key to communicate directly with OpenAI; I don't run any servers.
