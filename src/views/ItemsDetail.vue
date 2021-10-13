<template>
  <div class="container">
    <ItemCardChoiceVue :itemDetail="item" />
    <div v-if="item">
      <div class="text-h6">参数</div>
      <p>区分度a：{{ item.discrimination }}</p>
      <p>难度b：{{ item.difficulty }}</p>
      <p>猜测系数c：{{ item.guessing }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ItemCardChoiceVue from '@/components/ItemCardChoice.vue'
import testingStores from '../store/testing'

const route = useRoute()
const testing = testingStores.testing()

interface ItemObject {
  content: string
  id: number
  type: number
  option_A: string | null
  option_B: string | null
  option_C: string | null
  option_D: string | null
  discrimination: number | null
  difficulty: number | null
  guessing: number | null
}

const item = ref<ItemObject>()

onMounted(() => {
  testing.getItemById({
    urlParams: Number(route.params.id),
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
