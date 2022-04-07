<template>
  <q-header v-if="!insideTestPage" class="bg-navBar">
    <q-toolbar class="container toolbar text-white q-mx-auto">
      <q-btn stretch flat no-caps size="16px" to="/">
        <img src="../assets/headerLogo.png" style="width: auto; height: 50px; max-width: 90%; max-height: 90%" />
      </q-btn>
      <q-tabs shrink content-class="tabs">
        <q-route-tab label="首页" to="/" exact />
        <q-btn
          dense
          unelevated
          no-caps
          class="full-height"
          padding="0 16px"
          @click="gotoDocs"
          label="使用指南"
        />
        <q-route-tab label="关于" to="/about" exact />
      </q-tabs>
      <q-space />
      <q-btn v-if="!userInfo" flat label="注册/登录" @click="openLoginDialog" />
      <div v-else>
        <q-btn dense unelevated class="q-mr-xs" no-caps padding="6px 15px">
          <q-avatar size="sm" icon="person"></q-avatar>
          <span>{{ userInfo.number }}</span>
          <q-menu
            anchor="bottom middle"
            self="top middle"
            transition-show="jump-down"
            transition-hide="jump-up"
          >
            <q-item clickable v-close-popup @click="openUserInfo">
              <q-item-section side>
                <q-icon name="account_circle" size="sm" />
              </q-item-section>
              <q-item-section>个人中心</q-item-section>
            </q-item>
            <q-list style="min-width: 150px" :class="{ 'bg-grey-9': $q.dark.isActive }">
              <q-item
                v-if="userInfo.type == 0"
                clickable
                v-close-popup
                :to="'/tests-list'"
                :active-class="$q.dark.isActive ? 'text-white' : 'text-dark'"
              >
                <q-item-section side>
                  <q-icon name="history" size="sm" />
                </q-item-section>
                <q-item-section>考试记录</q-item-section>
              </q-item>

              <q-item
                v-if="userInfo.type == 0"
                clickable
                v-close-popup
                :to="'/classroom'"
                :active-class="$q.dark.isActive ? 'text-white' : 'text-dark'"
              >
                <q-item-section side>
                  <q-icon name="group" size="sm" />
                </q-item-section>
                <q-item-section>班级</q-item-section>
              </q-item>

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

              <q-item
                v-if="userInfo.type == 1"
                clickable
                v-close-popup
                @click="openAdmin"
                :active-class="$q.dark.isActive ? 'text-white' : 'text-dark'"
              >
                <q-item-section side>
                  <q-icon name="settings_applications" size="sm" />
                </q-item-section>
                <q-item-section>后台管理</q-item-section>
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
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { baseUrl } from '../api/baseUrl'
import { useUserStore } from '../store/user'
import UserInfo from './UserInfo.vue'
import DialogJoin from '../components/DialogJoin.vue'

const $q = useQuasar()

const props = defineProps({
  insideTestPage: Boolean,
})

const router = useRouter()
const user = useUserStore()
const userInfo = useUserStore().userInfo

function gotoDocs() {
  window.open('http://121.40.84.189:8020/users/introduce.html', '_blank')
}

function openUserInfo() {
  $q.dialog({
    component: UserInfo,
    componentProps: {
      id: userInfo.id,
    },
  })
    .onOk(() => {
      console.log('OK')
    })
    .onCancel(() => {
      console.log('Cancel')
    })
}

function openLoginDialog() {
  $q.dialog({
    component: DialogJoin,
  })
    .onOk(() => {
      console.log('OK')
    })
    .onCancel(() => {
      console.log('Cancel')
    })
}

function openAdmin() {
  window.open(baseUrl + 'admin', '_blank')
}

function logout() {
  user.logOut()
  router.replace('/').then(() => {
    window.location.reload()
  })
}
</script>
