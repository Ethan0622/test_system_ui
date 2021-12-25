<template>
  <div class="container">
    <div class="row justify-center">
      <p class="text-h5">{{ testName }}</p>
      <ItemCardChoiceVue :itemDetail="testing.test_item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { ref, onMounted } from 'vue'
import userStores from '../store/user'
import testingStores from '../store/testing'
import ItemCardChoiceVue from '@/components/ItemCardChoice.vue'

const $q = useQuasar()

const user = userStores.user()
const testing = testingStores.testing()

const testName = ref<string>('')

onMounted(() => {
  if (user.userInfo.init_ability) {
    testName.value = '正式测试'
  } else {
    testName.value = '初始能力测定'
  }
})
</script>
