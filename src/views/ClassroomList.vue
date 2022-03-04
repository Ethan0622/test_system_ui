<template>
  <div class="container">
    <div class="q-mb-xl">
      <h6>加入班级</h6>
      <q-input
        v-model="invitationCode"
        :rules="[checkCode, joinClass]"
        ref="codeInput"
        @input="resetValidation"
        debounce="200"
        lazy-rules="ondemand"
        class="join-classroom-input"
        label="请输入班级邀请码"
        bottom-slots
        filled
      >
        <template v-slot:hint>
          <div class="row items-center">
            <q-icon name="info" class="q-mr-xs" />
            如果没有班级邀请码，可以询问你的任课老师
          </div>
        </template>

        <template v-slot:after>
          <q-btn @click="validationCode()" label="加入" icon="group_add" color="primary" outline />
        </template>
      </q-input>
    </div>

    <q-separator />

    <q-card class="q-mt-xl q-pb-sm">
      <q-table
        title="你的班级"
        :rows="classroom"
        :columns="columns"
        row-key="name"
        :rows-per-page-options="[0]"
      >
        <template v-slot:body-cell-actionButtons="props">
          <q-td :props="props">
            <q-btn @click="quitConfirm()" color="red" label="退出班级" flat />
          </q-td>
        </template>

        <template v-slot:no-data>
          <div
            class="full-width row flex-center q-gutter-sm q-my-lg"
            :class="$q.dark.isActive ? 'text-grey-6' : 'text-grey'"
          >
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span>还没有加入任何班级</span>
          </div>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { QInput, useQuasar } from 'quasar'
import { ref, onMounted } from 'vue'
import { useClassStore } from '../store/classes'

const $q = useQuasar()

const myClass = useClassStore()

const columns = [
  { name: 'class_name', label: '班级', align: 'center', field: 'class_name', sortable: true },
  { name: 'create_time', label: '创建时间', align: 'center', field: 'create_time' },
  { name: 'teacher_name', label: '管理老师', align: 'center', field: 'teacher_name' },
  { name: 'actionButtons', label: '操作', align: 'center' },
]

const codeInput = ref<QInput>()
const invitationCode = ref<string>('')
const classroom = ref<any>([])

function resetValidation() {
  codeInput.value?.resetValidation()
}

function checkCode(val: string) {
  if (classroom.value.length) {
    return '你只能加入一个班级，请先退出当前班级'
  } else if (!val) {
    return '请输入邀请码'
  } else if (val.length != 8) {
    return '邀请码应为8位随机数'
  } else {
    return true
  }
}

function validationCode() {
  codeInput.value?.validate()
}

function joinClass() {
  myClass.joinClass({
    data: { invitation_code: invitationCode.value },
    success: (res: any) => {
      $q.notify({ type: 'positive', message: '加入班级成功', position: 'top' })
      window.location.reload()
      console.log(res)
    },
    failure: (error: any) => {
      console.log(error.response.data)
      $q.notify({ type: 'negative', message: error.response.data.msg, position: 'top' })
    },
  })
}

function quitConfirm() {
  $q.dialog({
    title: '退出班级',
    message: `确认退出班级吗？`,
    cancel: true,
    ok: { color: 'red', flat: true },
  }).onOk(() => {
    myClass.quitClass({
      success: () => {
        $q.notify({ type: 'positive', message: '已退出该班级', position: 'top' })
        classroom.value = []
      },
      failure: (error: any) => {
        console.log(error)
      },
    })
  })
}

onMounted(() => {
  myClass.getJoinedClass({
    success: (res: any) => {
      classroom.value.push(res)
      console.log(classroom)
      console.log(res)
    },
    failure: (error: any) => {
      console.log(error)
    },
  })
})
</script>
