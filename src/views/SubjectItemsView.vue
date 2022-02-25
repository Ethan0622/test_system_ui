<template>
  <q-card>
    <h4 class="text-center q-pt-md q-ma-none" v-if="method == 'update'">题目信息详情</h4>
    <q-card-section class="row justify-evenly">
      <q-form class="row justify-evenly" ref="itemForm" @reset="resetValue">
        <div class="row col-8 items-center q-my-md">
          <span class="text-h6 col-2">题干：</span>
          <q-input class="col-10" filled v-model="content" autogrow :rules="[unnull]" label="请输入题干" />
        </div>
        <div class="row col-8 items-center q-my-md" v-if="typeId == 3">
          <span class="text-h6 col-2">正确答案：</span>
          <q-input filled class="col-10" v-model="correct" type="textarea" :rules="[unnull]" />
        </div>

        <div class="row col-8 justify-between q-my-md">
          <div class="row items-center">
            <p class="text-h6">难度系数：</p>
            <q-input class="" filled v-model="difficulty" :rules="[unnull]" label="请输入本题的难度系数" />
          </div>
          <div class="row items-center">
            <p class="text-h6">所属章节：</p>
            <q-select
              class=""
              filled
              v-model="knowledge"
              :options="knowledgeOptions"
              :rules="[unnull]"
              label="请输入本题的难度系数"
            />
          </div>
        </div>
      </q-form>
    </q-card-section>
    <q-card-actions class="q-py-md" align="center">
      <q-btn color="primary" :label="method == 'create' ? '上传' : '更新'" @click="submitItem()"></q-btn>
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
  itemType: String,
})

const itembank = useItemStore()

const itemForm = ref<QForm>()
const content = ref<string>('')
const correct = ref<string>('')
const difficulty = ref<number>()
const knowledge = ref<string>('')
const method = ref<string>('create')
const typeId = ref<number>(3)
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
  itemForm.value?.resetValidation()
}

onMounted(() => {
  if (props.itemType) {
    switch (props.itemType) {
      case '名词解释':
        typeId.value = 3
        break
      case '简答题':
        typeId.value = 4
        break
      case '论述题':
        typeId.value = 5
        break
      default:
        break
    }
  }
  if (props.itemDetail) {
    let item = props.itemDetail
    content.value = item.content
    correct.value = item.correct
    typeId.value = item.type
    difficulty.value = item.difficulty
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

function submitItem() {
  let correctValue = typeId.value == 3 ? correct.value : '略'
  itemForm.value?.validate().then((success: boolean) => {
    if (success && method.value == 'create') {
      itembank.createItem({
        data: {
          type: typeId.value,
          content: content.value,
          correct: correctValue,
          difficulty: difficulty.value,
          knowledge_id: knowledge.value[0],
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
          correct: correctValue,
          difficulty: difficulty.value,
          knowledge_id: knowledge.value[0],
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
