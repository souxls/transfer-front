import { resolveToken } from '../utils'

const users = {
  admin: {
    userName: 'admin',
    realName: 'admin',
    email: 'admin@example.com',
    role: ['admin'],
  },
  editor: {
    userName: 'user',
    realName: 'test',
    email: 'test@example.com',
    role: ['user'],
  },
}
export default [
  {
    url: '/api/user',
    method: 'get',
    response: ({ headers }) => {
      const token = resolveToken(headers?.authorization)
      return {
        code: 200,
        data: {
          ...(users[token] || users.guest),
        },
      }
    },
  },
]
