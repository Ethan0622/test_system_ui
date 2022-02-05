<template>
  <q-card bordered class="bg-grey-3 my-card" v-if="itemDetail">
    <q-card-section>
      <div class="text-h6">{{ itemDetail.content }}</div>
    </q-card-section>

    <q-separator inset />

    <q-card-section class="row justify-center">
      <q-radio v-model="judgeAnswer" val="true" label="正确" class="col-12" @click="deliver_answer()" />
      <q-radio v-model="judgeAnswer" val="false" label="错误" class="col-12" @click="deliver_answer()" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onUpdated } from 'vue'
import { ItemObject } from '../utils/interface'

const props = defineProps({
  itemDetail: Object as () => ItemObject,
})

const emits = defineEmits(['deliver_answer'])
const deliver_answer = () => {
  emits('deliver_answer', judgeAnswer.value)
}

let judgeAnswer = ref<string>()

onUpdated(() => {
  judgeAnswer.value = ''
})
</script>

<style scoped></style>
