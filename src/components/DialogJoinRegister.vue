<template>
  <q-form @submit="onSubmit" class="q-my-md">
    <q-input
      class="q-my-sm"
      filled
      v-model="number"
      ref="username"
      label="学号/工号"
      lazy-rules="ondemand"
      :rules="[(val) => (val && val.length > 0) || '请输入学号或工号']"
    />

    <q-input
      class="q-my-sm"
      filled
      type="password"
      v-model="password"
      label="密码"
      lazy-rules="ondemand"
      :rules="[(val) => (val !== null && val !== '') || '请输入密码']"
    />

    <q-input
      filled
      type="password"
      v-model="confirmPassword"
      label="确认密码"
      lazy-rules="ondemand"
      :rules="[
        (val) => (val !== null && val !== '') || '请确认密码',
        (val) => val == password || '两次输入的密码不一致',
      ]"
    />

    <div class="row justify-between items-center">
      <span class="text-subtitle1">身份：</span>
      <q-option-group v-model="userType" :options="userTypeOptiens" color="primary" inline />
    </div>

    <div class="q-my-md">
      <q-btn label="注册" type="submit" color="primary" class="full-width" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import userStores from '../store/user'

const $q = useQuasar()

const emits = defineEmits(['register-success'])

const user = userStores.user()
const number = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')
const userType = ref<string>('0')
const username = ref<HTMLElement | null>(null)
const userTypeOptiens = [
  { label: '学生', value: '0' },
  { label: '老师', value: '1' },
]

function onSubmit() {
  user.register({
    data: {
      number: number.value,
      password: password.value,
      userType: userType,
    },

    success: () => {
      $q.notify({ color: 'positive', icon: 'check', message: '注册成功！', position: 'top' })
      emits('register-success')
    },
    failure: (error: unknown) => {
      console.log(error)
      $q.notify({ color: 'red', icon: 'error', position: 'top' })
    },
  })
}

onMounted(() => {
  username.value?.focus()
})
</script>
