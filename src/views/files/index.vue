
<script setup lang="ts">
import { NButton, FormInst } from 'naive-ui'
import { formatDateTime, renderIcon } from '@/utils'
import api from './api'

const table = ref(null)
const loading = ref<boolean>(false)
const show = ref<boolean>(false)
const modalLoading = ref<boolean>(false)
const modalFormRef = ref<FormInst | null>(null)
const modalForm = ref<FormInst | null>(null)
const tableData = ref([])
const users = ref<string[]>([])
const pagination = reactive({ page: 1, pageSize: 10 })

const columns = [
  { title: 'ID', key: 'id', width: 150 },
  { title: '文件名', key: 'fileName', width: 220, ellipsis: { tooltip: true } },
  { title: '创建人', key: 'owner', width: 80 },
  {
    title: '创建时间',
    key: 'createDate',
    width: 80,
    render(row:any) {
      return h('span', formatDateTime(row['Createdate']))
    },
  },
  {
    title: '文件过期时间',
    key: 'expired',
    width: 80,
    sortOder: 'descend',
    sorter:'default',
    render(row:any) {
      return h('span', formatDateTime(row['Expired']))
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 160,
    align: 'center',
    fixed: 'right',
    render(row:any) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            secondary: true,
            onClick: () => handleShare(row),
          },
          { default: () => '分享', icon: renderIcon('material-symbols:share', { size: 14 }) }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'error',
            style: 'margin-left: 15px;',
            onClick: () => handleDelete(row.ID),
          },
          { default: () => '删除', icon: renderIcon('material-symbols:delete-outline', { size: 14 }) }
        ),
      ]
    },
  },
]

onMounted(() => {
  getData()
})

async function getData() {
  handleQuery()
}

async function handleQuery() {
  try {
    loading.value = true
    let paginationParams = {}
    paginationParams = { pageNo: pagination.page, pageSize: pagination.pageSize }
    const { data } = await api.getFiles(paginationParams)
    tableData.value = data.pageData
    pagination.itemCount = data.pageResult.total ?? data.pageData.length
  } catch (error) {
    loading.value = false
    tableData.value = []
    pagination.itemCount = 0
  } finally {
    loading.value = false
  }
}

function handleShare(row:any) {
  show.value = true
  modalForm.value = { ...row }
}

async function handleSave() {
  modalFormRef.value?.validate(async (err:any) => {
    if (err) return
    try {
      console.log('request')
      modalLoading.value = true
      await api.updateFile(modalForm.value.id, users.value)
      modalLoading.value = true
      handleQuery()
      show.value = false
    } catch (error) {
      modalLoading.value = false
    }
  })
}

async function handleDelete(file:any) {
  try {
    await api.deleteFile(file)
  } catch (error) {
    return
  }
  window.$message?.success('删除成功')
  await getData()
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
      ref="table"
      remote
      :bordered="false"
      :scroll-x="1200"
      :columns="columns"
      :data="tableData"
      :row-key="(row:any) => row.ID"
      :loading="loading"
      :pagination="pagination"
    />

    <n-modal v-model:show="show" :loading="modalLoading" preset="card" title="分享" style="width: 600px">
      <n-form ref="modalFormRef" label-placement="left" label-align="left" :label-width="80" :model="modalForm">
        <n-p depth="3" style="font-size: 12px; display: block"> 分享权限 1 小时,可到下载文件查看 </n-p>
        <n-form-item label="用户:" path="shareUser">
          <n-select
            v-model:value="users"
            multiple
            filterable
            tag
            required
            placeholder="输入，按回车确认"
            :show-arrow="false"
            :show="false"
          />
        </n-form-item>
      </n-form>
      <footer flex justify-end>
        <n-button @click="show = false">取消</n-button>
        <n-button :loading="loading" ml-20 type="primary" @click="handleSave">确认</n-button>
      </footer>
    </n-modal>
  </CommonPage>
</template>
