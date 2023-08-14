const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Dashboard',
  path: '/',
  component: Layout,
  redirect: { name: 'upload' },
  meta: {
    title: '首页',
    order: 0,
  },
}
