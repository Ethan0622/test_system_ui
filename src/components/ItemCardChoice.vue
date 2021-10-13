<template>
  <q-card dark bordered class="bg-grey-9 my-card" v-if="itemDetail">
    <q-card-section>
      <div class="text-h6">{{ itemDetail.content }}</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section>
      <p>{{ itemDetail.option_A }}</p>
      <p>{{ itemDetail.option_B }}</p>
      <p>{{ itemDetail.option_C }}</p>
      <p>{{ itemDetail.option_D }}</p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface ItemObject {
  content: string
  id: number
  type: number
  option_A: string | null
  option_B: string | null
  option_C: string | null
  option_D: string | null
}

const props = defineProps({
  itemDetail: Object as () => ItemObject,
})
</script>

<style scoped></style>
