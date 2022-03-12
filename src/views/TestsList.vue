<template>
  <div class="container">
    <q-table class="q-mt-xl" title="测验记录" :rows="TestsList" :columns="columns" row-key="index">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="index" :props="props">
            {{ props.rowIndex + 1 }}
          </q-td>
          <q-td key="start_time" :props="props">
            {{ props.row.start_time }}
          </q-td>
          <q-td key="end_time" :props="props">
            {{ props.row.end_time || '-' }}
          </q-td>
          <q-td key="duration_time" :props="props">
            {{ timeFormat(props.row.total_time, props.row.end_time) }}
          </q-td>
          <q-td key="details" :props="props">
            <q-btn
              flat
              color="primary"
              label="点击查看"
              :disable="!props.row.end_time"
              dense
              :to="'/test-result/' + props.row.test_id"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { useUserStore } from '../store/user'

const user = useUserStore()

const columns = [
  { name: 'index', label: '序号', align: 'center', field: 'index' },
  { name: 'start_time', align: 'center', label: '开始时间', field: 'start_time' },
  { name: 'end_time', label: '结束时间', align: 'center', sortable: true, field: 'end_time' },
  { name: 'duration_time', align: 'center', label: '测验时长', field: 'duration_time' },
  { name: 'details', align: 'center', label: '查看详情', field: 'details' },
]

let TestsList = ref([])

onMounted(() => {
  user.getTestsList({
    success: (res: any) => {
      TestsList.value = res
      console.log(res)
    },
    failure: (err: any) => {
      console.log(err)
    },
  })
})

function timeFormat(total_time: string, end_time: string) {
  if (total_time) {
    const timeList = total_time.split(':')
    if (end_time) {
      return `${Number(timeList[0])} 时 ${Number(timeList[1])} 分 ${parseInt(timeList[2])} 秒`
    } else {
      return `${Number(timeList[0])} 时 ${Number(timeList[1])} 分 ${parseInt(timeList[2])} 秒 （超时未完成）`
    }
  }else {
    return '考试正在进行中'
  }
}
</script>

<style scoped></style>
