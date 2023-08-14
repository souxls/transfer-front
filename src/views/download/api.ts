import { request } from '@/utils'

export default {
  getFiles: () => request.get('/files/downloads'),
  getFileByShortUrl: (url:string) => request.get(`/files/short/${url}`),
  getFileURL: (fileId:string) => request.get(`/files/${fileId}`),
}
