<template>
  <q-page padding>
    <div class="row justify-end q-mb-md">
      <q-input class="col-4" filled v-model="keyWord" label="输入关键词搜索" />
      <q-btn unelevated color="primary" icon="search" @click="filterItemsByKeyWord(keyWord)" title="搜索" />
    </div>
    <q-table title="题目" :rows="rows" :columns="columns" row-key="name">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="content" :props="props">
            {{ props.row.content }}
          </q-td>
          <q-td key="type" :props="props">
            {{ itemType(props.row.type) }}
          </q-td>
          <q-td key="difficulty" :props="props">
            {{ props.row.difficulty }}
          </q-td>
          <q-td key="details" :props="props">
            <q-btn
              color="primary"
              size="sm"
              label="查看"
              :to="`/dashboard/items-detail/` + props.row.id"
            ></q-btn>
          </q-td>
          <q-td key="delete" :props="props">
            <q-btn
              color="red"
              size="sm"
              label="删除"
              @click=";(deleteConfirm.flag = true), (deleteConfirm.item_id = props.row.id)"
            ></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
  <q-dialog v-model="deleteConfirm.flag" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="delete" color="primary" text-color="white" />
        <span class="q-ml-sm">确定删除本题？</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="取消" color="primary" v-close-popup />
        <q-btn flat label="确定" color="red" @click="deleteItem" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { ref, onMounted, reactive } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useTestStore } from '../store/testing'
import { useItemStore } from '../store/itembank'
import { ItemObject } from '../utils/interface'

const $q = useQuasar()

const route = useRoute()
const testing = useTestStore()
const itembank = useItemStore()

let rows = ref([])
const keyWord = ref<string>('')
const deleteConfirm = reactive({ flag: false, item_id: undefined })
const columns = [
  {
    name: 'content',
    required: true,
    label: '题目摘要',
    align: 'left',
    field: 'content',
  },
  { name: 'type', align: 'center', label: '题目类型', field: 'type' },
  { name: 'difficulty', align: 'center', label: '难度系数', field: 'difficulty',sortable: true, },
  { name: 'details', align: 'right', label: '查看详情', field: 'details' },
  { name: 'delete', align: 'center', label: '删除', field: 'delete' },
]

function itemType(num: number) {
  if (num == 1 || num == 2) {
    return '客观题'
  } else {
    return '主观题'
  }
}

function deleteItem() {
  itembank.deleteItem({
    urlParams: deleteConfirm.item_id,
    success: (res: any) => {
      $q.notify({
        type: 'positive',
        message: '删除成功',
        position: 'top',
      })
      let itemIndex = rows.value.findIndex((item: ItemObject) => item.id === deleteConfirm.item_id)
      if (itemIndex != -1) {
        rows.value.splice(itemIndex, 1)
      }
    },
    failure: (error: any) => {
      $q.notify({
        type: 'negative',
        message: '删除失败',
        position: 'top',
      })
    },
  })
}

function filterItemsByKeyWord(keyWord: string) {
  if (keyWord) {
    let newRows = rows.value.filter((item: ItemObject) => {
      if (item.content.includes(keyWord)) {
        return item
      }
    })
    rows.value = newRows
  }
}

onBeforeRouteUpdate(async (to, from) => {
  keyWord.value = ''
  const pathmatch = to.fullPath.includes('/dashboard/items-list/')
  if (pathmatch) {
    itembank.getTypeItems({
      urlParams: Number(to.params.id),
      success: (res: any) => {
        rows.value = res
      },
      failure: (err: any) => {
        console.log(err)
      },
    })
  }
})

onMounted(() => {
  itembank.getTypeItems({
    urlParams: Number(route.params.id),
    success: (res: any) => {
      rows.value = res
    },
    failure: (err: any) => {
      console.log(err)
    },
  })
})
</script>
