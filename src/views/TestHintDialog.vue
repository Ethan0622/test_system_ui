<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section class="row items-center">
        <p class="q-my-sm text-h6">
          {{ hintText }}
        </p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn v-if="stage == 'continueInit'" flat label="取消" color="red" v-close-popup />
        <q-btn flat label="确定" color="primary" @click="ensure()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useQuasar, useDialogPluginComponent } from 'quasar'
import { ref, defineEmits, onMounted, computed } from 'vue'

import { useUserStore } from '../store/user'
import { useTestStore } from '../store/testing'

const $q = useQuasar()

const user = useUserStore()
const testing = useTestStore()

const emits = defineEmits([...useDialogPluginComponent.emits])

const props = defineProps({
  stage: String,
})

const hintText = computed(() => {
  if (props.stage == 'continueInit') {
    return '您的初始能力评估还未完成，请先进行能力测试！'
  } else if (props.stage == 'startObject') {
    return '您已完成初始能力测评，接下来将开始正式测试，首先是客观题部分。请看清楚题目，认真作答，每一题只有一次答题机会，提交答案后即无法更改。预祝你取得一个好成绩！'
  } else if (props.stage == 'startSubject') {
    return '您已完成客观题部分测验，接下来是主观题部分。主观题包括4道名词解释，2道简答题以及1道论述题，请合理分配时间作答。'
  } else {
    return ''
  }
})
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

function onOKClick() {
  onDialogOK()
}

function onCancelClick() {
  onDialogCancel()
}

function ensure() {
  if (props.stage == 'continueInit') {
    continueInitTest()
    onOKClick()
  }
  if (props.stage == 'startObject') {
    startObjectTest().then((val) => {
      onDialogOK(val)
    })
  }
  if (props.stage == 'startSubject') {
    startSubjectTest().then((val) => {
      onDialogOK(val)
    })
  }
  onOKClick()
}

function continueInitTest() {
  testing.continueInitTest({
    params: {
      test_id: user.unfinishedTest.unfinishedInfo?.test_id,
    },
    success: (res: any) => {
      console.log(res)
    },
    failure: (error: any) => {
      console.log(error)
    },
  })
}

function startObjectTest() {
  return new Promise((resolve, reject) => {
    testing.getFirstObjectItem({
      params: { test_id: testing.testId },
      success: (res: any) => {
        console.log(res)
        resolve('正式测试-客观题部分')
      },
      failure: (error: unknown) => {
        console.log(error)
        reject()
      },
    })
  })
}

function startSubjectTest() {
  return new Promise((resolve, reject) => {
    testing.getFirstSubjectItem({
      params: { test_id: testing.testId },
      success: (res: any) => {
        console.log(res)
        resolve('正式测试-主观题部分')
      },
      failure: (error: unknown) => {
        console.log(error)
        reject()
      },
    })
  })
}

onMounted(() => {
  console.log(props.stage)
})
</script>
