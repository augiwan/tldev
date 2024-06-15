#! /usr/bin/env node
var shell = require("shelljs");
var OpenAI = require("openai");

var fold = require("./fold.js");

const openai = new OpenAI({
  // apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

diff = shell.exec("git --no-pager diff").stdout;

prompt = `Here is my current git diff output, write a good concise git commit message.

\`\`\`
${diff}
\`\`\`

You need to strictly follow these rules:

* Limit the subject line to 50 characters
* Always capitalize the first word of the subject line
* Do not end the subject line with a period
* Use the imperative mood in the subject line
* Use the body to explain what and why vs. how
* Ignore changes to any package manager lock files

Please respond with the commit message in this JSON format:

\`\`\`
{
  "commit_message_subject": "",
  "commit_message_body": ""
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

  reply = JSON.parse(completion.choices[0].message.content);

  message = `\
=======================================================================
tldev / Here's your freshly brewed commit message ☕️
------------------------------------------------------------------------
${reply.commit_message_subject}

${fold(reply.commit_message_body, 72, true)
  .map((line) => line.trim())
  .join("\n")}
=======================================================================`;

  console.log(message);
}

main();
