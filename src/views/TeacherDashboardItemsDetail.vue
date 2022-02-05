<template>
  <q-page padding>
    <AddChoiceItemsVue v-if="item && item.type == 1" :itemDetail="item" />
    <AddJudgeItemsVue v-if="item && item.type == 2" :itemDetail="item" />
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ItemObject } from '../utils/interface'
import AddChoiceItemsVue from './ChoiceItemsView.vue'
import AddJudgeItemsVue from './JudgeItemsView.vue'
import testingStores from '../store/testing'

const route = useRoute()
const testing = testingStores.testing()

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
