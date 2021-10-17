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
          <q-td key="details" :props="props">
            <q-btn
              color="primary"
              size="sm"
              label="查看"
              :to="`/dashboard/items-detail/` + props.row.id"
            ></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import testingStores from '../store/testing'

const route = useRoute()
const testing = testingStores.testing()

let rows = ref<[]>([])
const keyWord = ref<string>('')
const columns = [
  {
    name: 'content',
    required: true,
    label: '题目摘要',
    align: 'left',
  },
  { name: 'type', align: 'center', label: '题目类型', field: 'calories' },
  { name: 'details', align: 'center', label: '查看详情', field: 'details' },
]

function itemType(num: number) {
  switch (num) {
    case 1:
      return '选择题'
    case 2:
      return '判断题'
    case 3:
      return '简答题'
  }
}

function filterItemsByKeyWord(keyWord) {
  if (keyWord) {
    let newRows = rows.value.filter((item) => {
      if (item.content.includes(keyWord)) {
        return item
      }
    })
    rows.value = newRows
  }
}

onBeforeRouteUpdate(async (to, from) => {
  const pathmatch = to.fullPath.includes('/dashboard/items-list/')
  if (pathmatch) {
    testing.getTypeItems({
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
  testing.getTypeItems({
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
