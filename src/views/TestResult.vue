<template>
  <div class="" style="min-height: calc(100vh - 105px)">
    <div class="row">
      <div class="col-12 text-h4 text-center q-my-md">考试结果</div>
    </div>
    <div class="row justify-center container">
      <q-card flat class="col-12">
        <q-card-section>
          <div class="text-h6 text-center text-weight-bold">
            最终能力估计值：
            <span class="text-red-14">{{ ability }}</span>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <q-separator class="q-my-lg" color="grey-6" inset />

    <div class="container">
      <div class="text-h5">答题回顾</div>
      <div>
        <q-table
          class="q-my-md"
          title="客观题答题记录"
          :rows="objectItems"
          :columns="objectColumns"
          row-key="index"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="index" :props="props">
                {{ props.rowIndex + 1 }}
              </q-td>
              <q-td key="item_content" :props="props">
                {{ props.row.item_content }}
              </q-td>
              <q-td key="item_correct" :props="props">
                {{ formatJudge(props.row.item_correct) }}
              </q-td>
              <q-td key="answer" :props="props">
                {{ formatJudge(props.row.answer_content) }}
              </q-td>
              <q-td key="judge" :props="props" :class="props.row.judge ? 'text-positive' : 'text-negative'">
                {{ props.row.judge ? '正确' : '错误' }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
      <div>
        <q-table
          class="q-my-md"
          title="主观题答题记录"
          :rows="subjectItems"
          :columns="subjectColumns"
          row-key="index"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="index" :props="props">
                {{ props.rowIndex + 1 }}
              </q-td>
              <q-td key="item_content" :props="props">
                {{ props.row.item_content }}
              </q-td>
              <q-td key="item_correct" :props="props">
                {{ props.row.item_correct }}
              </q-td>
              <q-td key="answer" :props="props">
                {{ props.row.answer }}
              </q-td>
              <q-td key="score" :props="props">
                {{ props.row.score || '教师尚未评分' }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTestStore } from '@/store/testing'

const route = useRoute()
const testing = useTestStore()

const ability = ref<number>()
const objectColumns = [
  { name: 'index', align: 'center', label: '序号', field: 'index' },
  { name: 'item_content', align: 'center', label: '题干', field: 'item_content',style: 'min-width:30%;white-space: normal', },
  { name: 'item_correct', align: 'center', label: '参考答案', field: 'item_correct',style: 'min-width:30%;white-space: normal', },
  { name: 'answer', align: 'center', label: '你的回答', field: 'answer',style: 'min-width:30%;white-space: normal', },
  { name: 'judge', align: 'center', label: '正误', field: 'judge' },
]
const subjectColumns = [
  { name: 'index', align: 'center', label: '序号', field: 'index' },
  { name: 'item_content', align: 'center', label: '题干', field: 'item_content' },
  {
    name: 'item_correct',
    align: 'center',
    label: '参考答案',
    field: 'item_correct',
    style: 'min-width:30%;white-space: normal',
  },
  {
    name: 'answer',
    align: 'center',
    label: '你的回答',
    field: 'answer',
    style: 'min-width:30%;white-space: normal',
  },
  { name: 'score', align: 'center', label: '得分', field: 'judge' },
]
let objectItems = ref([])
let subjectItems = ref([])

function formatJudge(val: string) {
  if (val == '0' || val == '1') {
    return Number(val) ? 'True' : 'False'
  } else {
    return val
  }
}
onMounted(() => {
  testing.getTestResult({
    urlParams: Number(route.params.id),
    success: (res: any) => {
      ability.value = res.ability
      objectItems.value = res.objectItems
      subjectItems.value = res.subjectItems
      console.log(res)
    },
    failure: (error: unknown) => {
      console.log(error)
    },
  })
})
</script>
