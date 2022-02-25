<template>
  <div class="row justify-center">
    <div class="col-12 row justify-center q-mb-md">
      <q-btn color="primary" label="点击下载模板" @click="downloadFile"></q-btn>
    </div>
    <q-file
      class="col-5"
      color="teal"
      filled
      v-model="file"
      accept=".xlsx, .xls"
      label="点击添加需要上传的试题文件"
    >
      <template v-slot:prepend>
        <q-icon name="cloud_upload" />
      </template>
    </q-file>
    <q-btn unelevated color="primary" icon="upload" title="上传" @click="uploadItemFile()" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useItemStore } from '../store/itembank'
import UploadFileWarningDialogVue from './UploadFileWarningDialog.vue'

const $q = useQuasar()

const itembank = useItemStore()

const file = ref(null)

function downloadFile() {
  var a = document.createElement('a') //创建一个<a></a>标签
  a.href = '/public/static/uploadItemsTemplate.rar' // 给a标签的href属性值加上地址，使用绝对路径
  a.download = 'uploadItemsTemplate.rar' //设置下载文件文件名
  a.style.display = 'none' // 障眼法藏起来a标签
  document.body.appendChild(a) // 将a标签追加到文档对象中
  a.click() // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
  a.remove() // 一次性的，用完就删除a标签
}

function uploadItemFile() {
  if (file.value) {
    let form = new FormData()
    form.append('file', file.value)
    itembank.uploadItemFile({
      data: form,
      success: (res: any) => {
        console.log(res)
        $q.notify({
          type: 'positive',
          message: '上传成功，题库已更新',
          position: 'top',
        })
      },
      failure: (error: any) => {
        $q.dialog({
          component: UploadFileWarningDialogVue,
          componentProps: {
            errors: error.errors,
            fileSwitch: 'itemsFile',
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
