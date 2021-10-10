<template>
  <div class="container">
    <div class="text-h4 row justify-center q-my-md">欢迎来到现代教育技术考试系统</div>
    <div class="row justify-center q-my-md">
      <q-btn unelevated rounded color="primary" label="开始测试" @click="startTest()" />
      <q-btn unelevated rounded color="primary" label="查看题目" to="/items-list" />
    </div>
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
const testing = testingStores.testing()

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
