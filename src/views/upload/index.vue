<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import {
  FormInst,
  UploadCustomRequestOptions,
  StepProps } from 'naive-ui'
import api from './api'

const fileURL = ref<string>('')
const modalFormRef = ref<FormInst | null>(null)
const shareModal = ref({})
const users = ref<string[]>([])
const loading = ref<boolean>(false)
const current = ref<number | null>(1)
const currentStatus = ref<StepProps['status']>('process')
const options = [
  {
    label: 'souxls',
    value: 'souxls',
  }
]

async function customRequest({ file, data, onError, onProgress, onFinish }:UploadCustomRequestOptions ) {
  const formData = new FormData()
  if (data) {
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key as keyof  UploadCustomRequestOptions['data']])
    })
  }
  formData.append('name', file.name)
  formData.append('file', file.file as File)
  try {
    const res = await api.uploadFile(formData, {
      onUploadProgress: ({ percent }:{percent:any}) => {
        onProgress({ percent: Math.ceil(percent) })
      },
      timeout: 300000,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    fileURL.value = window.location.origin + '/download/' + res.data.url
  } catch (error) {
    console.log(error)
    onError()
    currentStatus.value = 'error'
    return
  }
  onFinish()
  currentStatus.value = 'finish'
  current.value = 2
  currentStatus.value = 'process'
}

function copyURL(source:any) {
  const { copy, copied } = useClipboard()
  copy(source)
  if (copied) {
    window.$message?.success('已复制到粘贴板')
  }
}

async function handleShare() {
  modalFormRef.value?.validate(async (err:any) => {
    if (err) return
    try {
      let fileId = fileURL.value.split('/').slice(-1)[0]
      await api.updateFile(fileId, users.value)
    } catch (error) {
      currentStatus.value = 'error'
      return
    }
    window.$message?.success('授权成功')
    currentStatus.value = 'finish'
    current.value = 1
    currentStatus.value = 'process'
  })
}
</script>

<template>
  <CommonPage>
    <n-grid :x-gap="12" :y-gap="15" :cols="3">
      <n-gi :offset="1">
        <n-steps :current="(current as number)" :status="currentStatus" >
          <n-step title="上传" />
          <n-step title="授权" />
        </n-steps>
      </n-gi>
      <n-gi :offset="1">
        <n-upload
          v-if="current===1"
          directory-dnd
          show-trigger
          :custom-request="customRequest"
        >
          <n-upload-dragger>
            <TheIcon icon="material-symbols:archive-outline" :size="48" />
            <n-text style="font-size: 16px; display: block"> 点击或者拖动文件到该区域来上传 </n-text>
            <n-p depth="3" style="margin: 8px 0 0 0"> 上传文件保留最长7天时间 </n-p>
            <n-button style="font-size: 16px; margin: 8px 8px 0 0" type="primary"> 上传文件 </n-button>
          </n-upload-dragger>
        </n-upload>

        <n-form v-else-if="current===2" ref="modalFormRef" label-placement="left" label-align="left" :label-width="120" :model="shareModal">
          <n-p depth="3" style="font-size: 12px; display: block">
            注意： 分享链接默认1小时, 需要重新分享请到历史文件。
          </n-p>
          <n-form-item label="下载链接：" path="shareLink">
            <n-input :placeholder="fileURL" disabled />
            <n-button  type="info" @click="copyURL(fileURL)"> 复制 </n-button>
          </n-form-item>
          <n-p depth="3" style="font-size: 12px; display: block"> 为其他用户添加下载权限，默认只有自己有权限。如果需要从服务器下载，请为用户授权。 </n-p>
          <n-form-item label="用户：" path="shareUser">
            <n-select
              v-model:value="users"
              multiple
              filterable
              tag
              required
              placeholder="输入用户名，按回车确认"
              :show-arrow="false"
              :options="options"
            />
          </n-form-item>
          <footer flex justify-end>
            <n-button :loading="loading" ml-20 type="primary" @click="handleShare">完成</n-button>
          </footer>
        </n-form>      
      </n-gi>
    </n-grid>
  </CommonPage>
</template>
