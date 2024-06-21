import fs from 'fs'
import os from 'os'
import path from 'path'
import {Low} from 'lowdb'
import ospath from 'ospath'
import platform from 'platform'
import {v4 as uuidv4} from 'uuid'
import {fileURLToPath} from 'url'
import {JSONFilePreset} from 'lowdb/node'
import Systeminformation from 'systeminformation'

async function getPlatformDetails() {
  const graphics = await Systeminformation.graphics()
  const osInfo = await Systeminformation.osInfo()

  return {
    os_platform: os.platform().toString(),
    os_release: os.release(),
    os_type: os.type(),
    os_arch: os.arch(),
    os_totalmem: os.totalmem(),
    os_freemem: os.freemem(),
    os_distro: osInfo.distro ?? 'N/A',
    os_codename: osInfo.codename ?? 'N/A',
    platform_name: platform.name ?? 'N/A',
    platform_version: platform.version ?? 'N/A',
    cpu_count: os.cpus().length,
    cpu_model: os.cpus()[0].model,
    gpu_count: graphics.controllers.length,
    gpu_models: graphics.controllers.map((g) => g.model),
  }
}

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
  user: {
    distinctId: string
    platform: {
      os_platform: string
      os_release: string
      os_type: string
      os_arch: string
      os_totalmem: Number
      os_freemem: Number
      os_distro: string
      os_codename: string
      platform_name: string
      platform_version: string
      cpu_count: Number
      cpu_model: string
      gpu_count: Number
      gpu_models: Array<string>
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
  user: {
    distinctId: uuidv4().toString(),
    platform: await getPlatformDetails(),
  },
}

export const tldevDb: Low<DbData> = await JSONFilePreset<DbData>(dbPath, defaultDbData)

/**
 * Migrates the database from version 1 to version 2.
 *
 * In version 1, the database did not have a `user` field.
 * In version 2, the database includes a `user` field with a unique `distinctId`.
 *
 */
async function migrateVersion1To2() {
  // Generate a new unique `distinctId` for the user.
  const newDistinctId = uuidv4().toString()

  // Add a `user` field with the new `distinctId` to the database.
  tldevDb.data.user = {
    distinctId: newDistinctId,
    platform: await getPlatformDetails(),
  }

  // Update the database version to 2.
  tldevDb.data._version = 2

  // Write the updated database to disk.
  await tldevDb.write()
}

// Run migrations v1 -> v2
if (tldevDb.data._version === 1) {
  await migrateVersion1To2()
}
