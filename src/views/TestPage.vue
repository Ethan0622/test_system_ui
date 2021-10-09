<template>
  <div class="container">
    <div class="text-h5">{{ testName }}</div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { ref, onMounted, watch } from 'vue'
import userStores from '../store/user'

const $q = useQuasar()

const user = userStores.user()
const testName = ref<string>('')

const gotoFullScreen = $q.fullscreen.request()

onMounted(() => {
  if (user.userInfo.init_ability) {
    testName.value = '正式测试'
  } else {
    testName.value = '初始能力测定'
  }
  $q.fullscreen
    .request()
    .then(() => {
      console.log('fullscreen while testing')
    })
    .catch((err) => {
      console.log(err)
    })
})

watch(
  () => $q.fullscreen.isActive,
  (val) => {
      console.log(val)
    // if (!val) {
    //   $q.fullscreen
    //     .request()
    //     .then(() => {
    //       console.log('考试期间，禁止退出全屏')
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // }
    // console.log(val ? 'In fullscreen now' : 'Exited fullscreen')
  }
)
</script>
