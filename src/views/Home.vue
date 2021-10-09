<template>
  <div class="container row justify-center">
    <q-btn unelevated rounded color="primary" label="开始测试" @click="startTest()" />
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
import userStores from '../store/user'
import testingStores from '../store/testing'

const $q = useQuasar()
const router = useRouter()

const user = userStores.user()
const testing = testingStores.user()

function startTest() {
  if (!user.userInfo) {
    $q.notify({
      color: 'red',
      icon: 'error',
      message: '请先登录，再开始测试',
      position: 'top',
    })
  } else {
    // testing.startTest({
    //   data: {},
    //   success: (res: any) => {
    //     console.log(res)
    //   },
    //   failure: (error: any) => {
    //     console.log(error)
    //   },
    // })
    router.push('/test-page')
  }
}
</script>
