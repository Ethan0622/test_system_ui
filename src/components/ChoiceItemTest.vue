<template>
  <q-card bordered class="bg-grey-3 my-card" v-if="itemDetail">
    <q-card-section>
      <div class="text-h6">{{ itemDetail.content }}</div>
    </q-card-section>

    <q-separator inset />

    <q-card-section class="row justify-center">
      <q-radio
        v-model="choiceAnswer"
        val="A"
        :label="itemDetail.option_A"
        class="col-12"
        @click="deliver_answer()"
      />
      <q-radio
        v-model="choiceAnswer"
        val="B"
        :label="itemDetail.option_B"
        class="col-12"
        @click="deliver_answer()"
      />
      <q-radio
        v-model="choiceAnswer"
        val="C"
        :label="itemDetail.option_C"
        class="col-12"
        @click="deliver_answer()"
      />
      <q-radio
        v-model="choiceAnswer"
        val="D"
        :label="itemDetail.option_D"
        class="col-12"
        @click="deliver_answer()"
      />
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
  emits('deliver_answer', choiceAnswer.value)
}

let choiceAnswer = ref<string>('')

onUpdated(() => {
  choiceAnswer.value = ''
})
</script>

<style scoped></style>
