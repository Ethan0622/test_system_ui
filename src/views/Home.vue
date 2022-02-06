<template>
  <div class="container">
    <div class="row justify-center q-my-md">
      <p class="col-12 text-h4 text-center">欢迎来到现代教育技术考试系统</p>
      <p class="col-12 text-h5 text-center">{{ guide }}</p>
      <p v-if="unfinishedTest.unfinishedInfo && unfinishedTest.isUnfinished">
        未完成的考试已于{{ unfinishedTest.unfinishedInfo.start_time }}开始
      </p>
    </div>
    <div class="row justify-center">
      <q-btn unelevated rounded color="primary" :label="btnLabel" @click="startTest()" />
    </div>

    <q-dialog v-model="initTestDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar class="material-icons-round" icon="warning" />
          <div class="q-ml-sm text-body1">您的初始能力评估还未完成，请先进行能力测试！</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn flat label="立即前往" color="primary" @click="continueInitTest" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '../store/user'
import { useTestStore } from '../store/testing'

const $q = useQuasar()
const router = useRouter()

const user = useUserStore()
const testing = useTestStore()
const userInfo = computed(() => useUserStore().userInfo)
const unfinishedTest = computed(() => useUserStore().unfinishedTest)

const btnLabel = ref<string>('开始测试')
const guide = ref<string>('点击下方按钮开始考试')
const initTestDialog = ref<boolean>(false)

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

  if (unfinishedTest.value.isUnfinished) {
    btnLabel.value = '继续测试'
    guide.value = '您还有未完成的考试，请继续考试。'
  }
})

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
        if (res.next_item) {
          router.push('/test-page')
        } else if (!res.uninit_finished) {
          initTestDialog.value = true
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

function continueInitTest() {
  testing.continueInitTest({
    params: {
      test_id: unfinishedTest.value.unfinishedInfo?.test_id,
    },
    success: (res: any) => {
      console.log(res)
    },
    failure: (error: any) => {
      console.log(error)
    },
  })
}
</script>
