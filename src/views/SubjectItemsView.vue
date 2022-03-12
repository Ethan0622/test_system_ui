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
        <div class="col-7 q-my-md" v-if="typeId == 3">
          <q-input filled v-model="correct" type="textarea" label="请输入本题的参考答案" :rules="[unnull]">
            <template v-slot:before>
              <span class="text-h6">正确答案：</span>
            </template>
          </q-input>
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
