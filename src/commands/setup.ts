import {Command} from '@oclif/core'
import {setup} from '../utils/setup.js'

export default class Setup extends Command {
  static override args = {}

  static override description = 'Set up tldev'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  static override flags = {}

  public async run(): Promise<void> {
    await setup(true)
  }
}
