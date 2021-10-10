<template>
  <q-layout view="hhh lpR fff" class="bg-color">
    <AppHeaderVue :insideTestPage="insideTestPage" />

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer v-if="!insideTestPage" class="text-center bg-navBar">
      <q-separator />
      <div class="q-py-md">© Ethan 版权所有</div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeaderVue from './AppHeader.vue'

const route = useRoute()
const insideTestPage = ref<boolean>(false)

watch(
  () => route.matched,
  () => {
    insideTestPage.value = route.matched.some((r) => r.path.match('/test-page'))
  }
)
</script>

<style lang="scss">
.toolbar {
  max-width: 1280px;
  .tabs .q-tab__content {
    min-width: 0;
  }
}
.bg-color {
  background-color: #f8f9fa;
}
</style>
