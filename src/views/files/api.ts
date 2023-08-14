import { request } from '@/utils'

export default {
  getFiles: (params = {}) => request.get('/files', { params }),
  updateFile: (fileId:string, users:any) => request.post(`/files/${fileId}/users`, { data: users }),
  deleteFile: (id:string) => request.delete(`/files/${id}`),
}
