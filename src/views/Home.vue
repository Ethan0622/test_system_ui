<template>
  <div class="container">
    <div class="row justify-center q-my-md">
      <p class="col-12 text-h4 text-center">欢迎来到现代教育技术考试系统</p>
      <p class="col-12 text-h5 text-center">{{ guide }}</p>
      <p v-if="unfinishedTest.isUnfinished">未完成的考试已于{{ unfinishedTestStartTime }}开始</p>
    </div>
    <div class="row justify-center">
      <q-btn unelevated rounded color="primary" :label="btnLabel" @click="startTest()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { ref, onMounted, computed, onUpdated } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '../store/user'
import { useTestStore } from '../store/testing'
import TestHintDialog from './TestHintDialog.vue'

const $q = useQuasar()
const router = useRouter()

const user = useUserStore()
const testing = useTestStore()
const userInfo = computed(() => useUserStore().userInfo)
const unfinishedTest = computed(() => useUserStore().unfinishedTest)
const unfinishedTestStartTime = computed(() => {
  if (unfinishedTest.value.isUnfinished) {
    return unfinishedTest.value.unfinishedInfo?.start_time
  } else {
    return ''
  }
})

const btnLabel = ref<string>('开始测试')
const guide = ref<string>('点击下方按钮开始考试')

function startTest() {
  if (!userInfo.value) {
    $q.notify({
      color: 'red',
      icon: 'error',
      message: '请先登录，再开始测试',
      position: 'top',
    })
  } else if (unfinishedTest.value.isUnfinished) {
    let unfinishedTestId = unfinishedTest.value.unfinishedInfo?.test_id
    testing.continueTest({
      data: { unfinished_test_id: unfinishedTestId },
      success: (res: any) => {
        testing.$patch({ testId: unfinishedTestId })
        if (res.next_item) {
          router.push('/test-page')
        } else if (!res.uninit_finished) {
          $q.dialog({
            component: TestHintDialog,
            componentProps: {
              stage: 'continueInit',
            },
          }).onOk(() => {
            console.log('继续初始测试')
            router.push('/test-page')
          })
        }
      },
      failure: (error: any) => {
        console.log(error)
      },
    })
  } else {
    testing.startTest({
      data: {},
      success: (res: any) => {
        console.log(res)
      },
      failure: (error: any) => {
        console.log(error)
      },
    })
    router.push('/test-page')
  }
}

onMounted(() => {
  if (userInfo.value) {
    user.checkTests({
      success: (res: any) => {
        console.log(res)
      },
      failure: (error: any) => {
        console.log(error)
      },
    })
  }
})

onUpdated(() => {
  if (unfinishedTest.value.isUnfinished) {
    btnLabel.value = '继续测试'
    guide.value = '您还有未完成的考试，请继续考试。'
  }
})
</script>
