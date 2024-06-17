import {JSONFilePreset} from 'lowdb/node'
import {Low} from 'lowdb'
import path from 'path'
import {fileURLToPath} from 'url'
import ospath from 'ospath'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

const dbPath = path.join(ospath.data(), 'tldev/db/tldev.db.json')
const dbPathDir = path.dirname(dbPath)

if (!fs.existsSync(dbPathDir)) {
  // console.log(`Creating ${dbPathDir}...`)
  fs.mkdirSync(dbPathDir, {recursive: true})
}

type DbData = {
  _version: number
  ai: {
    provider: {
      setting: '' | 'openai' | 'groq'
    }
    model: {
      openai: {
        setting: string
      }
      groq: {
        setting: string
      }
    }
    key: {
      openai: {
        setting: string
      }
      groq: {
        setting: string
      }
    }
  }
}

const defaultDbData: DbData = {
  _version: 1,
  ai: {
    provider: {
      setting: '',
    },
    model: {
      openai: {
        setting: '',
      },
      groq: {
        setting: '',
      },
    },
    key: {
      openai: {
        setting: '',
      },
      groq: {
        setting: '',
      },
    },
  },
}

export const tldevDb: Low<DbData> = await JSONFilePreset<DbData>(dbPath, defaultDbData)
