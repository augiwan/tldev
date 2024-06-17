import Groq from 'groq-sdk'
import {Command} from '@oclif/core'
import {tldevDb} from '../utils/db.js'

export async function runGroqPrompt(prompt: string, command: Command) {
  if (tldevDb.data.ai.key.groq.setting === '') {
    command.log('tldev commit > GROQ_API_KEY missing, please set it and try again.')
    return false
  }

  const groq = new Groq({
    apiKey: tldevDb.data.ai.key.groq.setting,
  })

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are an experienced software engineer who writes perfect git commit messages.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: tldevDb.data.ai.model.groq.setting,
    response_format: {
      type: 'json_object',
    },
  })

  return JSON.parse(completion.choices[0].message.content || '{}')
}
