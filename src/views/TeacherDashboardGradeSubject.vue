<template>
  <q-page padding>
    <div class="text-h5">主观题批改</div>
    <div>学生信息：{{ myClass.currentStudent.realname || myClass.currentStudent.number }}</div>
    <div>考试时间：{{ myClass.currentTest.start_time }}</div>
    <q-card class="my-card q-my-md" v-for="(item, index) in subjectLists" :key="item.id">
      <q-card-section>
        <div class="text-h6">{{ item.content }}</div>
        <p>{{ item.answer }}</p>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-form @submit="gradeSubject(item, index)" class="row">
          <q-input
            bottom-slots
            filled
            v-model="score[index]"
            error-message="给分不符合分值范围"
            :error="errorFlag[index]"
            label="请输入本题得分"
          >
            <template v-slot:hint>分值：{{ totalScore(item.type) }}</template>
          </q-input>

          <q-btn unelevated color="primary" label="评分" type="submit" />
        </q-form>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useClassStore } from '@/store/classes'
import { QCard, QInput, useQuasar } from 'quasar'

interface SubejctRecord {
  id: number
  content: string
  type: number
  answer: string
  item_id: number
  score: number | undefined
}

const $q = useQuasar()

const route = useRoute()
const myClass = useClassStore()

const score = ref<Array<number>>([])
const subjectLists = ref<Array<SubejctRecord>>([])
const errorFlag = ref<Array<boolean>>([])

function gradeSubject(item: SubejctRecord, index: number) {
  let validate = false
  let val = score.value[index]
  switch (item.type) {
    case 3:
      if (val >= 0 && val <= 5) {
        validate = true
        break
      } else {
        errorFlag.value[index] = true
        break
      }
    case 4:
      if (val >= 0 && val <= 10) {
        validate = true
        break
      } else {
        errorFlag.value[index] = true
        break
      }
    case 5:
      if (val >= 0 && val <= 20) {
        validate = true
        break
      } else {
        errorFlag.value[index] = true
        break
      }
  }
  if (!validate) {
    setTimeout(() => {
      errorFlag.value[index] = false
    }, 2000)
  }

  if (score.value[index] && validate) {
    myClass.gradeSubjectItem({
      urlParams: Number(route.params.id),
      data: {
        subject_id: item.id,
        score: score.value[index],
      },
      success: (res: any) => {
        $q.notify({
          type: 'positive',
          message: '评分成功',
          position: 'top',
        })
        console.log(res)
      },
      failure: (error: unknown) => {
        $q.notify({
          type: 'negative',
          message: '评分失败，请稍后再试',
          position: 'top',
        })
        console.log(error)
      },
    })
  }
}

function totalScore(type: number) {
  switch (type) {
    case 3:
      return 5
    case 4:
      return 10
    case 5:
      return 20
  }
}

function getScore(list: Array<SubejctRecord>) {
  let scoreList: Array<number> = []
  list.forEach((val) => {
    errorFlag.value.push(false)
    if (val.score) {
      scoreList.push(val.score)
    }
  })
  return scoreList
}

onMounted(() => {
  myClass.getSubjectAnswer({
    urlParams: Number(route.params.id),
    success: (res: any) => {
      subjectLists.value = res
      score.value = getScore(res)
      console.log(res)
    },
    failure: (error: unknown) => {
      console.log(error)
    },
  })
})
</script>
