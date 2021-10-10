<template>
  <div class="container q-pa-md">
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
            {{ props.row.correct }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import testingStores from '../store/testing'

const testing = testingStores.testing()

let rows = ref<[]>([])
const columns = [
  {
    name: 'content',
    required: true,
    label: '题目摘要',
    align: 'left',
    sortable: true,
  },
  { name: 'type', align: 'center', label: '题目类型', field: 'calories', sortable: true },
  { name: 'details', label: '查看详情', field: 'details', sortable: true },
]

function itemType(num: number) {
  switch (num) {
    case 1:
      return '选择题'
    case 2:
      return '判断题'
    case 3:
      return '论述题'
  }
}

onMounted(() => {
  testing.getTypeItems({
    urlParams: 1,
    success: (res: any) => {
      rows.value = res
    },
    failure: (err: any) => {
      console.log(err)
    },
  })
})
</script>

<style scoped></style>
