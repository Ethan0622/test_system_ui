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
import { ItemObject } from '../utils/interface'

const props = defineProps({
  itemDetail: Object as () => ItemObject,
})
</script>

<style scoped></style>
