<template>
  <div class="container">
    <div class="row justify-center">
      <p class="text-h5">{{ testName }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { ref, onMounted } from 'vue'
import userStores from '../store/user'

const $q = useQuasar()

const user = userStores.user()
const testName = ref<string>('')

onMounted(() => {
  if (user.userInfo.init_ability) {
    testName.value = '正式测试'
  } else {
    testName.value = '初始能力测定'
  }
})
</script>
