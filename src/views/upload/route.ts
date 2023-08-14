import type { RouteType } from '~/types/router'
const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Upload',
  path: '/upload',
  component: Layout,
  redirect: '/upload/index',
  meta: {
    title: '上传文件',
    icon: 'material-symbols:cloud-upload',
    order: 1,
  },
  children: [
    {
      name: 'upload',
      path: 'index',
      component: () => import('./index.vue'),
      meta: {
        title: '上传文件',
      },
    },
  ],
} as RouteType
