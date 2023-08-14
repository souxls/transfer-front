import type { RouteType } from '~/types/router'
const Layout = () => import('@/layout/index.vue')

export default {
  name: '文件管理',
  path: '/files',
  component: Layout,
  redirect: '/files/index',
  meta: {
    title: '文件管理',
    icon: 'material-symbols:cloud-history',
    order: 3,
  },
  children: [
    {
      name: '文件管理',
      path: 'index',
      component: () => import('./index.vue'),
      meta: {
        title: '文件管理',
      },
    },
  ],
} as RouteType
