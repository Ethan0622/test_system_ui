<template>
  <q-page padding>
    <UpdateChoiceItemsVue v-if="item && item.type == 1" :itemDetail="item" />
    <UpdateJudgeItemsVue v-if="item && item.type == 2" :itemDetail="item" />
    <UpdateSubjectItemsVue v-if="item && item.type != 1 && item.type != 2" :itemDetail="item" />
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ItemObject } from '../utils/interface'
import { useItemStore } from '@/store/itembank'
import UpdateChoiceItemsVue from './ChoiceItemsView.vue'
import UpdateJudgeItemsVue from './JudgeItemsView.vue'
import UpdateSubjectItemsVue from './SubjectItemsView.vue'

const route = useRoute()
const itembank = useItemStore()

const item = ref<ItemObject>()

onMounted(() => {
  itembank.getItemById({
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
