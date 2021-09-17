<template>
  <q-layout view="hhh lpR fff" class="bg-color">
    <AppHeaderVue />

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="text-center bg-navBar">
      <q-separator />
      <div class="q-py-md">© Ethan 版权所有</div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import AppHeaderVue from './AppHeader.vue'
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
