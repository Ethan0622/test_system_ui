<template>
  <div class="row justify-center">
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

    <q-dialog v-model="showErrors" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div class="q-my-sm text-h6">
            <q-avatar class="material-icons-round" icon="warning" />
            您上传的文件内容存在以下问题，请检查修改后再尝试上传！
          </div>
          <div style="max-height: 300px; overflow-y: auto">
            <q-list dense>
              <q-item v-ripple v-for="(item, index) in uploadErrors" :key="item">
                <q-item-section class="text-body1">{{ index + 1 }}、{{ item }}</q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="确定" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import itembankStores from '../store/itembank'

const $q = useQuasar()

const itembank = itembankStores.itembank()

const file = ref(null)
const uploadErrors = ref<string[]>([])
const showErrors = ref<boolean>(false)

function uploadItemFile() {
  if (file.value) {
    let form = new FormData()
    form.append('file', file.value)
    itembank.uploadFile({
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
        uploadErrors.value = error.errors
        showErrors.value = true
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
