import { Page } from 'vite-plugin-virtual-mpa'

const pages: Page[] = [
  {
    name: 'bbs-portal',
    entry: '/src/pages/bbs-portal/main.ts',
    data: { title: 'BBS', icon: '' }
  }
]

export default pages
