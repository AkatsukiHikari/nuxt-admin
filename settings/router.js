import { getSidebar, createRouter } from '~/lib/utils/router'

export const routes = createRouter([
  {
    title: '工作台',
    path: '/dashboard',
    icon: 'dashboard',
    sidebar: true,
    root: true,
    pined: true,
  },
  {
    id: '/components',
    title: '组件',
    icon: 'chart',
    sidebar: true,
    children: [
      {
        title: 'v-viewer',
        path: '/components/v-viewer',
      },
      {
        title: '富文本编辑器',
        path: '/components/rich-editor',
      },
      {
        title: 'vueuse',
        path: '/components/vueuse',
      },
    ],
  },
  {
    id: '/form',
    title: '表单',
    icon: 'form',
    sidebar: true,
    children: [
      {
        title: '基本表单',
        path: '/form/basic',
      },
    ],
  },
  {
    id: 'error-pages',
    title: 'Error Page',
    icon: 'bug',
    sidebar: true,
    children: [
      { title: '404', path: '/error/404' },
      { title: '401', path: '/error/401' },
    ],
  },
])

export const sidebarItems = getSidebar(routes)
