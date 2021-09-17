<template>
  <q-header class="bg-navBar">
    <q-toolbar class="container toolbar text-white q-mx-auto">
      <q-btn stretch flat no-caps size="16px" to="/">
        <img :src="headerLogo" style="width: auto; height: 50px; max-width: 90%; max-height: 90%" />
      </q-btn>
      <q-tabs shrink content-class="tabs">
        <q-route-tab label="首页" to="/" exact />
        <q-route-tab label="关于我们" to="/about" exact />
      </q-tabs>
      <q-space />
      <q-btn v-if="!userInfo" flat label="注册/登录" @click="openLoginDialog" />
      <div v-else>
        <q-btn dense unelevated class="q-mr-xs" no-caps padding="6px 15px">
          <q-avatar size="sm" :icon="userInfo.avatar ? null : 'person'">
            <q-img v-if="userInfo.avatar" :src="userInfo.avatar" :ratio="1" />
          </q-avatar>
          <span>{{ userInfo.number }}</span>
          <q-menu
            anchor="bottom middle"
            self="top middle"
            transition-show="jump-down"
            transition-hide="jump-up"
          >
            <q-list style="min-width: 150px" :class="{ 'bg-grey-9': $q.dark.isActive }">
              <q-item
                v-if="userInfo.type == 0"
                clickable
                v-close-popup
                :to="'/classrooms-list'"
                :active-class="$q.dark.isActive ? 'text-white' : 'text-dark'"
              >
                <q-item-section side>
                  <q-icon name="group" size="sm" />
                </q-item-section>
                <q-item-section>班级</q-item-section>
              </q-item>

              <q-item
                v-if="userInfo.type == 0"
                clickable
                v-close-popup
                to="/portfolio-recommendation"
                :active-class="$q.dark.isActive ? 'text-white' : 'text-dark'"
              ></q-item>

              <q-item
                v-if="userInfo.type == 1"
                clickable
                v-close-popup
                :to="'/dashboard'"
                :active-class="$q.dark.isActive ? 'text-white' : 'text-dark'"
              >
                <q-item-section side>
                  <q-icon name="manage_accounts" size="sm" />
                </q-item-section>
                <q-item-section>教师控制台</q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="logout">
                <q-item-section side>
                  <q-icon name="logout" size="sm" />
                </q-item-section>
                <q-item-section>退出登录</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'
import headerLogo from './assets/headerLogo.png'
import userStores from './store/user'
import DialogJoin from './components/DialogJoin.vue'

const $q = useQuasar()
const user = userStores.user()
const userInfo = userStores.user().userInfo

onMounted(() => {
  console.log(userInfo)
})

function openLoginDialog() {
  $q.dialog({
    component: DialogJoin,

    componentProps: {
      text: 'from appheader something',
    },
  })
    .onOk(() => {
      console.log('OK')
    })
    .onCancel(() => {
      console.log('Cancel')
    })
}

function logout() {
  user.logOut()
  window.location.reload()
}
</script>
