<template>
  <q-form @submit="onSubmit" class="q-my-md">
    <q-input
      class="q-my-sm"
      filled
      v-model="number"
      ref="username"
      label="学号/工号"
      lazy-rules="ondemand"
      :rules="[(val) => (val && val.length > 0) || '请输入用户名']"
    />

    <q-input
      filled
      type="password"
      v-model="password"
      label="密码"
      lazy-rules="ondemand"
      :rules="[(val) => (val !== null && val !== '') || '请输入密码']"
    />

    <div class="q-my-md">
      <q-btn label="登录" type="submit" color="primary" class="full-width" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { useQuasar } from 'quasar'
import userStores from '../store/user'

const $q = useQuasar()

const number = ref<string>('')
const password = ref<string>('')
const user = userStores.user()

const emits = defineEmits(['login-success'])

function onSubmit() {
  user.logIn({
    data: { number: number.value, password: password.value },
    success: (res: unknown) => {
      window.location.reload()
      emits('login-success')
      $q.notify({ color: 'positive', icon: 'check', message: '登录成功！', position: 'top' })
      console.log(res)
    },
    failure: (error: unknown) => {
      $q.notify({
        color: 'red',
        icon: 'error',
        message: '登录失败！请检查账号密码是否正确。',
        position: 'top',
      })
      console.log(error)
    },
  })
}

// onMounted(() => {
//   $refs.username.focus()
// })
</script>
