<template>
  <q-dialog ref="dialogRef" class="q-dialog" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6 q-mb-sm">设置考试题型与数量</div>
        <div class="text-body1 q-my-sm">
          <b>提醒：</b>
          为了更准确地测试，建议客观题题量不少于40题，且判断题总数不超过选择题为佳
        </div>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="使用预设" label="使用预设" />
          <q-tab name="自定义" label="自定义" />
        </q-tabs>

        <q-separator />
        <q-form @submit="onSubmit">
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="使用预设">
              <q-list bordered separator style="max-height: 600px">
                <q-item
                  clickable
                  v-ripple
                  v-for="item in existSettings"
                  :key="item.id"
                  :active="testSettingId === item.id"
                  @click="testSettingId = item.id"
                  active-class="selected"
                >
                  <q-item-section>
                    <q-item-label>系统预设方案{{ item.id }}</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    客观题{{ item.choice_total + item.judge_total }}题（选择{{ item.choice_total }}；判断{{
                      item.judge_total
                    }}）；主观题{{ item.glossary_total + item.saqs_total + item.discuss_total }}题（名词解释{{
                      item.glossary_total
                    }}；简答题{{ item.saqs_total }}；论述题{{ item.discuss_total }}）
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>

            <q-tab-panel name="自定义">
              <q-input
                filled
                v-model="choice_total"
                :rules="[(val) => validate(val, itemSum.choice_sum)]"
                label="请输入所需题量"
                class="q-my-md"
              >
                <template v-slot:before>
                  <span class="text-body1">选 择 题：&ensp;</span>
                </template>
                <template v-slot:hint>
                  <span class="text-body2">当前题库总题量：{{ itemSum.choice_sum }}题</span>
                </template>
              </q-input>
              <q-input
                filled
                v-model="judge_total"
                :rules="[(val) => validate(val, itemSum.judge_sum)]"
                label="请输入所需题量"
                class="q-my-md"
              >
                <template v-slot:before>
                  <span class="text-body1">判 断 题：&ensp;</span>
                </template>
                <template v-slot:hint>
                  <span class="text-body2">当前题库总题量：{{ itemSum.judge_sum }}题</span>
                </template>
              </q-input>
              <q-input
                filled
                v-model="glossary_total"
                :rules="[(val) => validate(val, itemSum.glossary_sum)]"
                label="请输入所需题量"
                class="q-my-md"
              >
                <template v-slot:before>
                  <span class="text-body1">名词解释：</span>
                </template>
                <template v-slot:hint>
                  <span class="text-body2">当前题库总题量：{{ itemSum.glossary_sum }}题</span>
                </template>
              </q-input>
              <q-input
                filled
                v-model="saqs_total"
                :rules="[(val) => validate(val, itemSum.saqs_sum)]"
                label="请输入所需题量"
                class="q-my-md"
              >
                <template v-slot:before>
                  <span class="text-body1">简 答 题：&ensp;</span>
                </template>
                <template v-slot:hint>
                  <span class="text-body2">当前题库总题量：{{ itemSum.saqs_sum }}题</span>
                </template>
              </q-input>
              <q-input
                filled
                v-model="discuss_total"
                :rules="[(val) => validate(val, itemSum.discuss_sum)]"
                label="请输入所需题量"
                class="q-my-md"
              >
                <template v-slot:before>
                  <span class="text-body1">论 述 题：&ensp;</span>
                </template>
                <template v-slot:hint>
                  <span class="text-body2">当前题库总题量：{{ itemSum.discuss_sum }}题</span>
                </template>
              </q-input>
            </q-tab-panel>
          </q-tab-panels>
          <div class="text-right">
            <q-btn flat color="primary" label="取消" @click="onCancelClick" />
            <q-btn label="进入考试" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useQuasar, useDialogPluginComponent } from 'quasar'
import { ref, defineEmits, onMounted, watch } from 'vue'
import { useTestStore } from '@/store/testing'
import { useItemStore } from '@/store/itembank'
import { TestSettingObject } from '../utils/interface'

const $q = useQuasar()

const emits = defineEmits([...useDialogPluginComponent.emits])

const testing = useTestStore()
const itembank = useItemStore()

const tab = ref<string>('使用预设')
const existSettings = ref<Array<TestSettingObject>>([])
const testSettingId = ref<number>()
const choice_total = ref<number>()
const judge_total = ref<number>()
const glossary_total = ref<number>()
const saqs_total = ref<number>()
const discuss_total = ref<number>()

interface itemSumObject {
  choice_sum: number
  discuss_sum: number
  glossary_sum: number
  judge_sum: number
  saqs_sum: number
}

const itemSum = ref<itemSumObject>({
  choice_sum: 0,
  discuss_sum: 0,
  glossary_sum: 0,
  judge_sum: 0,
  saqs_sum: 0,
})

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

function onOKClick() {
  if (tab.value == '使用预设') {
    if (testSettingId.value) {
      onDialogOK(testSettingId.value)
    } else {
      $q.notify({
        type: 'negative',
        message: '请选择一个预设',
        position: 'top',
      })
    }
  }
  if (tab.value == '自定义') {
    existSettings.value.forEach((item) => {
      if (
        item.choice_total == choice_total.value &&
        item.judge_total == judge_total.value &&
        item.glossary_total == glossary_total.value &&
        item.saqs_total == saqs_total.value &&
        item.discuss_total == discuss_total.value
      ) {
        testSettingId.value = item.id
      }
    })
    if (testSettingId.value) {
      onDialogOK(testSettingId.value)
    } else {
      onDialogOK({
        choice_total: Number(choice_total.value),
        judge_total: Number(judge_total.value),
        glossary_total: Number(glossary_total.value),
        saqs_total: Number(saqs_total.value),
        discuss_total: Number(discuss_total.value),
      })
    }
  }
}

function onCancelClick() {
  onDialogCancel()
}

watch(tab, (newVal, oldVal) => {
  if (newVal != oldVal) {
    testSettingId.value = undefined
    choice_total.value = undefined
    judge_total.value = undefined
    glossary_total.value = undefined
    saqs_total.value = undefined
    discuss_total.value = undefined
  }
})

function validate(val: string, sum: number) {
  let regPos = /^[0-9]*$/
  if (val && regPos.test(val)) {
    if (Number(val) <= sum) {
      return true
    } else {
      return '超过题库现有题量'
    }
  } else {
    return '请输入总数（无则填0）'
  }
}

function onSubmit() {
  onOKClick()
}

onMounted(() => {
  testing.getTestSettings({
    success: (res: any) => {
      existSettings.value = res
      console.log(res)
    },
    failure: (error: unknown) => {
      console.log(error)
    },
  })

  itembank.getItemSum({
    success: (res: itemSumObject) => {
      itemSum.value = res
      console.log(res)
    },
    failure: (error: unknown) => {
      console.log(error)
    },
  })
})
</script>

<style lang="scss" scoped>
.selected {
  color: white;
  background: #027be3;
}

.q-dialog {
  .q-dialog__inner--minimized {
    padding: 16px;
  }
  .q-dialog__inner--minimized > div {
    max-width: 1000px;
    min-width: 450px;
  }
}
</style>
