<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="row q-dialog q-pa-md">
      <q-card-section class="col-6">
        <div class="text-h6 q-my-md">账号信息</div>
        <div class="text-subtitle2 q-my-md">账号：{{ number }}</div>
        <div class="text-subtitle2 q-my-md">邮箱：{{ email }}</div>
        <div class="text-subtitle2 q-my-md">真实姓名：{{ realname }}</div>

        <q-separator />

        <div class="text-h6 q-my-md">更改密码</div>
        <q-form ref="myForm">
          <q-input
            class="q-my-sm"
            filled
            type="password"
            v-model="oldPwd"
            label="当前密码"
            lazy-rules="ondemand"
          />

          <q-input
            class="q-my-sm"
            filled
            type="password"
            v-model="pwd"
            label="新密码"
            lazy-rules="ondemand"
            :rules="[(val) => val !== null || '请输入密码']"
          />

          <q-input
            filled
            type="password"
            v-model="confirmPwd"
            label="确认新密码"
            lazy-rules="ondemand"
            :rules="[(val) => val !== null || '请确认密码', (val) => val == pwd || '两次输入的密码不一致']"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { ref, defineProps, defineEmits, onMounted } from 'vue'
import userStores from '../store/user'

const props = defineProps({
  id: Number,
})

const number = ref<string>('')
const email = ref<string>('')
const realname = ref<string>('')
const oldPwd = ref<string>('')
const pwd = ref<string>('')
const confirmPwd = ref<string>('')
const user = userStores.user()

const emits = defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

onMounted(() => {
  user.getUserInfo({
    urlParams: props.id,
    success: (res: any) => {
      number.value = res.number
      email.value = res.email
      realname.value = res.realname
    },
    failure: (err: any) => {
      console.log(err)
    },
  })
})

function onOKClick() {
  onDialogOK()
}

function onCancelClick() {
  onDialogCancel()
}
</script>
