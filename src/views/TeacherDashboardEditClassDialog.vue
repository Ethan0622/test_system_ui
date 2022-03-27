<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <h6 class="q-my-md">{{ isCreate ? '创建班级' : '修改班级信息' }}</h6>
        <q-form @submit="onSubmit">
          <q-input
            v-model="class_name"
            :rules="[unnull]"
            lazy-rules="ondemand"
            label="班级名称 *"
            dense
            filled
          />
          <div class="text-right">
            <q-btn flat color="primary" label="取消" @click="onCancelClick" />
            <q-btn :label="isCreate ? '创建' : '修改'" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useQuasar, useDialogPluginComponent } from 'quasar'
import { ref, defineEmits, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useClassStore } from '../store/classes'
import { ClassObject } from '../utils/interface'

const $q = useQuasar()
const router = useRouter()

const emits = defineEmits([...useDialogPluginComponent.emits])

const props = defineProps({
  classInfo: Object as () => ClassObject,
  isCreate: Boolean,
})

const myClass = useClassStore()
const class_name = ref<string>('')
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

function onOKClick() {
  onDialogOK()
}

function onCancelClick() {
  onDialogCancel()
}

function unnull(val: string) {
  return (val && val.length > 0) || '请输入班级名称'
}

function onSubmit() {
  onOKClick()
  if (props.isCreate) {
    myClass.createClass({
      data: { class_name: class_name.value },
      success: (res: ClassObject) => {
        onDialogOK(res.id)
        $q.notify({
          type: 'positive',
          message: '创建班级成功',
          position: 'top',
        })
      },
      failure: (error: unknown) => {
        $q.notify({
          type: 'negative',
          message: '创建班级失败，网络故障',
          position: 'top',
        })
      },
    })
  } else {
    console.log('修改班级信息')
  }
}

onMounted(() => {
  if (props.classInfo) {
    class_name.value = props.classInfo.class_name
  }
})
</script>
