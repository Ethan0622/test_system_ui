<template>
  <q-table
    class="no-shadow no-border-radius"
    :title="tableTitle"
    :rows="testsList"
    :columns="columns"
    row-key="index"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="index" :props="props">
          {{ props.rowIndex + 1 }}
        </q-td>
        <q-td key="number" :props="props">
          {{ props.row.number }}
        </q-td>
        <q-td key="start_time" :props="props">
          {{ props.row.start_time }}
        </q-td>
        <q-td key="total_time" :props="props">
          {{ timeFormat(props.row.total_time, props.row.end_time) }}
        </q-td>
        <q-td key="ability" :props="props">
          {{ props.row.final_ability || '-' }}
        </q-td>
        <q-td key="grade" :props="props">
          <q-btn
            flat
            color="primary"
            :label="needGrade(props.row.end_time, props.row.un_grade)"
            :disable="!props.row.end_time"
            dense
            :to="'/dashboard/grade-score/' + props.row.test_id"
            @click="recordInfo(props.row)"
          />
        </q-td>
      </q-tr>
    </template>
    <template v-slot:no-data>
      <div
        class="full-width row flex-center q-gutter-sm q-my-lg"
        :class="$q.dark.isActive ? 'text-grey-6' : 'text-grey'"
      >
        <q-icon size="2em" name="sentiment_dissatisfied" />
        <span>请先在班级中选择你要查阅测验的学生</span>
      </div>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClassStore } from '../store/classes'
import { TestInfoObject, UserObject } from '../utils/interface'

const $q = useQuasar()
const route = useRoute()

const myClass = useClassStore()

const props = defineProps({
  studentInfo: Object as () => UserObject,
})

const columns = [
  { name: 'index', label: '序号', align: 'center', sortable: true },
  { name: 'start_time', label: '开始时间', align: 'center' },
  { name: 'total_time', label: '总用时', align: 'center' },
  { name: 'ability', label: '测评能力值', align: 'center' },
  { name: 'grade', label: '批改', align: 'center' },
]

const testsList = ref([])
const gradeBtnColor = ref<string>('')
const tableTitle = computed(() => {
  if (props.studentInfo) {
    return `${props.studentInfo.realname || props.studentInfo.number}-测验记录`
  } else {
    return '测验记录'
  }
})

watch(
  () => props.studentInfo?.id,
  (newVal, oldVal) => {
    if (newVal) {
      myClass.getStudentTests({
        urlParams: Number(route.params.id),
        params: { student_id: newVal },
        success: (res: any) => {
          testsList.value = res
          console.log(res)
        },
        failure: (error: any) => {
          console.log(error)
        },
      })
    }
  }
)

watch(
  () => route.params.id,
  (newVal, oldVal) => {
    if (newVal != oldVal) {
      testsList.value = []
    }
  }
)

function timeFormat(total_time: string, end_time: string) {
  if (total_time) {
    const timeList = total_time.split(':')
    if (end_time) {
      return `${Number(timeList[0])} 时 ${Number(timeList[1])} 分 ${parseInt(timeList[2])} 秒`
    } else {
      return `${Number(timeList[0])} 时 ${Number(timeList[1])} 分 ${parseInt(timeList[2])} 秒 （超时未完成）`
    }
  } else {
    return '考试正在进行中'
  }
}

function needGrade(endTime: string, unGrade: boolean) {
  if (!endTime) {
    return '无需批改'
  } else if (unGrade) {
    return '进行批改'
  } else {
    return '批改已完成'
  }
}

function recordInfo(testInfo: TestInfoObject) {
  myClass.$patch({ currentStudent: props.studentInfo, currentTest: testInfo })
}

onMounted(() => {
  console.log(props.studentInfo)
})
</script>
