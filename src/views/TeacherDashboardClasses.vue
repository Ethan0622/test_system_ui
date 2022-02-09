<template>
  <q-page padding>
    <div v-if="!classroom" class="absolute-center">
      <q-spinner color="primary" size="3rem" :thickness="5" />
    </div>
    <div v-else>
      <h4 class="q-mt-none q-mb-sm text-weight-medium">{{ classroom.class_name }}</h4>
      <div class="row">
        <div class="text-h5 q-my-sm col-12">班级邀请码：{{ classroom.invitation_code }}</div>
        <div class="text-h5 q-my-sm col-12">教师：{{ user.userInfo.realname || user.userInfo.number }}</div>
      </div>

      <q-card class="q-my-md q-mx-sm">
        <TeacherDashboardClassStudentsVue />
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClassStore } from '../store/classes'
import { useUserStore } from '../store/user'
import { ClassObject } from '../utils/interface'
import TeacherDashboardClassStudentsVue from './TeacherDashboardClassStudents.vue'

const $q = useQuasar()

const route = useRoute()

const myClass = useClassStore()
const user = useUserStore()

const tab = ref<string>('student')

const classroom = computed(() => {
  let findedClass: ClassObject = myClass.classrooms.find((c: ClassObject) => c.id == Number(route.params.id))
  return findedClass
})

onMounted(() => {
  // if (myClass.classrooms.length) {
  //   classroom.value = myClass.classrooms.find((c: ClassObject) => c.id == class_id)
  // } else {
  //   let timer = window.setInterval(() => {
  //     if (myClass.classrooms) {
  //       classroom.value = myClass.classrooms.find((c: ClassObject) => c.id == class_id)
  //       window.clearInterval(timer)
  //     }
  //   }, 500)
  // }
})
</script>
