<template>
  <div>
    <q-img height="300" src="../assets/banner.png" style="min-height: 300px">
      <div class="absolute-top" style="background: none; left: 8%">
        <h3 class="text-white">现代教育技术考试系统</h3>
        <p class="text-h5 q-my-lg">{{ guide }}</p>
        <p v-if="unfinishedTest.isUnfinished">{{ unfinishedTestStartTime }}开始的考试正在进行中....</p>
        <div class="q-my-lg">
          <q-btn
            unelevated
            color="white"
            text-color="black"
            icon-right="keyboard_double_arrow_right"
            size="lg"
            :label="btnLabel"
            rounded
            padding="xs lg"
            @click="startTest()"
          />
        </div>
      </div>
    </q-img>
    <div class="container q-pt-xl q-pb-md">
      <div class="text-center text-h4">自适应测试特点</div>
      <div class="row justify-around q-mt-lg">
        <div class="col-4 row justify-center">
          <q-img
            src="../assets/feature1.png"
            class="col-12"
            ratio="1"
            style="max-width: 25%; min-width: 10%"
          />
          <div class="text-h6 text-bold q-my-md col-12 text-center">智能匹配试题</div>
          <p class="text-body1">按应试者作答情况智能抽取题目</p>
        </div>
        <div class="col-4 row justify-center">
          <q-img
            src="../assets/feature2.png"
            class="col-12"
            ratio="1"
            style="max-width: 25%; min-width: 10%"
          />
          <div class="text-h6 text-bold q-my-md col-12 text-center">精准结果测试</div>
          <p class="text-body1">所选试题契合每一位应试能力水平，提高测试结果精准性</p>
        </div>
        <div class="col-4 row justify-center">
          <q-img
            src="../assets/feature3.png"
            class="col-12"
            ratio="1"
            style="max-width: 25%; min-width: 10%"
          />
          <div class="text-h6 text-bold q-my-md col-12 text-center">针对性独立测试</div>
          <p class="text-body1">利用自适应算法打造独特试卷，实现高效提升</p>
        </div>
      </div>
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
import StartTestSettingDialog from './StartTestSettingDialog.vue'

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
    $q.dialog({
      component: StartTestSettingDialog,
    }).onOk((val: number | Record<string, number>) => {
      if (typeof val == 'number') {
        testing.startTest({
          data: { test_setting: val },
          success: (res: any) => {
            console.log(res)
            router.push('/test-page')
          },
          failure: (error: any) => {
            console.log(error)
          },
        })
      } else {
        testing.startTest({
          data: val,
          success: (res: any) => {
            console.log(res)
            router.push('/test-page')
          },
          failure: (error: any) => {
            console.log(error)
          },
        })
      }
    })
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
