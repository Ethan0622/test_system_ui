<template>
  <div class="container home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <span>账号：</span>
      <input v-model="username" />
      <br />
      <span>密码：</span>
      <input v-model="password" />
      <br />
      <button @click="signIn">登录</button>
    </div>
    <button @click="getInfoById(1)">查看个人数据</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import userStores from '../store/user'

let username = ref('')
let password = ref('')
const user = userStores.user()

function signIn() {
  user.logIn({
    url: 'api/users/user_login/',
    data: {  number: username.value, password: password.value },
    success: (res: unknown) => {
      console.log(res)
    },
    failure: (error: unknown) => {
      console.log(error)
    },
  })
}

function getInfoById(id: number) {
  user.getUserInfo({
    url: `api/users/user_detail/${id}/`,
    success: (res: unknown) => {
      console.log(res)
    },
    failure: (error: unknown) => {
      console.log(error)
    },
  })
}
</script>

