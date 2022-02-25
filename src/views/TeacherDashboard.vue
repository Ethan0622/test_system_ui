<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer
      show-if-above
      :width="300"
      :breakpoint="100"
      bordered
      :content-class="$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-1'"
    >
      <div>
        <q-list>
          <q-expansion-item default-opened icon="format_list_bulleted" label="题库管理">
            <q-list>
              <q-item
                clickable
                :active-class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
                :to="'/dashboard/items-list/' + 1"
                replace
              >
                <q-item-section>选择题</q-item-section>
              </q-item>
              <q-item
                clickable
                :active-class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
                :to="'/dashboard/items-list/' + 2"
                replace
              >
                <q-item-section>判断题</q-item-section>
              </q-item>
              <q-item
                clickable
                :active-class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
                :to="'/dashboard/items-list/' + 3"
                replace
              >
                <q-item-section>名词解释</q-item-section>
              </q-item>
              <q-item
                clickable
                :active-class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
                :to="'/dashboard/items-list/' + 4"
                replace
              >
                <q-item-section>简答题</q-item-section>
              </q-item>
              <q-item
                clickable
                :active-class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
                :to="'/dashboard/items-list/' + 5"
                replace
              >
                <q-item-section>论述题</q-item-section>
              </q-item>
              <q-item
                clickable
                :active-class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
                to="/dashboard/add-items/"
                replace
              >
                <q-item-section>添加试题</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
          <q-expansion-item default-opened icon="group" label="班级管理">
            <q-list v-if="classList && classList.length">
              <q-item
                v-for="item in classList"
                :key="item.id"
                clickable
                :active-class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
                :to="'/dashboard/class-detail/' + item.id"
                replace
              >
                <q-item-section>{{ item.class_name }}</q-item-section>
                <q-item-section side>
                  <div class="row">
                    <div
                      @click="deleteClassConfirm(item)"
                      class="text-red q-mr-md cursor-pointer text-weight-regular"
                    >
                      删除
                    </div>
                    <div
                      @click="openEditDialog({ isCreate: false, classInfo: item })"
                      class="text-primary cursor-pointer text-weight-regular"
                    >
                      编辑
                    </div>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
            <div v-else class="text-center text-body2 text-grey-6 q-pb-md q-pt-xs">还没有班级</div>
            <div class="text-center">
              <a @click="openEditDialog({ isCreate: true })" class="text-primary cursor-pointer">
                创建新的班级...
              </a>
            </div>
          </q-expansion-item>
        </q-list>
      </div>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EditClassDialog from './TeacherDashboardEditClassDialog.vue'
import { useClassStore } from '../store/classes'
import { ClassObject } from '../utils/interface'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()

const myClass = useClassStore()

const classList = ref<ClassObject[]>([])

function getClasses() {
  myClass.getClasses({
    success: (res: any) => {
      classList.value = res
      console.log(res)
    },
    failure: (error: any) => {
      console.log(error)
    },
  })
}

function openEditDialog({ isCreate, classInfo = undefined }: { isCreate: boolean; classInfo?: ClassObject }) {
  $q.dialog({
    component: EditClassDialog,
    componentProps: {
      isCreate,
      classInfo,
    },
  })
    .onOk((classId: number) => {
      router.replace('/dashboard/class-detail/' + classId)
      // window.location.reload()
      getClasses()
      console.log('ok')
    })
    .onCancel(() => {
      console.log('cancel')
    })
}

function deleteClassConfirm(classroom: ClassObject) {
  $q.dialog({
    title: '删除“' + classroom.class_name + '”',
    message: `您将要删除 <strong>${classroom.class_name}</strong>，删除后将不可恢复，确定这么做吗？`,
    cancel: true,
    html: true,
    ok: { color: 'red', flat: true },
  }).onOk(() => {
    myClass.deleteClass({
      urlParams: classroom.id,
      success: () => {
        getClasses()
        if (Number(route.params.id) == classroom.id) {
          router.replace('/dashboard')
        }
      },
      failure: (error: any) => {
        $q.notify({
          type: 'negative',
          message: '删除班级失败',
          position: 'top',
        })
      },
    })
  })
}

onMounted(() => {
  getClasses()
})
</script>
