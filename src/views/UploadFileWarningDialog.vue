<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card>
      <q-card-section v-if="fileSwitch == 'itemsFile'" class="row items-center">
        <div class="q-my-sm text-h6">
          <q-avatar class="material-icons-round" icon="warning" />
          您上传的试题内容存在以下问题，请检查修改后再尝试上传！
        </div>
        <div style="max-height: 300px; overflow-y: auto">
          <q-list dense>
            <q-item v-for="(item, index) in errors" :key="item">
              <q-item-section class="text-body1">{{ index + 1 }}、{{ item }}</q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>

      <q-card-section v-if="fileSwitch == 'usersFile'" class="row items-center">
        <div class="q-my-sm text-h6">
          <q-avatar class="material-icons-round" icon="warning" />
          {{ usersHint }}
        </div>
        <div style="max-height: 300px; overflow-y: auto">
          <q-list dense v-if="warnings && !errors">
            <q-item v-for="(item, index) in warnings" :key="item">
              <q-item-section class="text-body1">
                {{ index + 1 }}、{{ item }}已经注册，请与本人确认
              </q-item-section>
            </q-item>
          </q-list>
          <q-list dense v-if="errors && !warnings">
            <q-item v-for="(item, index) in errors" :key="item">
              <q-item-section class="text-body1">{{ index + 1 }}、{{ item }}</q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="确定" color="primary" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useQuasar, useDialogPluginComponent } from 'quasar'
import { computed, defineEmits } from 'vue'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()

const emits = defineEmits([...useDialogPluginComponent.emits])

const props = defineProps({
  errors: Array,
  warnings: Array,
  fileSwitch: String,
})

const usersHint = computed(() => {
  if (props.warnings && !props.errors) {
    return '您上传的用户文件中以下用户插入失败，请检查！'
  } else if (props.errors && !props.warnings) {
    return '您上传的用户文件存在以下问题，请检查修改后再尝试上传！'
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
</script>
