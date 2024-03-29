<template>
  <q-card class="card-min-width">
    <h4 class="text-center q-pt-md q-ma-none" v-if="method == 'update'">题目信息详情</h4>
    <q-card-section>
      <q-form class="row justify-center" ref="itemForm" @reset="resetValue">
        <div class="col-7 q-my-md">
          <q-input filled v-model="content" autogrow :rules="[unnull]" label="请输入题干">
            <template v-slot:before>
              <span class="text-h6">题&emsp;&emsp;干：</span>
            </template>
          </q-input>
        </div>
        <div class="col-7 q-my-md">
          <q-input filled v-model="correct" :rules="[unnull, correctRange]" label="请输入正确答案，填写字母">
            <template v-slot:before>
              <span class="text-h6">正确答案：</span>
            </template>
          </q-input>
        </div>
        <div class="col-7 row justify-between q-my-md">
          <div class="col-5 q-my-xs">
            <q-input filled v-model="option_A" :rules="[unnull]" label="请填写选项A">
              <template v-slot:before>
                <span class="text-h6">选&ensp;项&ensp;A：&nbsp;</span>
              </template>
            </q-input>
          </div>
          <div class="col-5 q-my-xs">
            <q-input filled v-model="option_B" :rules="[unnull]" label="请填写选项B">
              <template v-slot:before>
                <span class="text-h6">选&ensp;项&ensp;B：&nbsp;</span>
              </template>
            </q-input>
          </div>
          <div class="col-5 q-my-xs">
            <q-input filled v-model="option_C" :rules="[unnull]" label="请填写选项C">
              <template v-slot:before>
                <span class="text-h6">选&ensp;项&ensp;C：&nbsp;</span>
              </template>
            </q-input>
          </div>
          <div class="col-5 q-my-xs">
            <q-input filled v-model="option_D" :rules="[unnull]" label="请填写选项D">
              <template v-slot:before>
                <span class="text-h6">选&ensp;项&ensp;D：&nbsp;</span>
              </template>
            </q-input>
          </div>
        </div>
        <div class="col-7 q-my-md">
          <q-input filled v-model="difficulty" :rules="[unnull]" label="请输入本题的难度系数">
            <template v-slot:before>
              <span class="text-h6">难度系数：</span>
            </template>
          </q-input>
        </div>
        <div class="col-7 q-my-md">
          <q-select
            filled
            v-model="knowledge"
            :options="knowledgeOptions"
            :rules="[unnull]"
            label="请选择本题所属章节"
          >
            <template v-slot:before>
              <span class="text-h6">所属章节：</span>
            </template>
          </q-select>
        </div>
      </q-form>
    </q-card-section>
    <q-card-actions class="q-py-md" align="center">
      <q-btn
        size="lg"
        padding="xs md"
        color="primary"
        :label="method == 'create' ? '上 传' : '更 新'"
        @click="submitItem()"
      />
    </q-card-actions>
  </q-card>
</template>
<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'
import { QForm, useQuasar } from 'quasar'
import { useItemStore } from '../store/itembank'
import { ItemObject } from '../utils/interface'

const $q = useQuasar()

const props = defineProps({
  itemDetail: Object as () => ItemObject,
})

const itembank = useItemStore()

const itemForm = ref<QForm>()
const content = ref<string>('')
const correct = ref<string>('')
const option_A = ref<string>('')
const option_B = ref<string>('')
const option_C = ref<string>('')
const option_D = ref<string>('')
const difficulty = ref<number>()
const knowledge = ref<string>('')
const method = ref<string>('create')
const knowledgeOptions = [
  '1-绪论',
  '2-信息化学习资源的获取与利用',
  '3-多媒体课件设计与制作',
  '4-微课的设计与制作',
  '5-学习空间与智慧学习环境',
  '6-信息化教学设计与评价',
  '7-信息花教学活动设计案例',
  '8-创客教育',
]

function resetValue() {
  content.value = ''
  correct.value = ''
  difficulty.value = undefined
  knowledge.value = ''
  option_A.value = ''
  option_B.value = ''
  option_C.value = ''
  option_D.value = ''
  itemForm.value?.resetValidation()
}

onMounted(() => {
  if (props.itemDetail) {
    let item = props.itemDetail
    content.value = item.content
    correct.value = item.correct
    difficulty.value = item.difficulty
    option_A.value = item.option_A
    option_B.value = item.option_B
    option_C.value = item.option_C
    option_D.value = item.option_D
    knowledgeOptions.forEach((val) => {
      if (item.knowledge_id == Number(val[0])) {
        knowledge.value = val
      }
    })
    method.value = 'update'
  }
})

function unnull(val: string | number) {
  return (val && String(val).length > 0) || '请填写必填项'
}

function correctRange(val: string) {
  val = val.toUpperCase()
  let range: string[] = ['A', 'B', 'C', 'D']
  return range.indexOf(val) != -1 || '请注意答案范围'
}

function submitItem() {
  correct.value = correct.value.toUpperCase()
  itemForm.value?.validate().then((success: boolean) => {
    if (success && method.value == 'create') {
      itembank.createItem({
        data: {
          type: 1,
          content: content.value,
          correct: correct.value,
          difficulty: difficulty.value,
          knowledge_id: knowledge.value[0],
          option_A: option_A.value,
          option_B: option_B.value,
          option_C: option_C.value,
          option_D: option_D.value,
        },
        success: (res: any) => {
          $q.notify({
            type: 'positive',
            message: '添加成功',
            position: 'top',
          })
          itemForm.value?.reset()
          console.log(res)
        },
        failure: (error: any) => {
          $q.notify({
            type: 'negative',
            message: '添加失败',
            position: 'top',
          })
          console.log(error)
        },
      })
    } else if (success && method.value == 'update') {
      itembank.updateItem({
        urlParams: props.itemDetail?.id,
        data: {
          content: content.value,
          correct: correct.value,
          difficulty: difficulty.value,
          knowledge_id: knowledge.value[0],
          option_A: option_A.value,
          option_B: option_B.value,
          option_C: option_C.value,
          option_D: option_D.value,
        },
        success: (res: any) => {
          $q.notify({
            type: 'positive',
            message: '更新成功',
            position: 'top',
          })
          console.log(res)
        },
        failure: (error: any) => {
          $q.notify({
            type: 'negative',
            message: '更新失败',
            position: 'top',
          })
          console.log(error)
        },
      })
    }
  })
}
</script>
