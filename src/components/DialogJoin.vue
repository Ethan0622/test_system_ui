<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="bg-dark text-white text-center justify-between" horizontal>
        <q-card-section>
          <h6 class="q-my-sm">欢迎来到 本考试系统</h6>
        </q-card-section>
        <q-card-section class="q-pa-none">
          <q-btn class="q-ma-sm" flat color="white" round dense icon="close" @click="onCancelClick" />
        </q-card-section>
      </q-card-section>

      <q-card-section class="q-mt-md">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" label="登录" />
          <q-tab name="register" label="注册" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" ref="panels">
          <q-tab-panel name="login">
            <DialogJoinLoginVue @login-success="onOKClick" />
          </q-tab-panel>

          <q-tab-panel name="register">
            <DialogJoinRegisterVue @register-success="tab = 'login'" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { ref, defineEmits } from 'vue'
import DialogJoinLoginVue from './DialogJoinLogin.vue'
import DialogJoinRegisterVue from './DialogJoinRegister.vue'

const emits = defineEmits([...useDialogPluginComponent.emits])

let tab = ref<string>('login')

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

function onOKClick() {
  onDialogOK()
}

function onCancelClick() {
  onDialogCancel()
}
</script>
