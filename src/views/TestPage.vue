<template>
  <div class="container">
    <div class="row justify-center">
      <p class="text-h5 col-12 text-center q-mt-md">{{ testName }}</p>
      <div class="col-10">
        <ChoiceItemTestVue
          v-if="test_item.type == 1 && !finishObjTest"
          :itemDetail="testing.test_item"
          @deliver_answer="get_answer"
        />
        <JudgeItemTestVue
          v-if="test_item.type == 2 && !finishObjTest"
          :itemDetail="testing.test_item"
          @deliver_answer="get_answer"
        />
      </div>
      <div class="col-12 row justify-center">
        <q-btn class="q-my-md" color="primary" label="下一题" @click="submitAnswer"></q-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { ref, onMounted, watch } from 'vue'
import userStores from '../store/user'
import testingStores from '../store/testing'
import ChoiceItemTestVue from '@/components/ChoiceItemTest.vue'
import JudgeItemTestVue from '@/components/JudgeItemTest.vue'

const $q = useQuasar()

const user = userStores.user()
const testing = testingStores.testing()
const test_item = testingStores.testing().test_item

const testName = ref<string>('')
const answer = ref<string>('')
const finishObjTest = ref<boolean>(false)

function get_answer(val: string) {
  switch (test_item.type) {
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

watch(finishObjTest, (newVal, oldVal) => {
  if (newVal) {
    $q.notify({
      type: 'positive',
      message: '客观题答题结束',
      position: 'top',
    })
  }
})

function submitAnswer() {
  if (answer.value) {
    if (!user.userInfo.init_ability) {
      testing.submitInitAnswer({
        data: {
          test_id: testing.test_id,
          item_id: test_item.id,
          answer: answer.value,
        },
        success: (res: any) => {
          answer.value = ''
          console.log(res)
        },
        failure: (error: any) => {
          console.log(error)
        },
      })
    } else {
      testing.submitAnswer({
        data: {
          test_id: testing.test_id,
          item_id: test_item.id,
          answer: answer.value,
        },
        success: (res: any) => {
          answer.value = ''
          finishObjTest.value = res.finishObjTest
          console.log(res)
        },
        failure: (error: any) => {
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
    if (!finishObjTest.value) {
      testName.value = '正式测试-客观题部分'
    } else {
      testName.value = '正式测试-主观题部分'
    }
  } else {
    testName.value = '初始能力测定'
  }
})
</script>
