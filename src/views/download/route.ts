import type { RouteType } from '~/types/router'
const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Download',
  path: '/download',
  component: Layout,
  redirect: '/download/index',
  meta: {
    title: '下载文件',
    icon: 'material-symbols:cloud-download',
    order: 2,
  },
  children: [
    {
      name: 'download',
      path: 'index',
      component: () => import('./index.vue'),
      meta: {
        title: '下载文件',
      },
    },
    {
      name: 'shortUrl',
      path: ':id',
      component: () => import('./index.vue'),
      isHidden: true,
      meta: {
        title: '下载文件',
      },
    },
  ],
} as RouteType
