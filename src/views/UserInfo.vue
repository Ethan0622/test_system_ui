<template>
  <q-dialog ref="dialogRef" persistent @hide="onDialogHide">
    <q-card class="row q-dialog q-pa-md">
      <q-card-section class="q-pa-none col-12 row reverse">
        <q-btn class="q-ma-sm" flat color="black" round dense icon="close" @click="onCancelClick" />
      </q-card-section>
      <q-card-section class="col-6">
        <div class="text-h6 q-mb-md">账号信息</div>
        <div class="text-subtitle2 q-my-md">账号：{{ number }}</div>
        <div class="text-subtitle2 q-my-md">邮箱：{{ email }}</div>
        <div class="text-subtitle2 q-my-md">真实姓名：{{ realname }}</div>

        <q-separator />

        <div class="text-h6 q-my-md">更改密码</div>
        <q-form ref="pwdForm">
          <q-input
            class="q-my-sm"
            filled
            type="password"
            v-model="oldPwd"
            label="当前密码"
            lazy-rules="ondemand"
            :rules="[checkOldPwd]"
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

      <q-card-section class="col-6 row">
        <div class="text-h6">个人资料</div>

        <q-input class="col-12" filled v-model="realname" label="真实姓名" />

        <q-input class="col-12" filled v-model="email" label="邮箱" />
      </q-card-section>

      <q-card-actions align="center" class="col-12">
        <q-btn color="primary" label="保存" @click="onOKClick" />
      </q-card-actions>
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

const emits = defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const number = ref<string>('')
const email = ref<string>('')
const realname = ref<string>('')
const oldPwd = ref<string>('')
const pwd = ref<string>('')
const confirmPwd = ref<string>('')
const user = userStores.user()
const pwdForm = ref<HTMLElement | null>(null)
let oldPwdCorrect = ref<boolean>(false)

onMounted(() => {
  user.getUserInfo({
    urlParams: props.id,
    success: (res: Record<string, string>) => {
      number.value = res.number
      email.value = res.email
      realname.value = res.realname
    },
    failure: (err: unknown) => {
      console.log(err)
    },
  })
})

function checkOldPwd() {
  if (oldPwd.value) {
    return new Promise<void | string>((resolve) => {
      user.logIn({
        data: { number: number.value, password: oldPwd.value },
        success: () => {
          resolve()
          oldPwdCorrect.value = true
        },
        failure: () => {
          resolve('密码错误')
          oldPwdCorrect.value = false
        },
      })
    })
  } else if (pwd.value || confirmPwd.value) {
    return '请输入原密码'
  } else {
    return true
  }
}

function onOKClick() {
  pwdForm.value?.validate().then((success: boolean) => {
    if (success) {
      onDialogOK(
        user.updateUserInfo({
          urlParams: props.id,
          data: { password: pwd.value, email: email.value, realname: realname.value },
          success: (res: Record<string, string>) => {
            console.log(res)
          },
          failure: (error: unknown) => {
            console.log(error)
          },
        })
      )
    } else {
      setTimeout(() => {
        pwdForm.value?.resetValidation()
      }, 2000)
    }
  })
}

function onCancelClick() {
  onDialogCancel()
}
</script>

<style lang="scss" scoped>
.q-dialog {
  .q-dialog__inner--minimized {
    padding: 16px;
  }
  .q-dialog__inner--minimized > div {
    max-width: 1000px;
    min-width: 450px;
  }
}
</style>
