<template>
  <q-page padding>
    <div v-if="!classroom" class="absolute-center">
      <q-spinner color="primary" size="3rem" :thickness="5" />
    </div>
    <div v-else>
      <h4 class="q-mt-none q-mb-sm text-weight-medium">{{ classroom.class_name }}</h4>
      <div class="row">
        <div class="text-h5 q-my-sm col-12">班级邀请码：{{ classroom.invitation_code }}</div>
        <div class="text-h5 q-my-sm col-12">教师：{{ user.userInfo.realname || user.userInfo.number }}</div>
        <div>
          <q-btn color="primary" label="点击下载模板" @click="downloadFile"></q-btn>
        </div>
        <q-file class="col-3" color="teal" filled v-model="file" accept=".xlsx, .xls" label="批量添加学生">
          <template v-slot:prepend>
            <q-icon name="cloud_upload" />
          </template>
        </q-file>
        <q-btn unelevated color="primary" icon="upload" title="上传" @click="uploadUserFile()" />
      </div>

      <q-card class="q-my-md q-mx-sm">
        <TeacherDashboardClassStudentsVue />
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClassStore } from '../store/classes'
import { useUserStore } from '../store/user'
import { ClassObject } from '../utils/interface'
import TeacherDashboardClassStudentsVue from './TeacherDashboardClassStudents.vue'
import UploadFileWarningDialogVue from './UploadFileWarningDialog.vue'

const $q = useQuasar()

const route = useRoute()

const myClass = useClassStore()
const user = useUserStore()

const file = ref(null)

const classroom = computed(() => {
  let findedClass: ClassObject = myClass.classrooms.find((c: ClassObject) => c.id == Number(route.params.id))
  return findedClass
})

function downloadFile() {
  var a = document.createElement('a') //创建一个<a></a>标签
  a.href = '/public/static/uploadUsersTemplate.rar' // 给a标签的href属性值加上地址，使用绝对路径
  a.download = 'uploadUsersTemplate.rar' //设置下载文件文件名
  a.style.display = 'none' // 障眼法藏起来a标签
  document.body.appendChild(a) // 将a标签追加到文档对象中
  a.click() // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
  a.remove() // 一次性的，用完就删除a标签
}

function uploadUserFile() {
  if (file.value) {
    let form = new FormData()
    form.append('file', file.value)
    myClass.uploadStudentFile({
      urlParams: Number(route.params.id),
      data: form,
      success: (res: any) => {
        console.log(res.warnings)
        $q.notify({
          type: 'positive',
          message: '已生成学生并加入班级',
          position: 'top',
        })
        if (res.warnings) {
          $q.dialog({
            component: UploadFileWarningDialogVue,
            componentProps: {
              warnings: res.warnings,
              fileSwitch: 'usersFile',
            },
          }).onOk(() => {
            window.location.reload()
          })
        } else {
          window.location.reload()
        }
      },
      failure: (error: any) => {
        console.log(error)
        $q.dialog({
          component: UploadFileWarningDialogVue,
          componentProps: {
            errors: error.errors,
            fileSwitch: 'usersFile',
          },
        })
      },
    })
  } else {
    $q.notify({
      type: 'negative',
      message: '请先选择要上传的文件',
      position: 'top',
    })
  }
}
</script>
