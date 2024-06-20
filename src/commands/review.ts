import tmp from 'tmp'
import fs from 'fs'
import open from 'open'
import showdown from 'showdown'
import {v4 as uuidv4} from 'uuid'
import {Args, Command} from '@oclif/core'
import {tldevDb} from '../utils/db.js'
import {runOpenAIPrompt} from '../ai/openai.js'
import {runGroqPrompt} from '../ai/groq.js'
import path from 'path'
import ora from 'ora'
import {setup} from '../utils/setup.js'
import {encode} from 'html-entities'
import {PROGRAMMING_FILES_MAP} from '../settings/programming.js'

export default class Review extends Command {
  static override args = {
    file: Args.string({description: 'File to review', required: true}),
  }

  static override description = 'Get your code reviewed by an expert AI'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  // static override flags = {
  //   // flag to replace with suggested edits (-r, --replace)
  //   replace: Flags.boolean({char: 'r', description: 'Replace file with suggested edits (experimental)'}),
  // }

  public async run(): Promise<void> {
    await setup()

    const spinner = ora('Reviewing your code').start()

    const {args, flags} = await this.parse(Review)

    // this.log('File: ', path.resolve(args.file))

    const fileExt = path.extname(args.file)
    if (!Object.keys(PROGRAMMING_FILES_MAP).includes(fileExt)) {
      this.log("This doesn't look like a code file. If it is, please raise a GitHub issue to suggest adding support.")
      this.log('https://github.com/augiwan/tldev/issues')
      return
    }

    const programmingLanguage = PROGRAMMING_FILES_MAP['.' + (args.file.split('.').pop() || '')]

    let codeContent
    try {
      codeContent = fs.readFileSync(path.resolve(args.file), 'utf8')
    } catch (error) {
      this.log(`Failed to read the file: ${error}`)
      return
    }

    let reply

    const prompt =
      `Here is a file containing code. ` +
      `Review it and suggest improvements and feedback. ` +
      `Be consise in your feedback. ` +
      `If there is nothing that can be improved, just say "Looks good". \n\n` +
      `IMPORTANT: Always respond in this JSON format:

\`\`\`
{
  "feedback": "(feedback)",
}
\`\`\`

NOTE: 'feedback' should be markdown formatted. Don't use '\`\`\`' for non-code text, only use it for code blocks.

Here is the code:

\`\`\`
${codeContent}
\`\`\`
`

    const systemPrompt = `You are an expert senior ${programmingLanguage} developer`

    // this.log(prompt)
    // this.log(systemPrompt)

    if (tldevDb.data.ai.provider.setting === 'openai') {
      reply = await runOpenAIPrompt(prompt, systemPrompt, this)
    } else if (tldevDb.data.ai.provider.setting === 'groq') {
      reply = await runGroqPrompt(prompt, systemPrompt, this)
    }

    if (reply === false) {
      return
    }

    // this.log(reply.feedback)

    const tmpobj = tmp.fileSync({keep: true, name: `tldev-review-${uuidv4()}.html`})
    // this.log('Filedescriptor: ', tmpobj.fd)

    const converter = new showdown.Converter({ghCodeBlocks: true})
    converter.setFlavor('github')
    const markdownContent = converter.makeHtml(reply.feedback)
    // this.log(`Feedback: ${tmpobj.name}`)

    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>tldev / Code Review</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/panda-syntax-dark.min.css"
        />
        <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/highlight.min.js"></script>
        <script>
          hljs.highlightAll();
        </script>
        <style>
          pre {
            background-color: #2a2c2d;
            color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto; /* Enable horizontal scroll */
          }

          code {
            font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
            font-size: 13px !important;
            background-color: #2a2c2d;
            color: #ffffff;
            padding: 2px;
            border-radius: 4px;
          }

          pre code {
            background-color: unset;
            color: unset;
            display: block;
            white-space: pre;
            font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
            font-size: 13px !important;
            line-height: 1.5;
          }

          ul {
            list-style-type: disc !important;
            padding-left: 20px !important;
          }

          ol {
            list-style-type: decimal !important;
            padding-left: 20px !important;
          }

          /* Resetting heading styles */
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-weight: bold !important;
            margin-top: 0 !important;
            margin-bottom: 0.5rem !important;
            margin-top: 24px !important;
          }

          h1 {
            font-size: 2.5rem !important;
          }

          h2 {
            font-size: 2rem !important;
          }

          h3 {
            font-size: 1.75rem !important;
          }

          h4 {
            font-size: 1.5rem !important;
          }

          h5 {
            font-size: 1.25rem !important;
          }

          h6 {
            font-size: 1rem !important;
          }

          #markdown-content > h1,
          #markdown-content > h2,
          #markdown-content > h3,
          #markdown-content > h4,
          #markdown-content > h5,
          #markdown-content > h6 {
            margin-top: 0 !important;
          }
        </style>
      </head>
      <body class="bg-gray-100 flex max-w-4xl mx-auto">
        <div class="container mx-auto p-4">
          <header class="mb-8 text-center">
            <h1 class="text-4xl font-bold mb-2">tldev / Code Review</h1>
            <h2 class="text-xl text-gray-600">${args.file}</h2>
          </header>

          <div class="bg-white shadow-md rounded-lg p-6">
            <div id="markdown-content" class="prose max-w-none">
              <!-- Rendered HTML content -->
                ${markdownContent}
            </div>
          </div>
        </div>
      </body>
      <!-- Original markdown content -->
      <!-- ${encode(reply.feedback, {mode: 'nonAsciiPrintable'})} -->
    </html>`

    open(tmpobj.name)
    fs.writeFileSync(tmpobj.name, htmlTemplate)
    // this.log('Done')

    spinner.stop()
    const message = [
      `=======================================================================`,
      `✅ tldev / Code review done, opening... ☕️`,
      `=======================================================================`,
    ].join('\n')
    this.log(message)

    // if (flags.replace) {
    //   this.log(`Replacing file contents for: ${args.file}`)
    // }
  }
}
