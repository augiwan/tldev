import {Args, Command, Flags} from '@oclif/core'
import shell from 'shelljs'
import {runOpenAIPrompt} from '../ai/openai.js'
import {runGroqPrompt} from '../ai/groq.js'
import clipboard from 'clipboardy'
import {fold} from '../utils/fold.js'
import ora from 'ora'
import {setup} from '../utils/setup.js'
import {tldevDb} from '../utils/db.js'

const IGNORED_FILES = [
  // npm (JS)
  'package-lock.json',
  // Yarn (JS)
  'yarn.lock',
  // pnpm (JS)
  'pnpm-lock.yaml',
  // Composer (PHP)
  'composer.lock',
  // Bundler (Ruby)
  'Gemfile.lock',
  // pip (Python)
  'Pipfile.lock',
  // Cargo (Rust)
  'Cargo.lock',
  // Poetry (Python)
  'poetry.lock',
  // Maven (Java)
  'pom.xml',
  // Gradle (Java)
  'gradle.lockfile',
]

const excludeList = IGNORED_FILES.map((file) => `':(exclude)**/${file}' ':(exclude)${file}'`).join(' ')

export default class Diff extends Command {
  static override args = {
    // file: Args.string({
    //   description: 'file to read',
    // }),
  }

  static override description = 'Generate a well written commit message from your git diff'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  public async run(): Promise<void> {
    await setup()

    const spinner = ora('Analyzing your code changes').start()

    let diff = shell.exec(`git --no-pager diff * ${excludeList}`, {
      silent: true,
    }).stdout

    if (diff.trim() === '') {
      spinner.stop()
      this.log('✅ tldev diff > No changes detected.')
      process.exit(1)
    }

    // Take the first 10,000 characters of the diff in case of large diffs
    if (diff.trim() === '') {
      spinner.stop()
      this.log('⚠️ tldev diff > Your `git diff` is too large, continuing with partial commit message generation.')
      process.exit(1)
    }
    diff = diff.substring(0, 10000)

    const prompt = `Here is my current git diff output, write a good concise git commit message.

\`\`\`
${diff}
\`\`\`

You need to strictly follow these rules:

* Limit the subject line to 50 characters
* Always capitalize the first word of the subject line
* Do not end the subject line with a period
* Use the imperative mood in the subject line
* Use the body to explain what and why vs. how
* Always write the body as a list of bullet points (return a list of strings)
* Ignore changes to any package manager lock files

Please respond with the commit message in this JSON format:

\`\`\`
{
  "commit_message_subject": "(Subject)",
  "commit_message_body": ["(Point 1)", "(Point 2)", ...]
}
\`\`\`

`
    spinner.stop()
    const spinner2 = ora('Brewing your commit message').start()
    let reply

    const systemPrompt = 'You are an experienced software engineer who writes perfect git commit messages.'

    if (tldevDb.data.ai.provider.setting === 'openai') {
      reply = await runOpenAIPrompt(prompt, systemPrompt, this)
    } else if (tldevDb.data.ai.provider.setting === 'groq') {
      reply = await runGroqPrompt(prompt, systemPrompt, this)
    }

    spinner2.stop()

    if (reply === false) {
      return
    }

    /**
     * Merges lines into a single string, breaking each line into
     * 72 characters by word.
     *
     * @param {Array<string>} lines - The lines to be merged.
     * @returns {string} The merged lines.
     */
    function merge(lines: string[] = []) {
      // Initialize the final string
      let final = ''

      // Iterate over each line
      lines.forEach((line = '') => {
        // Break line into 72 characters by word
        let line_parts = fold(line.trim(), 72, true)

        // Iterate over each part of the line
        line_parts.forEach((part, index) => {
          // If it's the first part, prepend it with "- " and add a new line
          // The extra spacing at the end of "\n    " is for dedent
          if (index === 0) {
            final = final + '- ' + part.trim() + '\n'
          }
          // Otherwise, prepend it with "   " and add a new line
          // The extra spacing at the end of "\n    " is for dedent
          else {
            final = final + '  ' + part.trim() + '\n'
          }
        })
      })

      // Return the merged lines
      return final
    }

    const message = [
      `=======================================================================`,
      `✅ tldev / Here's your freshly brewed commit message ☕️`,
      `=======================================================================`,
      ``,
      `${reply.commit_message_subject}`,
      `-----------------------------------------------------------------------`,
      `${merge(reply.commit_message_body)}`,
      ``,
      `=======================================================================`,
      `📋 Message also copied to clipboard, just paste!`,
      `=======================================================================`,
    ].join('\n')

    clipboard.writeSync(reply.commit_message_subject)

    this.log(message)
  }
}
