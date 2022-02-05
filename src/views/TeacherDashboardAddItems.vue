<template>
  <q-page padding>
    <div class="text-h5">添加试题，逐题添加或批量添加均可</div>
    <div>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="逐题添加" label="逐题添加" />
        <q-tab name="批量添加" label="批量添加" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="逐题添加">
          <q-tabs
            v-model="itemType"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="选择题" label="选择题" />
            <q-tab name="判断题" label="判断题" />
            <q-tab name="简答题" label="简答题" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="itemType" animated>
            <q-tab-panel name="选择题">
              <add-choice-items-vue />
            </q-tab-panel>
            <q-tab-panel name="判断题">
              <add-judge-items-vue />
            </q-tab-panel>
          </q-tab-panels>
        </q-tab-panel>

        <q-tab-panel name="批量添加">
          <add-file-items-vue />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import itembankStores from '../store/itembank'
import AddChoiceItemsVue from './ChoiceItemsView.vue'
import AddJudgeItemsVue from './JudgeItemsView.vue'
import AddFileItemsVue from './UploadItemsFileView.vue'

const $q = useQuasar()

const itembank = itembankStores.itembank()

const tab = ref<string>('逐题添加')
const itemType = ref<string>('选择题')

</script>
