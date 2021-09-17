<template>
  <div class="container home">
    <q-btn label='查看个人信息' @click="getInfoById()"></q-btn>
  </div>
</template>

<script setup lang="ts">
import userStores from '../store/user'

const user = userStores.user()


function getInfoById() {
  const id = user.userInfo.id
  user.getUserInfo({
    urlParams: id,
    success: (res: unknown) => {
      console.log(res)
    },
    failure: (error: unknown) => {
      console.log(error)
    },
  })
}
</script>
