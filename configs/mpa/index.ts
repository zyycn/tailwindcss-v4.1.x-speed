import { Command } from 'commander'
import { MpaOptions, AllowedEvent } from 'vite-plugin-virtual-mpa'
import pages from './mpa-entry'

const entries: MpaOptions<string, string, string, AllowedEvent, string> = {
  htmlMinify: true,
  verbose: false,
  template: 'configs/mpa/mpa-template.html',
  pages,
  rewrites: [{ from: /^\/$/, to: '/bbs-portal.html' }]
}

const options = new Command()
  .allowUnknownOption(true)
  .option('-p, --page <value>')
  .parse(process.argv.slice(process.argv.indexOf('--mode') + 1 || process.argv.length))
  .opts()

if (options.page && entries.pages) {
  entries.pages = entries.pages.filter(page => options.page.split(',').includes(page.name))

  if (entries.pages.length === 1) {
    entries.pages[0].name = 'index'
  }
}

export default entries
