import { request } from '@/utils'

export default {
  updateFile: (fileId:string, users:string[]) => request.post(`/files/${fileId}/users`, { data: users }),
  uploadFile: (postData:any, params = {}) => request.post(`/files`, postData, params),
}
