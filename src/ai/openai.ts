import OpenAI from 'openai'
import {Command} from '@oclif/core'
import {tldevDb} from '../utils/db.js'

export async function runOpenAIPrompt(prompt: string, command: Command) {
  if (tldevDb.data.ai.key.openai.setting === '') {
    command.log('tldev commit > OPENAI_API_KEY missing, please set it and try again.')
    return false
  }

  const openai = new OpenAI({
    apiKey: tldevDb.data.ai.key.openai.setting,
  })

  const completion = await openai.chat.completions.create({
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
    model: tldevDb.data.ai.model.openai.setting,
    response_format: {
      type: 'json_object',
    },
  })

  return JSON.parse(completion.choices[0].message.content || '{}')
}
