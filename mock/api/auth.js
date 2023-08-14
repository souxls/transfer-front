import { resolveToken } from '../utils'

const token = {
  admin: 'admin',
  editor: 'editor',
}

export default [
  {
    url: '/api/login',
    method: 'post',
    response: ({ body }) => {
      if (['admin', 'editor'].includes(body?.Username)) {
        return {
          code: 200,
          data: {
            token: token[body.Username],
          },
        }
      } else {
        return {
          code: -1,
          message: '没有此用户',
        }
      }
    },
  },
  {
    url: '/api/auth/refresh',
    method: 'post',
    response: ({ headers }) => {
      return {
        code: 200,
        data: {
          token: resolveToken(headers?.authorization),
        },
      }
    },
  },
]
