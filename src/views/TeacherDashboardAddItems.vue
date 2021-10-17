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
              <q-card>
                <q-card-section class="row justify-evenly">
                  <div class="row col-8 items-center">
                    <span class="text-h6 col-2">题干：</span>
                    <q-input class="col-10" filled v-model="content" autogrow label="请输入题干" />
                  </div>
                  <div class="row col-8 items-center">
                    <span class="text-h6 col-2">正确答案：</span>
                    <q-input
                      class="col-10"
                      filled
                      v-model="correct"
                      autogrow
                      label="请输入正确答案，填写字母"
                    />
                  </div>
                  <div class="row justify-between col-8 items-center">
                    <span class="text-h6 col-2">选项A：</span>
                    <q-input class="col-auto" filled v-model="option_A" label="请填写选项A" />
                    <span class="text-h6 col-2">选项B：</span>
                    <q-input class="col-auto" filled v-model="option_B" label="请填写选项B" />
                    <span class="text-h6 col-2">选项C：</span>
                    <q-input class="col-auto" filled v-model="option_C" label="请填写选项C" />
                    <span class="text-h6 col-2">选项D：</span>
                    <q-input class="col-auto" filled v-model="option_D" label="请填写选项D" />
                  </div>
                </q-card-section>
              </q-card>
            </q-tab-panel>
          </q-tab-panels>
        </q-tab-panel>

        <q-tab-panel name="批量添加">
          <div class="row justify-center">
            <q-file
              class="col-5"
              color="teal"
              filled
              v-model="file"
              accept=".xlsx, .xls"
              label="试题文件，目前仅支持Excel文件"
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" />
              </template>
            </q-file>
            <q-btn unelevated color="primary" icon="upload" title="上传" />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tab = ref<string>('逐题添加')
const file = ref(null)
const itemType = ref<string>('选择题')
const content = ref<string>('')
const correct = ref<string>('')
const option_A = ref<string>('')
const option_B= ref<string>('')
const option_C= ref<string>('')
const option_D= ref<string>('')
</script>
