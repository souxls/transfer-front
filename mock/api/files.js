const files = [
  {
    ID: 'b8cb45d019f84f36998bf3ff3e138c63',
    Filename: 'test.txt',
    Owner: 'souxls',
    Createdate: '2021-11-04T04:03:36.000Z',
    Expiredate: '2021-11-04T04:03:36.000Z',
  },
  {
    ID: 'acee45d019f84f36998bf3ff3e138c22',
    Filename: 'data.txt',
    Owner: 'test',
    Createdate: '2021-10-25T08:57:47.000Z',
    Expiredate: '2022-02-28T04:02:39.000Z',
  },
]

export default [
  {
    url: '/api/files',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: {
          pageResult: {
            total: 3,
            PageNo: 1,
            pageSize: 100,
          },
          pageData: files,
        }
      }
    },
  },
  {
    url: '/api/files/:id',
    method: 'get',
    response: (data = {}) => {
      const authParam = data.query
      console.log(authParam)
      if (authParam !== 'undefined' || authParam == 'null') {
        return {
          code: 200,
          message: 'download ok',
          data: files,
        }
      }
      return {
        code: 200,
        message: 'ok',
        data: files,
      }
    },
  },
  {
    url: '/api/files',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: {
          url: '8sRls6',
          fileName: 'test.txt',
        },
      }
    },
  },
  {
    url: '/api/files/:id',
    method: 'put',
    response: ({ query, body }) => {
      return {
        code: 200,
        message: 'ok',
        data: {
          id: query.id,
          body,
        },
      }
    },
  },
  {
    url: '/api/files/shorturl/:id',
    method: 'delete',
    response: ({ query }) => {
      return {
        code: 200,
        message: 'ok',
        data: {
          id: query.id,
        },
      }
    },
  },
  {
    url: '/api/files/8sRls6/users',
    method: 'post',
    response: ({ body }) => {
      return {
        code: 200,
        message: 'ok',
        data: {
          body: body,
        },
      }
    },
  },
]
