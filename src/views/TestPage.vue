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
        <q-btn class="q-my-md" color="primary" label="下一题" @click="submitAnswer"></q-btn>
      </div>
    </div>
  </div>
  <q-dialog v-model="subjectConfirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
        <span class="q-ml-sm">
          您已完成客观题部分测验，接下来是主观题部分。主观题包括4题名词解释，2题简答以及1题论述，请合理分配时间作答。
        </span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="确定" color="primary" v-close-popup @click="startSubjectTest()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { ref, onMounted, watch, computed } from 'vue'
import { useUserStore } from '../store/user'
import { useTestStore } from '../store/testing'
import ChoiceItemTestVue from '@/components/ChoiceItemTest.vue'
import JudgeItemTestVue from '@/components/JudgeItemTest.vue'
import SubjectItemTestVue from '@/components/SubjectItemTest.vue'

const $q = useQuasar()

const user = useUserStore()
const testing = useTestStore()
const testItem = computed(() => useTestStore().testItem)

const testName = ref<string>('')
const answer = ref<string>('')
const finishObjTest = ref<boolean>(false)
const testFinish = ref<boolean>(false)
const subjectConfirm = ref<boolean>(false)

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

watch(finishObjTest, (newVal, oldVal) => {
  if (newVal) {
    subjectConfirm.value = true
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
          test_id: testing.testId,
          item_id: testItem.value.id,
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
    } else if (testItem.value.type == 1 || testItem.value.type == 2) {
      testing.submitAnswer({
        data: {
          test_id: testing.testId,
          item_id: testItem.value.id,
          answer: answer.value,
        },
        success: (res: any) => {
          answer.value = ''
          testFinish.value = res.finishAllTest
          console.log(res)
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

function startSubjectTest() {
  testing.getFirstSubjectItem({
    success: (res: any) => {
      console.log(res)
    },
    failure: (error: any) => {
      console.log(error)
    },
  })
}

onMounted(() => {
  if (user.userInfo.init_ability) {
    if (user.unfinishedTest.isUnfinished) {
      if (user.unfinishedTest.unfinishedInfo?.finish_object_test) {
        testName.value = '正式测试-主观题部分'
      } else {
        testName.value = '正式测试-客观题部分'
      }
    } else {
      if (!finishObjTest.value) {
        testName.value = '正式测试-客观题部分'
      } else {
        testName.value = '正式测试-主观题部分'
      }
    }
  } else {
    testName.value = '初始能力测定'
  }
})
</script>
