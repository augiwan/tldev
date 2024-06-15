#! /usr/bin/env node
import shell from "shelljs";
import OpenAI from "openai";
import dedent from "dedent-js";
import clipboard from "clipboardy";
import { fold } from "./fold.js";

const IGNORED_FILES = [
  // npm (JS)
  "package-lock.json",
  // Yarn (JS)
  "yarn.lock",
  // pnpm (JS)
  "pnpm-lock.yaml",
  // Composer (PHP)
  "composer.lock",
  // Bundler (Ruby)
  "Gemfile.lock",
  // pip (Python)
  "Pipfile.lock",
  // Cargo (Rust)
  "Cargo.lock",
  // Poetry (Python)
  "poetry.lock",
  // Maven (Java)
  "pom.xml",
  // Gradle (Java)
  "gradle.lockfile",
];

const excludeList = IGNORED_FILES.map(
  (file) => `':(exclude)**/${file}' ':(exclude)${file}'`
).join(" ");

if (!process.env["OPENAI_API_KEY"]) {
  console.log(
    "tldev commit > OPENAI_API_KEY missing, please set it and try again."
  );
  process.exit(1);
}

const openai = new OpenAI({
  // apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

let diff = shell.exec(`git --no-pager diff ${excludeList}`, {
  silent: true,
}).stdout;

if (diff.trim() === "") {
  console.log("tldev commit > No changes detected.");
  process.exit(1);
}

// Take the first 10,000 characters of the diff in case of large diffs
diff = diff.substring(0, 10000);

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

`;

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are an experienced software engineer who writes perfect git commit messages.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "gpt-4o",
    response_format: { type: "json_object" },
  });

  const reply = JSON.parse(completion.choices[0].message.content);

  /**
   * Merges lines into a single string, breaking each line into
   * 72 characters by word.
   *
   * @param {Array<string>} lines - The lines to be merged.
   * @returns {string} The merged lines.
   */
  function merge(lines) {
    // Initialize the final string
    let final = "";

    // Iterate over each line
    lines.forEach((line) => {
      // Break line into 72 characters by word
      let line_parts = fold(line.trim(), 72, true);

      // Iterate over each part of the line
      line_parts.forEach((part, index) => {
        // If it's the first part, prepend it with "- " and add a new line
        // The extra spacing at the end of "\n    " is for dedent
        if (index === 0) {
          final = final + "- " + part.trim() + "\n    ";
        }
        // Otherwise, prepend it with "   " and add a new line
        // The extra spacing at the end of "\n    " is for dedent
        else {
          final = final + "  " + part.trim() + "\n    ";
        }
      });
    });

    // Return the merged lines
    return final;
  }

  const message = dedent(`
    =======================================================================
    ✅ tldev / Here's your freshly brewed commit message ☕️
    =======================================================================

    ${reply.commit_message_subject}
    -----------------------------------------------------------------------
    ${merge(reply.commit_message_body)}
    
    =======================================================================
    📋 Message also copied to clipboard, just paste!
    =======================================================================
    `);

  clipboard.writeSync(reply.commit_message_subject);
  console.log(message);
}

main();
