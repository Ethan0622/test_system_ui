<template>
  <div class="container">
    <div class="row justify-center">
      <p class="text-h5 col-12 text-center">{{ testName }}</p>
      <div class="col-10">
        <ItemCardChoiceVue :itemDetail="testing.test_item" @deliver_answer="get_answer" />
      </div>
      <div class="col-12 row justify-center">
        <q-btn class="q-my-md" color="primary" label="下一题" @click="submitAnswer"></q-btn>
      </div>
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
const answer = ref<string>('')

function get_answer(val: string) {
  answer.value = val
}

function submitAnswer() {
  if (answer.value) {
    if (!user.userInfo.init_ability) {
      testing.submitInitAnswer({
        data: {
          test_id: testing.test_id,
          item_id: testing.test_item.id,
          answer: answer.value,
        },
        success: (res: any) => {
          answer.value = ''
          console.log(res)
          console.log('123')
        },
        failure: (error: any) => {
          console.log(error)
        },
      })
    } else {
      testing.submitAnswer({
        data: {
          test_id: testing.test_id,
          item_id: testing.test_item.id,
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
    testName.value = '正式测试'
  } else {
    testName.value = '初始能力测定'
  }
})
</script>
