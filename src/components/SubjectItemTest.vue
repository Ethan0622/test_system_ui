<template>
  <q-card bordered class="bg-grey-3 my-card" v-if="itemDetail">
    <q-card-section>
      <div class="text-h6 q-mb-sm">{{ subjectTitle }}：</div>
      <div class="text-h6">{{ itemDetail.content }}</div>
    </q-card-section>

    <q-separator inset />

    <q-card-section class="row justify-center">
      <q-input
        autofocus
        filled
        class="col-11"
        v-model="subjectAnswer"
        @blur="deliver_answer()"
        type="textarea"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onUpdated, computed } from 'vue'
import { ItemObject } from '../utils/interface'

const props = defineProps({
  itemDetail: Object as () => ItemObject,
})

const emits = defineEmits(['deliver_answer'])
const deliver_answer = () => {
  emits('deliver_answer', subjectAnswer.value)
}

const subjectTitle = computed(() => {
  switch (props.itemDetail?.type) {
    case 3:
      return '名词解释'
    case 4:
      return '简答'
    case 5:
      return '论述'
    default:
      return ''
  }
})

let subjectAnswer = ref<string>()

onUpdated(() => {
  subjectAnswer.value = ''
})
</script>

<style scoped></style>
