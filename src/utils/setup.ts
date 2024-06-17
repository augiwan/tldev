import select, {Separator} from '@inquirer/select'
import {input} from '@inquirer/prompts'
import {tldevDb} from './db.js'

export async function setup(isResetup: boolean = false) {
  if (tldevDb.data.ai.provider.setting === '' || isResetup) {
    const providerAnswer: 'openai' | 'groq' = await select({
      message: 'Select an AI model provider',
      choices: [
        {
          name: 'Groq (recommended)',
          value: 'groq',
          description: 'Groq provides pretty good models at lower costs',
        },
        {
          name: 'OpenAI',
          value: 'openai',
          description: 'OpenAI provides GPT-3.5, GPT-4 and GPT-4o models',
        },
      ],
    })
    tldevDb.data.ai.provider.setting = providerAnswer

    if (isResetup) {
      tldevDb.data.ai.model[tldevDb.data.ai.provider.setting].setting = ''
    }

    await tldevDb.write()
  }

  if (tldevDb.data.ai.model[tldevDb.data.ai.provider.setting].setting === '' || isResetup) {
    const openAIChoices = [
      {
        name: 'gpt-4o (recommended)',
        value: 'gpt-4o',
        description: 'Quality: 5/5 | Cost effectiveness: 4/5',
      },
      {
        name: 'gpt-4',
        value: 'gpt-4o',
        description: 'Quality: 5/5 | Cost effectiveness: 2/5',
      },
      {
        name: 'gpt-3.5-turbo',
        value: 'gpt-3.5-turbo',
        description: 'Quality: 3/5 | Cost effectiveness: 5/5',
      },
    ]

    const groqChoices = [
      {
        name: 'llama3-8b (recommended)',
        value: 'llama3-8b-8192',
        description: 'Quality: 4/5 | Cost effectiveness: 5/5',
      },
      {
        name: 'mixtral-8x7b',
        value: 'mixtral-8x7b-32768',
        description: 'Quality: 3/5 | Cost effectiveness: 4/5',
      },
    ]

    const modelAnswer = await select({
      message: `Select a model from ${tldevDb.data.ai.provider.setting}`,
      choices: tldevDb.data.ai.provider.setting === 'openai' ? openAIChoices : groqChoices,
    })

    tldevDb.data.ai.model[tldevDb.data.ai.provider.setting].setting = modelAnswer
    // if (isResetup) {
    //   tldevDb.data.ai.key[tldevDb.data.ai.provider.setting].setting = ''
    // }

    await tldevDb.write()
  }

  if (tldevDb.data.ai.key[tldevDb.data.ai.provider.setting].setting === '' || isResetup) {
    const answer = await input({
      message: `Please enter your API key for ${tldevDb.data.ai.provider.setting}:`,
      default: tldevDb.data.ai.key[tldevDb.data.ai.provider.setting].setting,
    })

    tldevDb.data.ai.key[tldevDb.data.ai.provider.setting].setting = answer

    await tldevDb.write()
  }

  // console.log(JSON.stringify(tldevDb.data, null, 2))
}
