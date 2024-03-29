<template>
  <div class="container">
    <div class="row justify-center">
      <p class="text-h5 col-12 text-center q-mt-md">{{ testName }}</p>
      <div class="col-10">
        <ChoiceItemTestVue
          v-if="testItem.type == 1 && !finishObjTest"
          :itemDetail="testing.testItem"
          @deliver_answer="get_answer"
        />
        <JudgeItemTestVue
          v-if="testItem.type == 2 && !finishObjTest"
          :itemDetail="testing.testItem"
          @deliver_answer="get_answer"
        />
        <SubjectItemTestVue
          v-if="testItem.type != 1 && testItem.type != 2"
          :itemDetail="testing.testItem"
          @deliver_answer="get_answer"
        />
      </div>
      <div class="col-12 row justify-center">
        <q-btn class="q-my-md" color="primary" :label="btnLabel" @click="submitAnswer"></q-btn>
      </div>
    </div>
    <q-inner-loading
      :showing="submitLoad"
      label="请稍等..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </div>
</template>

<script setup lang="ts">
import { VueCookieNext } from 'vue-cookie-next'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'
import { useTestStore } from '../store/testing'
import ChoiceItemTestVue from '@/components/ChoiceItemTest.vue'
import JudgeItemTestVue from '@/components/JudgeItemTest.vue'
import SubjectItemTestVue from '@/components/SubjectItemTest.vue'
import TestHintDialog from './TestHintDialog.vue'

const $q = useQuasar()

const router = useRouter()

const user = useUserStore()
const testing = useTestStore()
const testItem = computed(() => useTestStore().testItem)

const testName = ref<string>('')
const answer = ref<string>('')
const btnLabel = ref<string>('')
const initFinish = ref<boolean>(false)
const finishObjTest = ref<boolean>(false)
const { testWillFinish } = storeToRefs(testing)
const testAllFinish = ref<boolean>(false)
const submitLoad = ref<boolean>(false)

function get_answer(val: string) {
  console.log(val)
  switch (testItem.value.type) {
    case 1:
      answer.value = val
      break
    case 2:
      answer.value = val == 'true' ? '1' : '0'
      break
    default:
      answer.value = val
      break
  }
}

watch(initFinish, (newVal, oldVal) => {
  if (newVal) {
    $q.dialog({
      component: TestHintDialog,
      componentProps: {
        stage: 'startObject',
      },
    }).onOk((val: string) => {
      testName.value = val
    })
  }
})

watch(finishObjTest, (newVal, oldVal) => {
  if (newVal && !testAllFinish.value) {
    $q.dialog({
      component: TestHintDialog,
      componentProps: {
        stage: 'startSubject',
      },
    }).onOk((val: any) => {
      testName.value = val.testName
      testWillFinish.value = val.testWillFinish
    })
  }
})

watch(testWillFinish, (newVal, oldVal) => {
  if (newVal != oldVal && newVal) {
    btnLabel.value = '结束测试'
  }
})

function submitAnswer() {
  if (answer.value) {
    submitLoad.value = true
    if (!user.userInfo.init_ability) {
      testing.submitInitAnswer({
        data: {
          test_id: testing.testId,
          item_id: testItem.value.id,
          answer: answer.value,
        },
        success: (res: any) => {
          if (res.init_finished) {
            initFinish.value = true
            let updateUser = VueCookieNext.getCookie('userInfo')
            updateUser.init_ability = res.init_ability
            VueCookieNext.setCookie('userInfo', updateUser)
            user.$patch({ userInfo: updateUser })
          }
          answer.value = ''
          console.log(res)
          submitLoad.value = false
        },
        failure: (error: unknown) => {
          console.log(error)
        },
      })
    } else if (testItem.value.type == 1 || testItem.value.type == 2) {
      testing.submitAnswer({
        data: {
          test_id: testing.testId,
          item_id: testItem.value.id,
          answer: answer.value,
        },
        success: (res: any) => {
          console.log(res)
          answer.value = ''
          submitLoad.value = false
          finishObjTest.value = res.finishObjTest
          testWillFinish.value = res.testWillFinish
          testAllFinish.value = res.testAllFinish
          if (res.testAllFinish) {
            testing.finishTest({
              urlParams: testing.testId,
              data: {},
              success: (res: any) => {
                console.log(res)
                console.log('考试结束，路由跳转即可')
                router.replace(`/test-result/${testing.testId}`)
              },
              failure: (error: unknown) => {
                console.log(error)
              },
            })
          }
        },
        failure: (error: any) => {
          console.log(error)
        },
      })
    } else {
      testing.submitSubjectAnswer({
        data: {
          test_id: testing.testId,
          item_id: testItem.value.id,
          answer: answer.value,
        },
        success: (res: any) => {
          answer.value = ''
          submitLoad.value = false
          testWillFinish.value = res.testWillFinish
          testAllFinish.value = res.testAllFinish
          if (res.testAllFinish) {
            testing.finishTest({
              urlParams: testing.testId,
              data: {},
              success: (res: any) => {
                console.log(res)
                console.log('考试结束，路由跳转即可')
                router.replace(`/test-result/${testing.testId}`)
              },
              failure: (error: unknown) => {
                console.log(error)
              },
            })
          }
          console.log(res)
        },
        failure: (error: unknown) => {
          console.log(error)
        },
      })
    }
  } else {
    $q.notify({
      color: 'red',
      icon: 'error',
      message: '请先完成本题',
      position: 'top',
    })
  }
}

onMounted(() => {
  if (user.userInfo.init_ability) {
    if (testItem.value.type == 1 || testItem.value.type == 2) {
      testName.value = '正式测试-客观题部分'
    } else {
      testName.value = '正式测试-主观题部分'
    }
  } else {
    testName.value = '初始能力测定'
  }
  if (testWillFinish.value) {
    btnLabel.value = '结束测试'
  } else {
    btnLabel.value = '下一题'
  }
})
</script>
