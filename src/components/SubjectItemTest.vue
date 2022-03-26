<template>
  <q-card bordered class="bg-grey-3 my-card" v-if="itemDetail">
    <q-card-section>
      <div class="text-h6 q-mb-sm">{{ subjectTitle }}：</div>
      <div class="text-h6">{{ itemDetail.content }}</div>
    </q-card-section>

    <q-separator inset />

    <q-card-section class="row justify-center">
      <!-- <q-input
        autofocus
        filled
        class="col-11"
        v-model="subjectAnswer"
        @blur="deliver_answer()"
        type="textarea"
      /> -->
      <q-editor
        class="col-12"
        v-on:blur="deliver_answer()"
        :toolbar="[
          ['bold', 'italic', 'strike', 'underline'],
          ['uploadImg'],
          [
            {
              label: $q.lang.editor.formatting,
              icon: $q.iconSet.editor.formatting,
              list: 'no-icons',
              options: ['p', 'h3', 'h4', 'h5', 'h6'],
            },
          ],
        ]"
        v-model="subjectAnswer"
      >
        <template v-slot:uploadImg>
          <q-btn dense no-caps flat ref="custom" icon="photo" size="sm" @click="simulateClick">
            <input type="file" ref="upload" @change="insertImg()" accept=".png, .jpg" style="display: none" />
          </q-btn>
        </template>
      </q-editor>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onUpdated, computed } from 'vue'
import { ItemObject } from '../utils/interface'

const props = defineProps({
  itemDetail: Object as () => ItemObject,
})

const emits = defineEmits(['deliver_answer'])
const deliver_answer = () => {
  emits('deliver_answer', subjectAnswer.value)
}

let subjectAnswer = ref<string>('')
const upload = ref<HTMLInputElement>()

const subjectTitle = computed(() => {
  switch (props.itemDetail?.type) {
    case 3:
      return '名词解释'
    case 4:
      return '简答'
    case 5:
      return '论述'
    default:
      return ''
  }
})

function simulateClick() {
  upload.value?.dispatchEvent(new MouseEvent('click'))
}

function insertImg() {
  if (upload.value?.files) {
    let file = upload.value?.files[0]
    const reader = new FileReader()
    reader.onloadend = function () {
      let dataUrl = reader.result

      subjectAnswer.value += '<div><img src="' + dataUrl + '" /></div>'
    }
    upload.value.value = ''
    reader.readAsDataURL(file)
  }
}

onUpdated(() => {
  subjectAnswer.value = ''
})
</script>
