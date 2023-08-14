<script setup lang="ts">
import { NButton, ButtonProps } from 'naive-ui'
import { formatDateTime, renderIcon } from '@/utils'
import api from './api'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useClipboard } from '@vueuse/core'

const showModal = ref<boolean>(false)
const positiveButton = reactive<ButtonProps>({tag: 'a'})
const positiveText = ref<string>('下载')

const route = useRoute()

const columns:any = [
  { title: 'id', key: 'id', width: 150 },
  { title: '文件名', key: 'fileName', width: 220, ellipsis: { tooltip: true } },
  { title: '创建人', key: 'owner', width: 80 },
  {
    title: '分享过期时间',
    key: 'expireDate',
    width: 80,
    sortOder: 'descond',
    sorter:'default',
    render(row:any) {
      return h('span', formatDateTime(row['Expiredate']))
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 160,
    align: 'center',
    render(row:any) {
      return [
        h(
        NButton,
        {
          size: 'small',
          type: 'primary',
          secondary: true,
          onClick: () => getFileURL(row),
        },
        { default: () => '下载', icon: renderIcon('material-symbols:download', { size: 14 }) }
      ),
      h(
        NButton,
        {
          key: 'url',
          size: 'small',
          type: "info",
          style: 'margin-left: 15px;',
          secondary: true,
          onClick: () => copyURL(row.url),
        },
        { default: () => '复制地址', icon: renderIcon('material-symbols:content-copy', { size: 14 }) }
      )
      ]
    },
  },
]

const $table = ref(null)
const loading = ref(false)
const tableData = ref([])


onMounted(() => {
  getData()
})

function getData() {
  handleQuery()
}

async function handleQuery() {
  try {
    loading.value = true
    let shortUrl = route.params.id
    if (shortUrl !== undefined && shortUrl != 'index') {
      const { data } = await api.getFileByShortUrl(shortUrl)
      tableData.value = data
    } else {
      const { data } = await api.getFiles()
      tableData.value = data
    }
  } catch (error) {
    loading.value = false
    tableData.value = []
  } finally {
    loading.value = false
  }
}

function copyURL(url:any) {
  // http 不会生效
  const { copy, copied } = useClipboard()
  const fullURL = window.location.origin + '/downloads/' + url
  copy(fullURL)
  if (copied) {
    window.$message?.success('已复制到粘贴板')
  }
}

async function getFileURL(row:any) {
  const res = await api.getFileURL(row.id)
  if (res.data.authParm === '' || res.data.authParam === 'undefined') {
    window.$message?.error('下载出错，请稍后再试')
    return
  }
  
  showModal.value = true
  positiveButton.target = '_blank'
  positiveButton.download = res.data.fileName
  positiveButton.href = window.location.origin + import.meta.env.VITE_DOWNLOAD_API + '/' + row.id + '?AuthParam=' + res.data.authParam
  positiveText.value = "下载 " + res.data.fileName
}

function submitDownload() {
  window.$message?.info('下载马上开始，请稍等...')
}
</script>

<template>
  <CommonPage>
    <div>
      <NButton rounded-8 float-right mb-10 tertiary circle type="primary" secondary @click="handleQuery">
          <TheIcon icon="mdi:refresh" :size="18" class="mr-5" />
      </NButton>
    </div>

    <n-data-table
      ref="$table"
      remote
      :scroll-x="1200"
      :columns="columns"
      :data="tableData"
      :row-key="(row:any) => row.ID"
      :loading="loading"
      pagination
    />

    <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="文件下载"
    content="注意: 下载的文件"
    type="info"
    :positive-button-props="positiveButton"
    :positive-text="positiveText"
    @positive-click="submitDownload"
  />
  </CommonPage>
</template>
