<template>
  <q-table title="班级学生" :rows="studentList" :columns="columns" row-key="index">
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="index" :props="props">
          {{ props.rowIndex + 1 }}
        </q-td>
        <q-td key="number" :props="props">
          {{ props.row.number }}
        </q-td>
        <q-td key="student_name" :props="props">
          {{ props.row.student_name || '-' }}
        </q-td>
        <q-td key="finished_tests" :props="props">
          <q-btn
            flat
            color="primary"
            label="点击查看"
            dense
            :to="`/${props.row.kexperimentRouter}/` + props.row.test_id"
          />
        </q-td>
        <q-td key="modify" :props="props">
          <q-btn
            flat
            color="primary"
            label="编辑修改"
            dense
            @click=";(edit.open = true), (edit.student_id = props.row.id)"
          />
        </q-td>
      </q-tr>
    </template>
  </q-table>
  <q-dialog ref="editDialog" v-model="edit.open" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">重置密码</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          ref="editInput"
          lazy-rules="ondemand"
          dense
          v-model="repassword"
          autofocus
          :rules="[unnull, resetPassword]"
        />
      </q-card-section>
      <q-card-actions class="row justify-between text-primary">
        <div>
          <q-btn flat label="踢出班级" @click="removeStudent(edit.student_id)" color="red" />
        </div>
        <div>
          <q-btn flat label="取消" v-close-popup />
          <q-btn flat label="重置" @click="repwdValidation()" />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { QDialog, QInput, useQuasar } from 'quasar'
import { ref, onMounted, reactive } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import {useClassStore} from '../store/classes'
import { UserObject } from '../utils/interface'

const $q = useQuasar()
const route = useRoute()

const myClass = useClassStore()

const columns = [
  { name: 'index', label: '序号', align: 'center' },
  { name: 'number', label: '学号', align: 'center', sortable: true },
  { name: 'student_name', label: '姓名', align: 'center' },
  { name: 'finished_tests', label: '查看测验', align: 'center' },
  { name: 'modify', align: 'center', label: '编辑用户' },
]

const editDialog = ref<QDialog>()
const editInput = ref<QInput>()
let studentList = ref([])
const repassword = ref<string>('')
const edit = reactive({ open: false, student_id: undefined })

function unnull(val: string) {
  return (val && val.length > 0) || '请输入重置密码'
}

function repwdValidation() {
  editInput.value?.validate()
}

function resetPassword() {
  myClass.updateStudentInfo({
    urlParams: Number(route.params.id),
    data: {
      student_id: edit.student_id,
      repassword: repassword.value,
    },
    success: (res: any) => {
      repassword.value = ''
      $q.notify({
        type: 'positive',
        message: '重置成功',
        position: 'top',
      })
      console.log(res)
    },
    failure: (error: any) => {
      console.log(error)
      $q.notify({
        type: 'negative',
        message: '重置失败',
        position: 'top',
      })
    },
  })
  editDialog.value?.hide()
}

function removeStudent(id: number | undefined) {
  if (id) {
    myClass.removeStudent({
      urlParams: Number(route.params.id),
      data: { student_id: id },
      success: (res: any) => {
        console.log(res)
        studentList.value.splice(
          studentList.value.findIndex((e: UserObject) => e.id == id),
          1
        )
        $q.notify({
          type: 'positive',
          message: '删除成功',
          position: 'top',
        })
      },
      failure: (error: any) => {
        console.log(error)
      },
    })
  }
  editDialog.value?.hide()
}

onBeforeRouteUpdate(async (to, from) => {
  studentList.value = []
  const pathmatch = to.fullPath.includes('/dashboard/class-detail/')
  if (pathmatch) {
    myClass.getClassStudents({
      urlParams: Number(to.params.id),
      success: (res: any) => {
        studentList.value = res
        console.log(res)
      },
      failure: (error: any) => {
        console.log(error)
      },
    })
  }
})

onMounted(() => {
  myClass.getClassStudents({
    urlParams: Number(route.params.id),
    success: (res: any) => {
      studentList.value = res
      console.log(res)
    },
    failure: (error: any) => {
      console.log(error)
    },
  })
})
</script>
