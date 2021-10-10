<template>
  <q-card dark bordered class="bg-grey-9 my-card">
    <q-card-section>
      <div class="text-h6">{{ item }}</div>
      <div class="text-subtitle2">by John Doe</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section></q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import testingStores from '../store/testing'

const testing = testingStores.testing()

interface ItemObject {
  content: string
  id: number
  type: number
  option_A: string | null
  option_B: string | null
  option_C: string | null
  option_D: string | null
}

const item = ref<ItemObject>()

onMounted(() => {
  testing.getItemById({
    urlParams: 120,
    success: (res: any) => {
      console.log(res)
      item.value = res
    },
    failure: (err: any) => {
      console.log(err)
    },
  })
})
</script>

<style scoped></style>
